# Ravenwoods website — GitHub starter

A responsive React + Vite starter for a modern, premium, architectural Ravenwoods website. Includes navigation, service sections, filtered project cards, project-detail modal, FAQ accordion, inquiry form, and a Google Apps Script endpoint for saving inquiries to Google Sheets and emailing a notification.

## Important before publishing

- The project names are based on the prior site review, but **verify every project name, description, and image match**.
- The image URLs are illustrative remote Unsplash images. Replace them with approved Ravenwoods project photography before launch.
- Replace the placeholder contact email and confirm all public-facing copy.
- The Ravenwoods red is a provisional CSS token; adjust it to match the official logo color.
- Confirm that the font choice matches the official brand kit.
- Add a privacy policy before collecting real inquiries.
- Test the form end-to-end before announcing the website.

## Run locally

Install Node.js 20 or later.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

To create a production build:

```bash
npm run build
npm run preview
```

## Publish to GitHub Pages

1. Create a GitHub repository, e.g. `ravenwoods-website`.
2. Upload the contents of this folder to the repository root.
3. Commit to the `main` branch.
4. In GitHub, open **Settings → Pages** and set the source to **GitHub Actions**.
5. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys the site.
6. The site URL will be `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

The Vite config uses the repository name as the production base path when running in GitHub Actions.

## Connect inquiry form to Google Sheets + email

### A. Create the spreadsheet

Create a Google Sheet called `Ravenwoods Website Inquiries`. Copy its ID from the URL:

`https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

### B. Deploy Apps Script

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Paste the contents of `google-apps-script/Code.gs`.
3. Replace `SHEET_ID` with the spreadsheet ID.
4. Replace `NOTIFICATION_EMAIL` with the inbox that should receive inquiry notifications.
5. Save the script.
6. Choose **Deploy → New deployment → Web app**.
7. Set **Execute as** to your account and access to **Anyone**.
8. Deploy, approve the requested Google permissions, and copy the `/exec` web app URL.

The endpoint is public because the website visitor is not expected to sign in to Google. This means it can receive spam. Keep the sheet private, use a dedicated notification inbox if desired, and add stronger anti-spam/rate controls before a high-traffic launch.

### C. Add the endpoint to GitHub

1. Open the GitHub repository → **Settings → Secrets and variables → Actions → Variables**.
2. Add a repository variable named `VITE_INQUIRY_ENDPOINT`.
3. Set its value to the Apps Script `/exec` URL.
4. Re-run the workflow or push a new commit.

The endpoint URL is not a secret; it is visible in the public frontend bundle. Do not store passwords or private API keys in `VITE_` variables.

### D. Test the full flow

Submit a test inquiry and confirm:
- a row appears in the `Inquiries` tab,
- the notification email arrives,
- the form behaves appropriately on mobile,
- invalid emails are blocked by the browser,
- failed submissions show an error.

**Important limitation:** the starter frontend uses a `no-cors` request because of cross-origin behavior. Browsers cannot read the Apps Script response in this mode, so the UI cannot verify that Sheets and email succeeded. The success message is intentionally qualified. For production-grade confirmation, use a same-origin serverless proxy or a form provider that supports CORS and delivery receipts.

## Folder structure

```text
.
├── .github/workflows/deploy.yml
├── google-apps-script/Code.gs
├── index.html
├── package.json
├── src/
│   ├── main.jsx
│   └── styles.css
├── vite.config.js
└── README.md
```

## Suggested next build steps

1. Replace illustrative images with actual approved Ravenwoods project photos.
2. Verify project names and create fuller case studies.
3. Replace placeholder email/contact details.
4. Add real About and Services routes if separate SEO pages are needed.
5. Add image upload for drawings only after choosing a secure storage destination and upload workflow.
6. Add a privacy policy, accessibility review, SEO metadata, analytics, and form abuse protection.
7. Test the GitHub Pages deployment path and all form workflows before launch.
