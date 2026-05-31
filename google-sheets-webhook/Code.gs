const JOIN_SHEET_ID = "1KFIVG457ZPBKZI9d_R1e5I8YdcRlgtTkk5sI97o29Ck";
const CONTACT_SHEET_ID = "18jIT0fJ4Qh2mzpZHE_8dQ8hKS0Qtn6dO9aIK8Vk1uww";

function getSheet(type) {
  if (type === "join") {
    return SpreadsheetApp.openById(JOIN_SHEET_ID).getSheets()[0];
  }
  if (type === "contact") {
    return SpreadsheetApp.openById(CONTACT_SHEET_ID).getSheets()[0];
  }
  return null;
}

function buildRow(type, payload) {
  const now = new Date();
  const timestamp = now.toISOString();
  if (type === "join") {
    return [
      timestamp,
      payload.name || "",
      payload.email || "",
      payload.college || "",
      payload.skills || "",
      Array.isArray(payload.interests)
        ? payload.interests.join(", ")
        : payload.interests || "",
    ];
  }
  if (type === "contact") {
    return [
      timestamp,
      payload.name || "",
      payload.email || "",
      payload.message || "",
    ];
  }
  return [];
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const type = payload.type;
    const sheet = getSheet(type);

    if (!sheet) {
      return jsonResponse({ success: false, error: "Unknown form type" }, 400);
    }

    // Append a header row if the sheet is empty.
    if (sheet.getLastRow() === 0) {
      if (type === "join") {
        sheet.appendRow([
          "Timestamp",
          "Name",
          "Email",
          "College / Branch / Year",
          "Skills",
          "Interests",
        ]);
      } else if (type === "contact") {
        sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
      }
    }

    const row = buildRow(type, payload);
    sheet.appendRow(row);
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message }, 500);
  }
}

function doGet() {
  return jsonResponse({ success: true, status: "ready" });
}

function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  output.setHeader("Access-Control-Allow-Origin", "*");
  output.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  output.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (statusCode) {
    output.setHeader("Cache-Control", "no-cache");
  }
  output.append("\n");
  return output;
}
