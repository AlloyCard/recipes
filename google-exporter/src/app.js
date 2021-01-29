"use strict"

 const redirectToApp = require("./redirectToApp")
const requestAuth = require("./requestAuth")
const webhook = require("./webhook")

exports.redirectToApp = async (event, context) => {
    return await redirectToApp.handler(event, context)
}
exports.requestAuth = async (event, context) => {
    return await requestAuth.handler(event, context)
}
exports.alloyWebhook = async (event, context) => {
    return await webhook.handler(context, event)
}
