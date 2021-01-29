var axios = require("axios")

const oAuthTableName = "GoogleExporterOAuthTable"

const sheetName = "Alloy Transactions"

const secretManager = require("./secret")
const alloy  = require('./alloy')
const dynamo = require("./dynamo")
const sheets = require("./sheets")

exports.handler = async (event, context)  => {
    console.log("HEREA")
    const alloyKey = process.env.alloyKey
    const recipeId = process.env.recipeId

    const code = event.queryStringParameters["code"]
    const recipeInstallId= event.queryStringParameters["state"]
    const secret = JSON.parse(await secretManager.getSecret("/google/oauth"))
    const client_id = secret.client_id
    const client_secret = secret.client_secret


    const redirect_uri = `https://${event.headers.host}/redirect-to-app`
    

    const params = new URLSearchParams()
    params.append('client_id',client_id)
    params.append('client_secret',client_secret)
    params.append('code',code)
    params.append('grant_type',"authorization_code")
    params.append('redirect_uri', redirect_uri)

    console.log("HEREB")
    const resp = await axios.post('https://oauth2.googleapis.com/token', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });        

    console.log("HELLO1")
    const sheet = await sheets.createSheet(resp.data, sheetName)
    console.log("HELLO2")
    await dynamo.insert(oAuthTableName, {id: recipeInstallId,  sheetId: sheet.spreadsheetId,   ...resp.data})    
    console.log("HELLO3")
    await alloy.setRecipeInstallConfig(alloyKey, recipeId, recipeInstallId, {oauthCompleted: true, sheetName: sheetName});
    console.log("HELLO4")

    return {
        'statusCode': 301,
        headers: {
            Location: `exp://192.168.137.1:19000/--/RecipeConfiguration?recipeInstallId=${recipeInstallId}&refresh=true`
        }
    }
}