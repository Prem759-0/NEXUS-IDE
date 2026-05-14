"use client";

import { processes } from "@/data/mockData";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SortKey = "name" | "pid" | "cpu" | "memory" | "status";
type SortDir = "asc" | "desc";

export function ProcessTable() {
  const [sortKey, setSortKey] = useState<<SortKey>("cpu");
  const [sortDir, setSortDir] = useState<<SortDir>("desc");

  const sorted = [...processes].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDir === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const headers: { key: SortKey; label: string }[] = [
    { key: "name", label: "Process" },
    { key: "pid", label: "PID" },
    { key: "cpu", label: "CPU %" },
    { key: "memory", label: "Memory (MB)" },
    { key: "status", label: "Status" },
  ];

  return (
    <GlassPanel className="overflow-hidden">
      <div className="border-b border-nexus-border/50 px-4 py-3">
        <h3 className="font-geist text-lg font-semibold">Active Processes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-nexus-border/50 text-left text-nexus-muted">
              {headers.map((h) => (
                <th
                  key={h.key}
                  onClick={() => toggleSort(h.key)}
                  className="cursor-pointer px-4 py-3 font-medium transition-colors hover:text-nexus-foreground"
                >
                  <div className="flex items-center gap-1">
                    {h.label}
                    <ArrowUpDown size={14} className={cn(sortKey === h.key && "text-nexus-primary")} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((proc, index) => (
              <motion.tr
                key={proc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-nexus-border/30 transition-colors hover:bg-nexus-elevated/50"
              >
                <td className="px-4 py-2.5 font-mono font-medium">{proc.name}</td>
                <td className="px-4 py-2.5 font-mono text-nexus-muted">{proc.pid}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-nexus-elevated">
                      <motion.div
                        className="h-full rounded-full bg-nexus-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${proc.cpu}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="font-mono text-nexus-primary">{proc.cpu.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 font-mono text-nexus-muted">{proc.memory} MB</td>
                <td className="px-4 py-2.5">
                  <StatusBadge status={proc.status} />
                </td>
                <td className="px-4 py-2.5 text-nexus-muted">{proc.user}</td>
                <td className="px-4 py-2.5 font-mono text-nexus-muted">{proc.time}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}
