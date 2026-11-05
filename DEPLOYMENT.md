# Deployment Guide

## Website (GitHub Pages)

The site is a single `index.html` file hosted on GitHub Pages at `embodiedintelligence.in`.

### Workflow
1. Edit `index.html` locally
2. Commit and push to `main`:
   ```bash
   git add index.html
   git commit -m "Your message"
   git push
   ```
3. GitHub Pages rebuilds automatically in ~1–2 minutes

### Repository
- GitHub: `https://github.com/abhayvohra/The-Labs`
- Branch: `main`, root `/`
- Custom domain: `embodiedintelligence.in` (configured in repo Settings → Pages)

### Backup
Before making significant changes, create a backup:
```bash
cp index.html index.backup.html
```

---

## Contact Form

The contact form posts to a Google Apps Script Web App, which writes to a Google Sheet and sends an email notification.

### Architecture
```
index.html form → Apps Script Web App → Google Sheet + Email
```

### Google Sheet
- URL: `https://docs.google.com/spreadsheets/d/1GzINcdWvALBtik-CHvuzyUwA4xulLfDqXrB57U84QdU/edit`
- Columns: Timestamp, Name, Email, Interest, Message

### Apps Script
- Script file: `FormResponse.gs`
- Web App URL: `https://script.google.com/macros/s/AKfycbxKeTVxXN8mDqBbd1zJkmE0OerHvwEspU80a2JwWSalJc2UQi5yGyNoG6eMKd8AgfHjFg/exec`
- Notifications sent to: `abhay@embodiedintelligence.in`

### Apps Script code
```javascript
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
```

### Redeploying the Apps Script
After any change to the script:
1. Go to [script.google.com](https://script.google.com) and open the project
2. **Deploy → Manage deployments**
3. Click the edit (pencil) icon on the active deployment
4. Set Version to **New version**
5. Click **Deploy**
6. The Web App URL stays the same — no change needed in `index.html`

### Deployment settings
- Execute as: **Me** (abhayvohra@gmail.com)
- Who has access: **Anyone**
- OAuth scopes required: Gmail send, Google Sheets

### Changing the notification email
Update the `GmailApp.sendEmail` recipient in `FormResponse.gs`, then redeploy as above.

---

## DNS / Domain

The domain `embodiedintelligence.in` points to GitHub Pages via a CNAME record. DNS is managed separately from the repository. Do not change the `CNAME` file in the repo root.
