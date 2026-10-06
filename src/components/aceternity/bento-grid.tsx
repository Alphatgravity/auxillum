"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  index = 0,
}: {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl glass-panel p-5 shadow-sm transition duration-300 hover:shadow-[0_0_0_1px_var(--brand)] hover:shadow-brand/20",
        className,
      )}
    >
      <div
        key="glow"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100"
      >
        <div className="absolute -top-24 -right-24 size-64 rounded-full bg-brand/20 blur-3xl" />
      </div>
      <React.Fragment key="header">{header}</React.Fragment>
      <div
        key="content"
        className="relative z-10 transition duration-200 group-hover/bento:translate-x-1"
      >
        <React.Fragment key="icon">{icon}</React.Fragment>
        <div
          key="title"
          className="mt-2 mb-1 font-heading text-lg font-semibold text-foreground"
        >
          {title}
        </div>
        <div key="desc" className="text-sm text-muted-foreground">
          {description}
        </div>
      </div>
    </motion.div>
  );
}
