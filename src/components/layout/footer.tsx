import Link from "next/link";
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandInstagram,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";
import { Logo } from "./logo";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-card/40">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {site.tagline}. Moins de paperasse, plus de temps pour les
              familles.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <IconBrandLinkedin className="size-[18px]" />
              </SocialLink>
              <SocialLink href={site.social.twitter} label="X">
                <IconBrandX className="size-[18px]" />
              </SocialLink>
              <SocialLink href={site.social.instagram} label="Instagram">
                <IconBrandInstagram className="size-[18px]" />
              </SocialLink>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label + item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <IconMail className="mt-0.5 size-4 shrink-0 text-brand" />
                <a href={`mailto:${site.email}`} className="hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <IconMapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{site.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/legal/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </Link>
            <Link href="/legal/confidentialite" className="hover:text-foreground">
              Confidentialité
            </Link>
            <Link href="/legal/cgu" className="hover:text-foreground">
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-brand hover:text-brand"
    >
      {children}
    </a>
  );
}
