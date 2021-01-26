'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it ('verifies AlloyConfig', async  () => {
        const changeData = await app.setAlloyConfig("a73a16ea-bd94-483a-b22c-6d89670ff9cd","08552f0e-db8c-4b04-8905-2b8467faf8f5")
        expect(changeData.configuration).to.be.equal({oauthCompleted: true})
        done()
    })

});
