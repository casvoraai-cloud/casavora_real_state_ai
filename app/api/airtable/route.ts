import { NextResponse } from "next/server";

export async function GET() {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    return NextResponse.json(
      { success: false, error: "Missing AIRTABLE_PAT, AIRTABLE_BASE_ID, or AIRTABLE_TABLE_NAME in .env" },
      { status: 500 }
    );
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?maxRecords=1`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_PAT}` },
  });

  const body = await res.json();

  if (!res.ok) {
    return NextResponse.json({ success: false, status: res.status, error: body }, { status: res.status });
  }

  return NextResponse.json({ success: true, recordCount: body.records?.length ?? 0, sample: body.records?.[0] ?? null });
}
