type AirtableFieldValue = string | number | string[];

function getAirtableConfig() {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID } = process.env;

  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
    throw new Error("Missing AIRTABLE_PAT or AIRTABLE_BASE_ID in .env");
  }

  return { AIRTABLE_PAT, AIRTABLE_BASE_ID };
}

export async function createAirtableRecord(tableName: string, fields: Record<string, AirtableFieldValue>) {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID } = getAirtableConfig();

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message ?? `Airtable request failed with status ${res.status}`);
  }

  return data as { id: string };
}

export async function updateAirtableRecord(tableName: string, id: string, fields: Record<string, AirtableFieldValue>) {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID } = getAirtableConfig();

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message ?? `Airtable request failed with status ${res.status}`);
  }

  return data as { id: string };
}

// Each form on the site writes to its own Airtable table (tab) within the same base.
export const AIRTABLE_TABLES = {
  problem: "THE PROBLEM",
  shapeIt: "SHAPE IT",
  founder: "FOUNDER",
  subscription: "SUBSCRIPTION",
} as const;
