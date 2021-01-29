const {google} = require('googleapis');
const sheets = google.sheets('v4');


 
exports.createSheet = async (credentials, sheetName)  => {


  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials(credentials);    

    const request = {
        resource: {
          properties: {
            title: sheetName
          }
          
        },
    
        auth: oauth2Client,
      };


    const resp = await sheets.spreadsheets.create(request)
    const response = resp.data;
    return response
}


  