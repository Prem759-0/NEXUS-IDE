"use client";

import { useAppStore } from "@/store/useAppStore";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Terminal } from "@/components/terminal/Terminal";
import { MetricsChart } from "@/components/dashboard/MetricsChart";
import { ProcessTable } from "@/components/dashboard/ProcessTable";
import { BuildPipeline } from "@/components/dashboard/BuildPipeline";
import { FileExplorer } from "@/components/files/FileExplorer";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { AlgorithmVisualizer } from "@/components/algorithms/AlgorithmVisualizer";
import { MemoryVisualizer } from "@/components/memory/MemoryVisualizer";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useSystemMetrics } from "@/hooks/useSystemMetrics";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Thermometer,
  Clock,
  Layers,
} from "lucide-react";

function Dashboard() {
  const metrics = useSystemMetrics();

  const statCards = [
    { label: "CPU Load", value: `${metrics.cpu[metrics.cpu.length - 1].toFixed(1)}%`, icon: Cpu, color: "text-nexus-primary", bg: "bg-nexus-primary/10" },
    { label: "Memory", value: `${metrics.memory.toFixed(1)}%`, icon: Activity, color: "text-nexus-success", bg: "bg-nexus-success/10" },
    { label: "Disk I/O", value: `${metrics.disk}%`, icon: HardDrive, color: "text-nexus-warning", bg: "bg-nexus-warning/10" },
    { label: "Network", value: `${metrics.network.down.toFixed(1)} MB/s`, icon: Wifi, color: "text-nexus-secondary", bg: "bg-nexus-secondary/10" },
    { label: "Temp", value: `${metrics.temperature.toFixed(0)}°C`, icon: Thermometer, color: "text-nexus-error", bg: "bg-nexus-error/10" },
    { label: "Processes", value: `${metrics.processes}`, icon: Layers, color: "text-nexus-muted", bg: "bg-nexus-muted/10" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassPanel className="p-4" hover>
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", stat.bg)}>
                    <Icon size={20} className={stat.color} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-nexus-muted">{stat.label}</div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>

      <MetricsChart />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <ProcessTable />
        <BuildPipeline />
      </div>
    </div>
  );
}

function TerminalPage() {
  return (
    <div className="h-full p-6">
      <Terminal />
    </div>
  );
}

function FilesPage() {
  return (
    <div className="flex h-full gap-4 p-6">
      <div className="w-64 shrink-0">
        <FileExplorer />
      </div>
      <div className="flex-1 min-w-0">
        <CodeEditor />
      </div>
    </div>
  );
}

function AlgorithmsPage() {
  return (
    <div className="p-6">
      <AlgorithmVisualizer />
    </div>
  );
}

function MemoryPage() {
  return (
    <div className="p-6">
      <MemoryVisualizer />
    </div>
  );
}

function ProfilerPage() {
  return (
    <div className="flex h-full items-center justify-center p-6 text-nexus-muted">
      <GlassPanel className="p-8 text-center">
        <Cpu size={48} className="mx-auto mb-4 opacity-20" />
        <h3 className="font-geist text-xl font-bold mb-2">CPU Profiler</h3>
        <p>Profiling session recording. Data will appear here when a build is running.</p>
        <p className="mt-2 text-xs">Start a build from the Terminal to generate profiling data.</p>
      </GlassPanel>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="p-6">
      <SettingsPanel />
    </div>
  );
}

import { cn } from "@/lib/utils";

export default function Home() {
  useKeyboardShortcuts();
  const { activePanel, theme } = useAppStore();

  const panels: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    terminal: <TerminalPage />,
    files: <FilesPage />,
    algorithms: <AlgorithmsPage />,
    memory: <MemoryPage />,
    profiler: <ProfilerPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className={cn("flex h-screen overflow-hidden", theme.mode === "light" && "light")}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden bg-nexus-bg">
        <Header />
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {panels[activePanel] || <Dashboard />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
