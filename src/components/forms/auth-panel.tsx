import { IconStarFilled } from "@tabler/icons-react";
import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { Logo } from "@/components/layout/logo";

export function AuthPanel() {
  return (
    <AuroraBackground className="hidden h-full min-h-[600px] rounded-3xl border border-border lg:flex">
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-10">
        <Logo />
        <div className="max-w-sm">
          <div className="flex items-center gap-0.5 text-brand">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStarFilled key={i} className="size-4" />
            ))}
          </div>
          <blockquote className="mt-4 font-heading text-xl font-medium leading-relaxed text-foreground">
            « Moins de paperasse, plus de temps pour les familles. »
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-sm font-semibold text-brand-foreground">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Auxillum</p>
              <p className="text-xs text-muted-foreground">
                Le copilote IA des pompes funèbres
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
