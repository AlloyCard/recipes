
const { GoogleSpreadsheet } = require('google-spreadsheet');


exports.createSheet = async (credentials, sheetName)  => {
  const doc = new GoogleSpreadsheet();
  
  doc.useRawAccessToken(credentials.access_token)

  const newSheet = await doc.createNewSpreadsheetDocument({ title: sheetName });
  console.log(doc)
  return doc

}

exports.insertLine = async (credentials, sheetId, data) => {
  const doc = new GoogleSpreadsheet(sheetId);

  doc.useRawAccessToken(credentials.access_token)
  await doc.sheetsByIndex[0].addRow(data)
}


  