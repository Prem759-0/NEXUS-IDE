"use client";

import { useSystemMetrics } from "@/hooks/useSystemMetrics";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export function MetricsChart() {
  const metrics = useSystemMetrics();

  const cpuData = metrics.cpu.map((value, index) => ({
    time: `${index * 2}s`,
    value,
    user: value * 0.7,
    system: value * 0.3,
  }));

  const memoryData = [
    { name: "Used", value: metrics.memory, fill: "#00f0ff" },
    { name: "Cache", value: 23, fill: "#7000ff" },
    { name: "Free", value: 100 - metrics.memory - 23, fill: "#2a2a3a" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <GlassPanel className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-geist text-lg font-semibold">CPU Usage</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-nexus-primary" />
              User
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-nexus-secondary" />
              System
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={cpuData}>
            <defs>
              <linearGradient id="cpuUser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cpuSystem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7000ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7000ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#12121a",
                border: "1px solid #2a2a3a",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#e2e8f0" }}
            />
            <Area type="monotone" dataKey="user" stroke="#00f0ff" fill="url(#cpuUser)" strokeWidth={2} />
            <Area type="monotone" dataKey="system" stroke="#7000ff" fill="url(#cpuSystem)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassPanel>

      <GlassPanel className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-geist text-lg font-semibold">Memory Distribution</h3>
          <span className="text-2xl font-bold text-nexus-primary">{metrics.memory.toFixed(1)}%</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={memoryData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" fontSize={12} />
            <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={60} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#12121a",
                border: "1px solid #2a2a3a",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {memoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassPanel>
    </div>
  );
}
