var AWS = require('aws-sdk')    
    
var dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1"
});


exports.insert = async (table, item) => {
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

exports.findById = async (table, id) => {
    var params = {
        TableName:table,
        Key: {id: id}
    }    

    return new Promise((res, rej) => {
        dynamoDb.get(params, function(err, data) {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    })
}
