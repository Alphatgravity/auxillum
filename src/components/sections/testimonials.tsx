import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Pour qui"
          title="Pensé pour chaque acteur du dossier"
          subtitle="Agences indépendantes et petits réseaux d'abord, en France, puis en Belgique et en Suisse romande."
        />
      </div>
      <div className="mt-14 flex flex-col gap-4">
        <InfiniteMovingCards
          items={testimonials.slice(0, half)}
          direction="left"
          speed="slow"
          className="mx-auto"
        />
        <InfiniteMovingCards
          items={testimonials.slice(half)}
          direction="right"
          speed="slow"
          className="mx-auto"
        />
      </div>
    </section>
  );
}
