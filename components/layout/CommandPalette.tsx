"use client";

import { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileCode, Terminal, Settings, LayoutDashboard, Cpu, MemoryStick, BarChart3, X } from "lucide-react";
import { cn } from "@/lib/utils";

const commands = [
  { id: "dash", label: "Go to Dashboard", icon: LayoutDashboard, action: "dashboard", shortcut: "Ctrl+D" },
  { id: "term", label: "Open Terminal", icon: Terminal, action: "terminal", shortcut: "Ctrl+T" },
  { id: "files", label: "Open Files", icon: FileCode, action: "files", shortcut: "Ctrl+Shift+P" },
  { id: "algo", label: "Algorithm Visualizer", icon: BarChart3, action: "algorithms", shortcut: "Ctrl+A" },
  { id: "mem", label: "Memory Monitor", icon: MemoryStick, action: "memory", shortcut: "Ctrl+M" },
  { id: "prof", label: "CPU Profiler", icon: Cpu, action: "profiler", shortcut: "Ctrl+R" },
  { id: "set", label: "Open Settings", icon: Settings, action: "settings", shortcut: "Ctrl+," },
  { id: "theme-dark", label: "Switch to Dark Theme", icon: Settings, action: () => {}, shortcut: "Ctrl+1" },
  { id: "theme-light", label: "Switch to Light Theme", icon: Settings, action: () => {}, shortcut: "Ctrl+2" },
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, setActivePanel, setTheme } = useAppStore();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<<HTMLInputElement>(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (commandPaletteOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[selectedIndex];
        if (cmd) {
          if (typeof cmd.action === "string") {
            setActivePanel(cmd.action);
          } else if (cmd.id === "theme-dark") {
            setTheme({ mode: "dark" });
          } else if (cmd.id === "theme-light") {
            setTheme({ mode: "light" });
          }
          setCommandPaletteOpen(false);
        }
      }
    };

    if (commandPaletteOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [commandPaletteOpen, filtered, selectedIndex]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border border-nexus-border/50 bg-nexus-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-nexus-border/50 px-4 py-3">
              <Search size={20} className="text-nexus-muted" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-lg text-nexus-foreground outline-none placeholder:text-nexus-muted"
              />
              <kbd className="rounded border border-nexus-border/50 bg-nexus-elevated px-2 py-1 font-mono text-xs text-nexus-muted">
                ESC
              </kbd>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {filtered.map((cmd, index) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      if (typeof cmd.action === "string") {
                        setActivePanel(cmd.action);
                      }
                      setCommandPaletteOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      index === selectedIndex
                        ? "bg-nexus-primary/10 text-nexus-primary"
                        : "text-nexus-muted hover:bg-nexus-elevated hover:text-nexus-foreground"
                    )}
                  >
                    <Icon size={18} />
                    <span className="flex-1 font-medium">{cmd.label}</span>
                    <kbd className="rounded border border-nexus-border/50 bg-nexus-surface px-2 py-0.5 font-mono text-xs">
                      {cmd.shortcut}
                    </kbd>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="py-8 text-center text-nexus-muted">No commands found</div>
              )}
            </div>
            <div className="border-t border-nexus-border/50 px-4 py-2 text-xs text-nexus-muted">
              <span className="mr-4">↑↓ Navigate</span>
              <span className="mr-4">↵ Select</span>
              <span>ESC Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}