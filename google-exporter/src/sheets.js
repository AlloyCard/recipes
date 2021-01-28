const {google} = require('googleapis');
const sheets = google.sheets('v4');


 
async function createSheet(credentials, sheetName) {

    const authClient = await authorize();

    const request = {
        resource: {
          title: sheetName
        },
    
        auth: authClient,
      };


    const response = (await sheets.spreadsheets.create(request)).data;

}


async function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  exports.createSheet = createSheet