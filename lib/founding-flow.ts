const EVENT_NAME = "cv:request-founding-form";

// Called from SoundFamiliar's "Yes" prompt: tells the already-mounted
// FoundingMembers section to open straight on its name/email form
// instead of repeating the checklist step, then scrolls it into view.
export function requestFoundingForm() {
  window.dispatchEvent(new Event(EVENT_NAME));
  document.getElementById("founding")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onFoundingFormRequest(handler: () => void) {
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
