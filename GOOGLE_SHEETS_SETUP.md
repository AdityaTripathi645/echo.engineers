# Google Sheets Webhook Setup

This project can send Join and Contact form submissions to Google Sheets via a Google Apps Script Web App.

## 1. Create a new Google Apps Script project

1. Open `https://script.google.com/`
2. Create a new project
3. Replace the contents of `Code.gs` with the code from `google-sheets-webhook/Code.gs`
4. Save the script

## 2. Deploy the script as a Web App

1. Click `Deploy` → `New deployment`
2. Select `Web app`
3. Set `Description` to something like `Echo Engineers Form Webhook`
4. Under `Execute as`, choose `Me`
5. Under `Who has access`, choose `Anyone`
6. Click `Deploy`
7. Accept any authorization prompts
8. Copy the `Web app URL`

## 3. Configure the form URL(s)

In your project root, create a `.env` file based on `.env.example`:

```env
VITE_JOIN_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_WEB_APP_ID/exec
VITE_CONTACT_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_WEB_APP_ID/exec
```

You can use the same deployed URL for both variables.

## 4. (Optional) Configure EmailJS

If you want email delivery as well, add these values to `.env`:

```env
VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
```

If EmailJS is not configured, the app will fall back to opening the user's email client with a prefilled message.

## 5. Success behavior

- Join form submissions are written to the first sheet in the Join Google Sheet
- Contact form submissions are written to the first sheet in the Contact Google Sheet
- If the target sheet is empty, the script adds header rows automatically

## 6. Notes

- Make sure the Google Sheet is accessible by the account that deploys the Apps Script.
- Set the Web App access to `Anyone` or `Anyone, even anonymous` so the browser can POST to it.
- The payload type is used to route rows to the correct sheet.
