
const secret = require("./secret")

exports.handler = async (event, context) => {
    try {

        const client_id = JSON.parse(await secret.getSecret("/google/oauth")).client_id
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