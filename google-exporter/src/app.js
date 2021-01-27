"use strict"

var AWS = require('aws-sdk'),
    region = "us-east-1",

    secret,
    decodedBinarySecret;

var axios = require("axios")

  
var KMS = new AWS.KMS({region: region})
const base64url = require("base64url");
const fetch = require('node-fetch');


var secretManager = new AWS.SecretsManager({
    region: region
});
var dynamoDb = new AWS.DynamoDB.DocumentClient();

var jwt = require('jsonwebtoken');

const oAuthTableName = "GoogleExporterOAuthTable"

const AlloyJS = require("@alloycard/alloy-js") 

AlloyJS.configure({
    serverUrl: "http://127.0.0.1:8080/graphql",
    fetch: fetch
})


exports.requestAuth = async (event, context) => {
    try {

        const client_id = JSON.parse(await getSecret("/google/oauth")).client_id
        const recipeInstallId= event.queryStringParameters["recipeInstallId"]

        return {
            'statusCode': 301,
            headers: {
                Location: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=https://${event.headers.host}/redirect-to-app&response_type=code&scope=https://www.googleapis.com/auth/spreadsheets&access_type=offline&state=${recipeInstallId}`,
              }
        }
        
    } catch (err) {
        console.log(err);
        return err;
    }

};


async function buildAlloyJWT(recipeId, keyId) {
    const header = {
        "alg": "RS256",
        "typ": "JWT",
        "kid": `AlloyPrincipal-${recipeId}` 
      }

    const payload = {
        exp:  Math.floor(Date.now() / 1000) + 60,
        iat: Math.floor(Date.now() / 1000),
        iss: "AlloyCard",
        "custom:principalId": recipeId,
        "custom:principalType": "com.alloycard.core.entities.recipe.Recipe"
    }

    let token_components = {
        header: base64url(JSON.stringify(header)),
        payload: base64url(JSON.stringify(payload)),
    };

    let message = Buffer.from(token_components.header + "." + token_components.payload)

    
    let res = await KMS.sign({
        Message: message,
        KeyId: keyId,
        SigningAlgorithm: 'RSASSA_PKCS1_V1_5_SHA_256',
        MessageType: 'RAW'
    }).promise()

    token_components.signature = res.Signature.toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return token_components.header + "." + token_components.payload + "." + token_components.signature;    
}


async function setAlloyConfig(alloyKey, recipeInstallId) {
    const recipeKey = await buildAlloyJWT(recipeInstallId, alloyKey)
    AlloyJS.AuthService.setAuthToken(recipeKey)
    const recipeInstallJWT = await AlloyJS.RecipesService.getRecipeInstallToken(recipeInstallId)
    AlloyJS.AuthService.setAuthToken(recipeInstallJWT)
    const changeData = await AlloyJS.RecipesService.changeRecipeInstallConfig(recipeInstallId, {oauthCompleted: true})
    return changeData
}

exports.setAlloyConfig = setAlloyConfig

exports.redirectToApp = async (event, context)  => {
    
    const alloyKey = process.env.alloyKey

    const code = event.queryStringParameters["code"]
    const recipeInstallId= event.queryStringParameters["state"]
    const secret = JSON.parse(await getSecret("/google/oauth"))
    const client_id = secret.client_id
    const client_secret = secret.client_secret



    const redirect_uri = `https://${event.headers.host}/redirect-to-app`
    

    const params = new URLSearchParams()
    params.append('client_id',client_id)
    params.append('client_secret',client_secret)
    params.append('code',code)
    params.append('grant_type',"authorization_code")
    params.append('redirect_uri', redirect_uri)

    const resp = await axios.post('https://oauth2.googleapis.com/token', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });        
    await insert({id: recipeInstallId, ...resp.data})
    
    await setAlloyConfig(alloyKey, recipeInstallId);

    return {
        'statusCode': 301,
        headers: {
            Location: `exp://192.168.137.1:19000/--/RecipeConfiguration?recipeInstallId=${recipeInstallId}&refresh=true`
        }
    }
}

exports.alloyWebhook = async (event, context) => {

}


async function insert(item) {
    var params = {
        TableName:oAuthTableName,
        Item: item
    }    

    return new Promise((res, rej) => {
        dynamoDb.put(params, function(err, data) {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        }) 
    })
}


async function getSecret(secretName) {
    return new Promise((res, rej) => {
        secretManager.getSecretValue({SecretId: secretName}, function(err, data) {
            if (err) {
                rej(err)
            }
            else {
                res(data.SecretString)
            }
        });
    })
}


