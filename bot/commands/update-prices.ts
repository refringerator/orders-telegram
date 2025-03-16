const { google } = require("googleapis");
const fs = require("fs");
const { EXCEL_ID, GOOGLE_CREDS, db } = require("../config");

const { addDoc, collection, runTransaction } = require("firebase/firestore");

const credentials = JSON.parse(fs.readFileSync(GOOGLE_CREDS));

const readGoogleSheet = async (ctx: any) => {
  // Authenticate with Google Sheets API
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = EXCEL_ID;
  const range = "Цены!A2:D500";

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    ctx.reply("Не найдены данные цен в Google Sheets.");
    return;
  }

  for (let i = 0; i < rows.length; i++) {
    const [category, title, price, picture] = rows[i];
    addDoc(collection(db, "prices"), {
      title: title.trim(),
      actual: true,
      createdAt: new Date(),
      category: category.trim(),
      price: Number.parseFloat(price),
      picture: picture.trim(),
    });
  }

  ctx.reply("Каталог успешно обновлен!");
};

module.exports = {
  updatePrices: readGoogleSheet,
};
