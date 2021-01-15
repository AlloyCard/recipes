"use strict"

var AWS = require('aws-sdk'),
    region = "us-east-1",

    secret,
    decodedBinarySecret;

var axios = require("axios")
    
   


var secretManager = new AWS.SecretsManager({
    region: region
});
var dynamoDb = new AWS.DynamoDB.DocumentClient();



const oAuthTableName = "GoogleExporterOAuthTable"



exports.requestAuth = async (event, context) => {
    try {

        const client_id = JSON.parse(await getSecret("/google/oauth")).client_id
        const userId= event.queryStringParameters["userId"]

        return {
            'statusCode': 301,
            headers: {
                Location: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=https://${event.headers.host}/redirect-to-app&response_type=code&scope=https://www.googleapis.com/auth/spreadsheets&access_type=offline&state=${userId}`,
              }
        }
        
    } catch (err) {
        console.log(err);
        return err;
    }

};

exports.redirectToApp = async (event, context)  => {
    const code = event.queryStringParameters["code"]
    const userId= event.queryStringParameters["state"]
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
    await insert({id: userId, ...resp.data})
    

    return {
        'statusCode': 301,
        headers: {
            Location: `exp://192.168.137.1:19000/--/RecipeConfiguration?recipeId=MYRECIPEID`    
        }
    }
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


