"use client";

import { buildSteps } from "@/data/mockData";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { motion } from "framer-motion";
import { Check, Loader2, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

const statusIcons = {
  success: Check,
  running: Loader2,
  pending: Clock,
  failed: X,
};

export function BuildPipeline() {
  return (
    <GlassPanel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-geist text-lg font-semibold">Build Pipeline</h3>
        <div className="flex items-center gap-2 text-xs text-nexus-muted">
          <span className="flex items-center gap-1">
            <Check size={12} className="text-nexus-success" /> 2 Done
          </span>
          <span className="flex items-center gap-1">
            <Loader2 size={12} className="animate-spin text-nexus-warning" /> 1 Running
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> 3 Pending
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {buildSteps.map((step, index) => {
          const Icon = statusIcons[step.status];
          const isLast = index === buildSteps.length - 1;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-3.5 top-8 h-full w-px",
                    step.status === "success" ? "bg-nexus-success/30" : "bg-nexus-border/30"
                  )}
                />
              )}
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                    step.status === "success" && "border-nexus-success bg-nexus-success/10 text-nexus-success",
                    step.status === "running" && "border-nexus-warning bg-nexus-warning/10 text-nexus-warning",
                    step.status === "pending" && "border-nexus-muted bg-nexus-elevated text-nexus-muted",
                    step.status === "failed" && "border-nexus-error bg-nexus-error/10 text-nexus-error"
                  )}
                >
                  <Icon size={14} className={step.status === "running" ? "animate-spin" : ""} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{step.name}</span>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={step.status} />
                      {step.duration > 0 && (
                        <span className="font-mono text-xs text-nexus-muted">{step.duration.toFixed(1)}s</span>
                      )}
                    </div>
                  </div>
                  {step.output.length > 0 && (
                    <div className="rounded-lg bg-nexus-bg p-2 font-mono text-xs text-nexus-muted">
                      {step.output.map((line, i) => (
                        <div key={i} className="truncate">{line}</div>
                      ))}
                    </div>
                  )}
                  {step.status === "running" && (
                    <div className="h-1 overflow-hidden rounded-full bg-nexus-elevated">
                      <motion.div
                        className="h-full bg-nexus-warning"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
