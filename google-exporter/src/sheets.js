
const { GoogleSpreadsheet } = require('google-spreadsheet');


exports.createSheet = async (credentials, sheetName)  => {
  const doc = new GoogleSpreadsheet();
  
  await doc.useRawAccessToken(credentials.access_token)

  const newSheet = await doc.createNewSpreadsheetDocument({ title: sheetName });
  console.log(doc)
  return doc

}


  