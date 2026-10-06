import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-border pt-36 pb-16",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand/12 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {eyebrow && (
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
              <span className="size-1.5 rounded-full bg-brand" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
