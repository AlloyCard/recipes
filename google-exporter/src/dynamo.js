var AWS = require('aws-sdk'),
    region = "us-east-1",
    
var dynamoDb = new AWS.DynamoDB.DocumentClient();


async function insert(table, item) {
    var params = {
        TableName:table,
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

exports.insert = insert