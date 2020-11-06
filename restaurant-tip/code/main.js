function onTransaction(context) {              
    let tip = context.transaction.amount * context.configuration.tipAmount;               
    let alert = context.transaction.amount * context.configuration.alert;               
    let total = context.transaction.amount + tip;
    
    context.addTransactionPanel({                      
        template: "TipTransactionTemplate",
        data: {
            tip: tip,
            alert: alert,
            total: total
        }
    });
} 