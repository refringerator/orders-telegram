import { google } from "googleapis";

export async function saveToSheet({ orderData }: { orderData: any }) {
  try {
    // Your Google Sheet ID
    const SHEET_ID = process.env.EXCEL_ID;

    // Read credentials
    const credentialsBase64 = process.env.GOOGLE_CREDENTIALS_BASE64;
    if (!credentialsBase64) {
      throw new Error("Google credentials not found in environment variables");
    }
    const credentialsJson = Buffer.from(credentialsBase64, "base64").toString();

    const credentials = JSON.parse(credentialsJson);

    // Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth });

    // Format the order data for the sheet
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const time = new Date().toTimeString().split(" ")[0]; // HH:MM:SS

    // Prepare the row data for Google Sheets
    const values = orderData.items.map((item: any) => [
      date, // Date
      time, // Time
      orderData.customerName, // Customer Name
      orderData.user || "", // Customer Phone (if available)
      orderData.username || "", // Customer Phone (if available)
      orderData.userId || "", // Customer Phone (if available)
      item.name, // Product Name
      item.quantity, // Quantity
      item.price, // Price per item
      item.quantity * item.price, // Total
    ]);

    // First, append the rows to the sheet to get their row indices
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Заказы!A:J", // Adjust the range based on your sheet structure
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    // Get the updated range from the append response
    // const updatedRange = appendResponse.data.updates?.updatedRange;
    // if (updatedRange) {
    //   // Parse the range to get the starting row
    //   const match = updatedRange.match(/!A(\d+):/);
    //   if (match && match[1]) {
    //     const startRow = parseInt(match[1]);
    //     const endRow = startRow + values.length - 1;

    //     // Get the previous row's formatting to determine the next color
    //     // (if startRow > 2, there is a previous row)
    //     let useAlternateColor = false;

    //     if (startRow > 2) {
    //       const previousRowResponse = await sheets.spreadsheets.get({
    //         spreadsheetId: SHEET_ID,
    //         ranges: [`Заказы!A${startRow - 1}:A${startRow - 1}`],
    //         fields:
    //           "sheets.data.rowData.values.userEnteredFormat.backgroundColor",
    //       });

    //       // Check if the previous row has the alternate color
    //       const previousRowData =
    //         previousRowResponse.data.sheets?.[0]?.data?.[0]?.rowData?.[0];
    //       const prevBgColor =
    //         previousRowData?.values?.[0]?.userEnteredFormat?.backgroundColor;

    //       // If previous row had light blue (0.9, 0.9, 1.0), use white for new rows
    //       // If previous row had white or no color, use light blue
    //       if (
    //         prevBgColor &&
    //         prevBgColor.red === 0.9 &&
    //         prevBgColor.green === 0.9 &&
    //         prevBgColor.blue === 1.0
    //       ) {
    //         useAlternateColor = false; // Use white
    //       } else {
    //         useAlternateColor = true; // Use light blue
    //       }
    //     }

    //     // Define the two alternating colors
    //     const lightBlue = {
    //       red: 0.9,
    //       green: 0.9,
    //       blue: 1.0,
    //     };

    //     const white = {
    //       red: 1.0,
    //       green: 1.0,
    //       blue: 1.0,
    //     };

    //     // Apply formatting (background color) to the newly added rows
    //     await sheets.spreadsheets.batchUpdate({
    //       spreadsheetId: SHEET_ID,
    //       requestBody: {
    //         requests: [
    //           {
    //             updateCells: {
    //               range: {
    //                 sheetId: 1, // Assuming the "Заказы" sheet ID is 1
    //                 startRowIndex: startRow - 1, // 0-based index
    //                 endRowIndex: endRow,
    //                 startColumnIndex: 0,
    //                 endColumnIndex: 10, // Columns A through J
    //               },
    //               rows: values.map(() => ({
    //                 values: Array(10).fill({
    //                   userEnteredFormat: {
    //                     backgroundColor: useAlternateColor ? lightBlue : white,
    //                   },
    //                 }),
    //               })),
    //               fields: "userEnteredFormat.backgroundColor",
    //             },
    //           },
    //         ],
    //       },
    //     });
    //   }
    // }

    console.log("Order data saved to Google Sheet");
    return { success: true };
  } catch (error) {
    console.error("Error saving order data to Google Sheet:", error);
    throw new Error("Failed to save order data to Google Sheet");
  }
}
