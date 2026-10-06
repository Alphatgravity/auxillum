"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export function StatsSection() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 rounded-3xl glass-panel/50 p-8 md:grid-cols-4 md:p-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-heading text-3xl font-bold text-gradient-brand sm:text-4xl md:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
