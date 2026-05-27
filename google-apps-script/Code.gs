// Google Apps Script for SDS Dashboard Upload
// Deploy this as a Web App with "Anyone with link" access

const SPREADSHEET_ID = '1sa4tztMErbdJR8e4gsl6V_2KWXY56AmqWVJQOyuz8vc';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Get the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Get or create the sheet for the office
    let sheet = ss.getSheetByName(data.office);
    if (!sheet) {
      // If office sheet doesn't exist, create it
      sheet = ss.insertSheet(data.office);
      // Add headers
      sheet.appendRow(['Office', 'Location', 'Category', 'Product Name']);
    }

    // Append the new row
    sheet.appendRow([
      data.office,
      data.location || 'General',
      data.category,
      data.productName
    ]);

    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'SDS document uploaded successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'SDS Upload API is running',
    version: '1.0'
  })).setMimeType(ContentService.MimeType.JSON);
}
