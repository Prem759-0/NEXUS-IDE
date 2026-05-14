"use client";

import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Terminal,
  FileCode,
  Cpu,
  MemoryStick,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, shortcut: "Ctrl+D" },
  { id: "terminal", label: "Terminal", icon: Terminal, shortcut: "Ctrl+T" },
  { id: "files", label: "Files", icon: FileCode, shortcut: "Ctrl+Shift+P" },
  { id: "algorithms", label: "Algorithms", icon: BarChart3, shortcut: "Ctrl+A" },
  { id: "memory", label: "Memory", icon: MemoryStick, shortcut: "Ctrl+M" },
  { id: "profiler", label: "Profiler", icon: Cpu, shortcut: "Ctrl+R" },
  { id: "settings", label: "Settings", icon: Settings, shortcut: "Ctrl+," },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, activePanel, setActivePanel } = useAppStore();

  return (
    <motion.aside
      className={cn(
        "relative flex flex-col border-r border-nexus-border/50 bg-nexus-surface/95 backdrop-blur-xl",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
      animate={{ width: sidebarCollapsed ? 64 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex h-14 items-center justify-between border-b border-nexus-border/50 px-4">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-nexus-primary to-nexus-secondary">
              <span className="font-mono text-sm font-bold text-white">N</span>
            </div>
            <span className="font-geist text-lg font-bold tracking-tight">NEXUS</span>
          </motion.div>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-nexus-muted transition-colors hover:bg-nexus-elevated hover:text-nexus-foreground"
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-nexus-primary/10 text-nexus-primary"
                  : "text-nexus-muted hover:bg-nexus-elevated hover:text-nexus-foreground"
              )}
            >
              <Icon size={20} className={cn("shrink-0", isActive && "text-nexus-primary")} />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-y-0 left-0 w-0.5 bg-nexus-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {!sidebarCollapsed && (
                <span className="ml-auto text-xs text-nexus-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.shortcut}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-nexus-border/50 p-4">
        {!sidebarCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-nexus-muted">
              <span>System</span>
              <span className="text-nexus-success">● Online</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-nexus-elevated">
              <motion.div
                className="h-full bg-gradient-to-r from-nexus-primary to-nexus-secondary"
                animate={{ width: ["0%", "65%", "45%", "78%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}