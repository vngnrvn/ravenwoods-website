/**
 * Ravenwoods quote inquiry endpoint.
 *
 * Setup:
 * 1. Create a Google Sheet and copy its ID from the URL.
 * 2. Open Extensions > Apps Script and paste this file.
 * 3. Set SHEET_ID and NOTIFICATION_EMAIL below.
 * 4. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5. Copy the deployed /exec URL into GitHub Actions variable
 *    VITE_INQUIRY_ENDPOINT.
 *
 * Security note: the public endpoint accepts anonymous form submissions.
 * This starter includes basic validation and a honeypot-ready structure,
 * but before high-volume production use add stronger abuse protection,
 * rate limiting, or a verified form provider. Never put private credentials
 * in the frontend repository.
 */
const SHEET_ID = "REPLACE_WITH_GOOGLE_SHEET_ID";
const NOTIFICATION_EMAIL = "REPLACE_WITH_YOUR_EMAIL";
const TAB_NAME = "Inquiries";

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw) return jsonResponse({ ok: false, error: "Missing request body" });

    const data = JSON.parse(raw);
    const name = clean(data.name, 120);
    const email = clean(data.email, 200);
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "Name and valid email are required" });
    }

    const sheet = getSheet_();
    const record = [
      new Date(),
      name,
      email,
      clean(data.phone, 60),
      clean(data.projectType, 120),
      clean(data.location, 200),
      clean(data.budget, 80),
      clean(data.timeline, 80),
      clean(data.message, 5000),
      clean(data.source, 500),
      clean(data.submittedAt, 80),
      "New"
    ];
    sheet.appendRow(record);

    const subject = "New Ravenwoods project inquiry — " + name;
    const body = [
      "A new project inquiry was submitted through the Ravenwoods website.",
      "",
      "Name: " + name,
      "Email: " + email,
      "Phone: " + clean(data.phone, 60),
      "Project type: " + clean(data.projectType, 120),
      "Location: " + clean(data.location, 200),
      "Budget: " + clean(data.budget, 80),
      "Target timeline: " + clean(data.timeline, 80),
      "",
      "Project details:",
      clean(data.message, 5000),
      "",
      "Source: " + clean(data.source, 500),
      "Spreadsheet row: " + sheet.getLastRow()
    ].join("\n");

    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.indexOf("REPLACE_") !== 0) {
      MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body, { replyTo: email });
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: "Unable to process inquiry" });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: "Ravenwoods inquiry endpoint" });
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Received at", "Name", "Email", "Phone", "Project type", "Location",
      "Budget", "Timeline", "Message", "Source URL", "Client timestamp", "Status"
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean(value, maxLength) {
  return String(value == null ? "" : value).replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
