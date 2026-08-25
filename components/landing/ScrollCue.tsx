"use client";

export function ScrollCue({ to, label = "Scroll to next section" }: { to: string; label?: string }) {
  const handleClick = () => {
    document.getElementById(to)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        className="grid place-items-center w-11 h-11 rounded-full border border-border bg-surface text-ink-soft transition-colors hover:border-accent hover:text-accent active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-bounce-y">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
