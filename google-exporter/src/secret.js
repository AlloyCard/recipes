var AWS = require('aws-sdk'),
region = "us-east-1",

var KMS = new AWS.KMS({region: region})

exports.getSecret =  async function getSecret(secretName) {
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