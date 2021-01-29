const AWS = require('aws-sdk')



const secretManager = new AWS.SecretsManager({
    region: "us-east-1"
});

exports.getSecret =  async(secretName) => {
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