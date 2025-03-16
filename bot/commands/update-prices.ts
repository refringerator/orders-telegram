const { google } = require("googleapis");
const fs = require("fs");
const { EXCEL_ID, GOOGLE_CREDS } = require("../config");

const credentials = JSON.parse(fs.readFileSync(GOOGLE_CREDS));

function readGoogleSheet() {
  // Authenticate with Google Sheets API
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = EXCEL_ID;
  const range = "Цены!A2:D500"; // Adjust based on the range you need

  try {
    const response = sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range,
      })
      .then((res: { data: any[] }) => {
        const rows = res.data.values;
        if (rows.length) {
          console.log("Data from Google Sheets:");
          console.table(rows);
        } else {
          console.log("No data found.");
        }
      })
      .catch((err: any) => {
        console.error("Error reading Google Sheet:", err);
      });

    //require("deasync").loopWhile(() => !response);
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports = {
  updatePrices: readGoogleSheet,
};
