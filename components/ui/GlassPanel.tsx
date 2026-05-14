"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassPanel({ children, className, hover = false, glow = false }: GlassPanelProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-nexus-border/50 bg-nexus-surface/80 backdrop-blur-xl",
        hover && "transition-all duration-300 hover:border-nexus-primary/30 hover:shadow-lg hover:shadow-nexus-primary/5",
        glow && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-nexus-primary/5 before:via-transparent before:to-nexus-secondary/5 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}