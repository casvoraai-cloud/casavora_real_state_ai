import { NextResponse } from "next/server";
import { AIRTABLE_TABLES, createAirtableRecord, updateAirtableRecord } from "@/lib/airtable";
import { getSubmissionMeta } from "@/lib/request-meta";

// Maps each checklist item's UI label to its actual Airtable column name
// (the Airtable table was built by hand with different wording/typos than the UI).
const ITEM_FIELD_MAP: Record<string, string> = {
  "Forgot appliance warranty": "Forgot Applicance Warranty",
  "Can't find insurance papers": "Can't Find insurance Paper",
  "Missed maintenance schedule": "Missed Maintanence Shedule",
  "Tenant keeps texting you": "Tennant Keeps Texting you",
  "Lost inspection report": "Lost Inspection report",
  "Roof leak became expensive": "Roof leak became expensive",
  "Unsure what maintenance is due": "Unsure what maintenance is due",
  "Bills scattered across five apps": "Bills scattered across file apps",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.values !== "object" || body.values === null) {
    return NextResponse.json({ success: false, error: "'values' must be an object" }, { status: 400 });
  }

  const itemFields: Record<string, string> = {};
  for (const [label, airtableField] of Object.entries(ITEM_FIELD_MAP)) {
    itemFields[airtableField] = body.values[label] === 1 ? "1" : "0";
  }

  const hiddenFields = getSubmissionMeta(request, body);

  try {
    if (typeof body.id === "string" && body.id) {
      await updateAirtableRecord(AIRTABLE_TABLES.problem, body.id, { ...itemFields, ...hiddenFields });
      return NextResponse.json({ success: true, id: body.id });
    }

    const record = await createAirtableRecord(AIRTABLE_TABLES.problem, {
      ...itemFields,
      ...hiddenFields,
    });
    return NextResponse.json({ success: true, id: record.id });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 }
    );
  }
}
