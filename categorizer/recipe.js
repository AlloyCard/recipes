function onTransaction(context) {
    context.addTransactionPanel({
        template: "CategorizeTransactionTemplate",
        data: {
            category:"restaurants"
        }
    });
}