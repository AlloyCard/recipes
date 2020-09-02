function onTransaction(context) {

};



async function onTransactionEnriched(context) {

    const address = context.transactionRichData["alloy::address::street"] + ", " + context.transactionRichData["alloy::address::city"] + ", " + context.transactionRichData["alloy::address::state"] + ", " + context.transactionRichData["alloy::address::postalCode"]

    const data = await Alloy.fetchJson("https://maps.googleapis.com/maps/api/geocode/json?key=<KEY>&address=" + address, "GET")

    if (!data || data.status == "ZERO_RESULTS") {
        return
    }

    const latlong = data.results[0].geometry.location

    context.addTransactionPanel({
        template: "TransactionMapTemplate",
        data: {
            lat: latlong.lat,
            long: latlong.lng
        }
    });

}
   