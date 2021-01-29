

const alloy = require("./alloy")
const dynamo = require("./dynamo")
const tableName = require("./redirectToApp").oAuthTableName
const sheets = require("./sheets")

exports.alloyWebhook = async (event, context) => {
    const alloyKey = process.env.alloyKey
    const recipeId = process.env.recipeId

    const alloyEvent = JSON.parse(event.body)
    if (alloyEvent._alloyCardType == "com.alloycard.core.entities.transaction.TransactionCreatedEvent") {
        const recipeInstallId = alloyEvent.principal        
        const transaction = await alloy.getTransactionDetails(alloyKey, recipeId, recipeInstallId, alloyEvent.transaction.entityID)
        const googleCredentials = await dynamo.findById(tableName, {id: recipeInstallId})
        sheets.insertLine(googleCredentials, googleCredentials.sheetId, transaction)
        alloy.addTransactionPanel(alloyKey, recipeId, recipeInstallId, {template: "/templates/transaction.template.json", data: {"insertedRow": 1}})
    }
}
