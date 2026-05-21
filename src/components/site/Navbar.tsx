import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#home", label: "Home" },
  { href: "#vision", label: "Vision" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#eligibility", label: "Eligibility" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3"
    >
      <nav
        className={`w-full max-w-6xl flex items-center justify-between px-4 sm:px-5 py-3 rounded-2xl transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]" : "glass"
        }`}
        aria-label="Primary"
      >
        <a href="#home" onClick={(e) => { e.preventDefault(); go("#home"); }} className="flex items-center gap-2 group">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
            B
            <span className="absolute inset-0 rounded-lg blur-md bg-gradient-to-br from-primary to-accent opacity-40 group-hover:opacity-70 transition" />
          </span>
          <span className="font-display font-semibold tracking-tight text-sm sm:text-base">
            Billa Janta Party
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => { e.preventDefault(); go(l.href); }}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            onClick={() => go("#eligibility")}
            className="rounded-xl bg-gradient-to-r from-primary to-amber-300 text-primary-foreground hover:opacity-90 font-semibold"
          >
            Check Eligibility
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-2 rounded-lg hover:bg-white/5"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[68px] inset-x-3 md:hidden glass-strong rounded-2xl p-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); go(l.href); }}
                className="px-3 py-3 text-sm rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <Button
              onClick={() => go("#eligibility")}
              className="mt-2 rounded-xl bg-gradient-to-r from-primary to-amber-300 text-primary-foreground font-semibold"
            >
              Check Eligibility
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
