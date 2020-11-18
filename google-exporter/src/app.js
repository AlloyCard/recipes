"use strict"

var AWS = require('aws-sdk'),
    region = "us-east-1",
    secretName = "/google/oauth",
    secret,
    decodedBinarySecret;
    
   


var secretManager = new AWS.SecretsManager({
    region: region
});
var dynamoDb = new AWS.DynamoDB.DocumentClient();



const redirectUri = process.env.RedirectUri
const oAuthTableName = process.env.oAuthTableName

exports.requestAuth = async (event, context) => {
    try {

        const client_id = JSON.parse(await getSecret("/google/oauth")).client_id
        const userId= event.queryStringParameters["userId"]

        return {
            'statusCode': 301,
            headers: {
                Location: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/spreadsheets&access_type=offline&state=${userId}`,
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
    


    const resp = await axios.get(`https://oauth2.googleapis.com/token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`)
    
    await insert({id: userId, ...resp})
    

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


