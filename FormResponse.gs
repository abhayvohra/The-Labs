function doPost(e) {
  const sheet = SpreadsheetApp.openById('1GzINcdWvALBtik-CHvuzyUwA4xulLfDqXrB57U84QdU').getActiveSheet();
  sheet.appendRow([
    new Date(),
    e.parameter['name'],
    e.parameter['email'],
    e.parameter['interest'],
    e.parameter['message']
  ]);

  GmailApp.sendEmail(
    'abhay@embodiedintelligence.in',
    'New enquiry — ' + e.parameter['interest'],
    'Name: ' + e.parameter['name'] + '\n' +
    'Email: ' + e.parameter['email'] + '\n' +
    'Interest: ' + e.parameter['interest'] + '\n\n' +
    'Message:\n' + e.parameter['message']
  );

  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

function doGet(e) {
  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}