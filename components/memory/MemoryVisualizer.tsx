"use client";

import { memoryBlocks } from "@/data/mockData";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { motion } from "framer-motion";
import { MemoryStick, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const typeColors = {
  heap: "from-nexus-primary/20 to-nexus-secondary/20 border-nexus-primary/30",
  stack: "from-nexus-success/20 to-nexus-primary/20 border-nexus-success/30",
  static: "from-nexus-warning/20 to-nexus-error/20 border-nexus-warning/30",
};

export function MemoryVisualizer() {
  const totalSize = memoryBlocks.reduce((acc, b) => acc + b.size, 0);
  const usedSize = memoryBlocks.filter((b) => b.status === "allocated").reduce((acc, b) => acc + b.size, 0);
  const leakedSize = memoryBlocks.filter((b) => b.status === "leaked").reduce((acc, b) => acc + b.size, 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassPanel className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nexus-primary/10">
              <MemoryStick size={20} className="text-nexus-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalSize.toLocaleString()} B</div>
              <div className="text-xs text-nexus-muted">Total Allocated</div>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nexus-success/10">
              <MemoryStick size={20} className="text-nexus-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">{usedSize.toLocaleString()} B</div>
              <div className="text-xs text-nexus-muted">Active Usage</div>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className={cn("p-4", leakedSize > 0 && "border-nexus-error/30")}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nexus-error/10">
              <AlertTriangle size={20} className="text-nexus-error" />
            </div>
            <div>
              <div className={cn("text-2xl font-bold", leakedSize > 0 && "text-nexus-error")}>
                {leakedSize.toLocaleString()} B
              </div>
              <div className="text-xs text-nexus-muted">Memory Leaks</div>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-4">
        <h3 className="mb-4 font-geist text-lg font-semibold">Memory Map</h3>
        <div className="space-y-2">
          {memoryBlocks.map((block, index) => (
            <motion.div
              key={block.address}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center gap-4 rounded-lg border bg-gradient-to-r p-3 transition-all hover:scale-[1.01]",
                typeColors[block.type]
              )}
            >
              <div className="w-32 shrink-0 font-mono text-sm text-nexus-muted">{block.address}</div>
              <div className="w-20 shrink-0 text-right font-mono text-sm font-bold">{block.size} B</div>
              <div className="w-16 shrink-0">
                <StatusBadge status={block.status} />
              </div>
              <div className="flex-1 truncate text-sm">{block.value || "—"}</div>
              <div className="w-20 shrink-0 text-right text-xs font-medium uppercase tracking-wider text-nexus-muted">
                {block.type}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="p-4">
        <h3 className="mb-4 font-geist text-lg font-semibold">Allocation Timeline</h3>
        <div className="relative h-32 overflow-hidden rounded-lg bg-nexus-bg">
          {memoryBlocks.map((block, i) => {
            const left = (i / memoryBlocks.length) * 100;
            const width = (block.size / totalSize) * 100;
            return (
              <motion.div
                key={block.address}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "absolute top-0 h-full border-r border-nexus-bg",
                  block.status === "allocated" && "bg-nexus-primary/30",
                  block.status === "free" && "bg-nexus-elevated",
                  block.status === "leaked" && "bg-nexus-error/30"
                )}
                style={{ left: `${left}%` }}
                title={`${block.address} - ${block.size}B`}
              />
            );
          })}
          <div className="absolute bottom-2 left-2 flex gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-nexus-primary/30" /> Allocated</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-nexus-elevated" /> Free</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-nexus-error/30" /> Leaked</span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
