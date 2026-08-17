import { NextResponse } from "next/server";
import { AIRTABLE_TABLES, createAirtableRecord } from "@/lib/airtable";
import { getSubmissionMeta } from "@/lib/request-meta";

const SOURCE_TABLE = {
  Survey: AIRTABLE_TABLES.shapeIt,
  Newsletter: AIRTABLE_TABLES.subscription,
  "Founding Members": AIRTABLE_TABLES.founder,
} as const;
type Source = keyof typeof SOURCE_TABLE;

function isSource(value: unknown): value is Source {
  return typeof value === "string" && value in SOURCE_TABLE;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const source: unknown = body?.source;
  if (!body || !isSource(source)) {
    return NextResponse.json({ success: false, error: "Invalid or missing 'source'" }, { status: 400 });
  }
  if (typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ success: false, error: "Valid 'email' is required" }, { status: 400 });
  }

  const fields: Record<string, string | number | string[]> = {
    Email: body.email,
    ...getSubmissionMeta(request, body),
  };

  if (typeof body.tool === "string" && body.tool) fields["Current Tool"] = body.tool;
  if (typeof body.stress === "number") fields["Stress Level"] = body.stress;
  if (Array.isArray(body.tasks) && body.tasks.length) fields["Hardest Tasks"] = body.tasks.join(", ");
  if (typeof body.pay === "string" && body.pay) fields["Would Pay"] = body.pay;

  try {
    const record = await createAirtableRecord(SOURCE_TABLE[source], fields);
    return NextResponse.json({ success: true, id: record.id });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 }
    );
  }
}
