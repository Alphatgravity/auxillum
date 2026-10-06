"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { IconMenu2, IconX, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/site";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

const noopSubscribe = () => () => {};
const isChromium = () =>
  !!(
    navigator as Navigator & {
      userAgentData?: { brands: { brand: string }[] };
    }
  ).userAgentData?.brands.some((b) => b.brand === "Chromium");

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // La déformation du verre (filtre SVG en backdrop-filter) n'est rendue que
  // par Chromium : ailleurs on garde le flou seul.
  const distort = useSyncExternalStore(noopSubscribe, isChromium, () => false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-300",
          "glass-nav",
          distort && "glass-nav--distort",
          scrolled && "shadow-lg shadow-black/30",
        )}
      >
        <svg aria-hidden className="absolute size-0">
          <filter id="nav-glass" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.045"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button render={<Link href="/login" />} variant="ghost" size="sm">
            Connexion
          </Button>
          <Button
            render={<Link href="/signup" />}
            size="sm"
            className="group btn-brand"
          >
            Programme pilote
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" aria-label="Menu" />}
            >
              <IconMenu2 className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[300px] border-border p-0"
            >
              <SheetHeader className="border-b border-border p-4">
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <div className="flex items-center justify-between">
                  <Logo />
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Fermer"
                    className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
                  >
                    <IconX className="size-5" />
                  </button>
                </div>
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4">
                {mainNav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    render={<Link href="/login" />}
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Connexion
                  </Button>
                  <Button
                    render={<Link href="/signup" />}
                    className="btn-brand"
                    onClick={() => setOpen(false)}
                  >
                    Programme pilote
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
