export function getDeviceId(): string {
  const key = "casavora_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function getDeviceName(): string {
  return navigator.userAgent;
}
