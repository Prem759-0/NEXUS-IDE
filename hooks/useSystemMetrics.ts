"use client";

import { useState, useEffect } from "react";
import type { SystemMetrics } from "@/types";
import { generateRandomMetrics } from "@/lib/utils";

export function useSystemMetrics(): SystemMetrics {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: generateRandomMetrics(20),
    memory: 42,
    disk: 68,
    network: { up: 12.5, down: 45.2 },
    temperature: 62,
    processes: 184,
    uptime: "5d 12h 34m",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: [...prev.cpu.slice(1), Math.floor(Math.random() * 100)],
        memory: Math.min(100, prev.memory + (Math.random() - 0.5) * 5),
        disk: prev.disk,
        network: {
          up: Math.max(0, prev.network.up + (Math.random() - 0.5) * 3),
          down: Math.max(0, prev.network.down + (Math.random() - 0.5) * 8),
        },
        temperature: Math.min(95, Math.max(35, prev.temperature + (Math.random() - 0.5) * 2)),
        processes: prev.processes + Math.floor((Math.random() - 0.5) * 3),
        uptime: prev.uptime,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}