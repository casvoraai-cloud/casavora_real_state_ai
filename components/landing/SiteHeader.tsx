"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#familiar", label: "Problem" },
  { href: "#demo", label: "Prototype" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#survey", label: "Shape it" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 my-3 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src="/logoNew.png" alt="Casavora" className="h-14 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-ink-soft transition-colors duration-300 ease-out hover:text-ink after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-ink after:transition-all after:duration-300 after:ease-out hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            render={<a href="#founding" />}
            nativeButton={false}
            className="hidden sm:inline-flex h-auto rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover-lift"
          >
            Join founding members
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="h-9 w-9 md:hidden text-ink"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1 text-sm text-ink-soft">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              render={<a href="#founding" onClick={() => setMobileOpen(false)} />}
              nativeButton={false}
              className="mt-2 h-auto w-full justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover-lift"
            >
              Join founding members
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
