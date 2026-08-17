export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Set automatically by Vercel's edge network; absent when running elsewhere (e.g. locally).
export function getCountryName(request: Request): string {
  return request.headers.get("x-vercel-ip-country") ?? "unknown";
}

export function getSubmissionMeta(request: Request, body: { deviceId?: unknown; deviceName?: unknown }) {
  return {
    "Device ID": typeof body.deviceId === "string" && body.deviceId ? body.deviceId : "unknown",
    "Device Name": typeof body.deviceName === "string" && body.deviceName ? body.deviceName : "unknown",
    IP: getClientIp(request),
    "Country Name": getCountryName(request),
    DATE: new Date().toISOString(),
  };
}
