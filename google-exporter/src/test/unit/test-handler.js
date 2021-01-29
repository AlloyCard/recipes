'use strict';

const app = require('../../alloy.js');
const sheet = require("../../sheets")
const dynamo = require("../../dynamo")
const chai = require('chai');
const expect = chai.expect;
var event, context;

const recipeInstallId = "f0f866c7-ed65-4cb9-8310-f4c8de9672d9"

describe('Tests index', function () {
    it ('verifies AlloyConfig', async  () => {
        const changeData = await app.setRecipeInstallConfig("a73a16ea-bd94-483a-b22c-6d89670ff9cd","08552f0e-db8c-4b04-8905-2b8467faf8f5", recipeInstallId, {test: "12345"})
        expect(changeData.configuration.test).to.be.equal("12345")
    })    

    it('test create sheet', async ()  => {
        const credentials = await dynamo.findById("GoogleExporterOAuthTable", "123456")
        console.log(credentials)
        const mysheet = await sheet.createSheet(credentials.Item, "My Test Sheet")
        expect(mysheet.properties.title).to.be.equal("My Test Sheet")
    })

});


