const AWS = require('aws-sdk')

const base64url = require("base64url");

const AlloyJS = require("@alloycard/alloy-js") 

const KMS = new AWS.KMS({region: "us-east-1"})


AlloyJS.configure({
    serverUrl: "http://ec2-3-236-122-115.compute-1.amazonaws.com:8080/graphql"
})

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


exports.setRecipeInstallConfig = async (alloyKey, recipeId, recipeInstallId, configs)  => {
    const recipeKey = await buildAlloyJWT(recipeId, alloyKey)
    AlloyJS.AuthService.setAuthToken(recipeKey)    
    const recipeInstallJWT = await AlloyJS.RecipesService.getRecipeInstallToken(recipeInstallId)
    AlloyJS.AuthService.setAuthToken(recipeInstallJWT)    
    const changeData = await AlloyJS.RecipesService.changeRecipeInstallConfig(recipeInstallId, configs)
    return changeData
}

