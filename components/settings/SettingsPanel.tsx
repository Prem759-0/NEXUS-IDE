"use client";

import { useAppStore } from "@/store/useAppStore";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion } from "framer-motion";
import { Moon, Sun, Contrast, Type, Palette, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const accentColors = [
  { id: "cyan", label: "Cyan", class: "bg-nexus-primary", hex: "#00f0ff" },
  { id: "purple", label: "Purple", class: "bg-nexus-secondary", hex: "#7000ff" },
  { id: "green", label: "Green", class: "bg-nexus-success", hex: "#00ff88" },
  { id: "orange", label: "Orange", class: "bg-nexus-warning", hex: "#ffcc00" },
];

export function SettingsPanel() {
  const { theme, setTheme } = useAppStore();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <GlassPanel className="p-6">
        <h3 className="mb-6 font-geist text-xl font-bold">Appearance</h3>

        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-nexus-muted">Theme Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "dark", label: "Dark", icon: Moon },
                { id: "light", label: "Light", icon: Sun },
                { id: "high-contrast", label: "High Contrast", icon: Contrast },
              ].map((mode) => {
                const Icon = mode.icon;
                const isActive = theme.mode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setTheme({ mode: mode.id as typeof theme.mode })}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                      isActive
                        ? "border-nexus-primary bg-nexus-primary/5"
                        : "border-nexus-border/50 bg-nexus-elevated/50 hover:border-nexus-border"
                    )}
                  >
                    <Icon size={24} className={isActive ? "text-nexus-primary" : "text-nexus-muted"} />
                    <span className={cn("text-sm font-medium", isActive && "text-nexus-primary")}>{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-nexus-muted">Accent Color</label>
            <div className="flex gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setTheme({ accentColor: color.id as typeof theme.accentColor })}
                  className={cn(
                    "group relative h-12 w-12 rounded-xl border-2 transition-all",
                    theme.accentColor === color.id
                      ? "border-white scale-110"
                      : "border-transparent hover:scale-105"
                  )}
                >
                  <div className={cn("h-full w-full rounded-lg", color.class)} />
                  {theme.accentColor === color.id && (
                    <motion.div
                      layoutId="accentIndicator"
                      className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-white"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-nexus-muted">Font Size</label>
            <div className="flex gap-2">
              {(["sm", "base", "lg"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setTheme({ fontSize: size })}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm transition-all",
                    theme.fontSize === size
                      ? "border-nexus-primary bg-nexus-primary/10 text-nexus-primary"
                      : "border-nexus-border/50 text-nexus-muted hover:border-nexus-border"
                  )}
                >
                  <Type size={16} className="mb-1 inline" /> {size === "sm" ? "Small" : size === "base" ? "Medium" : "Large"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-nexus-border/50 p-4">
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-nexus-warning" />
              <div>
                <div className="font-medium">Animations</div>
                <div className="text-xs text-nexus-muted">Enable motion and transitions</div>
              </div>
            </div>
            <button
              onClick={() => setTheme({ animations: !theme.animations })}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                theme.animations ? "bg-nexus-primary" : "bg-nexus-elevated"
              )}
            >
              <motion.div
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
                animate={{ left: theme.animations ? "22px" : "2px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-6">
        <h3 className="mb-4 font-geist text-xl font-bold">Keyboard Shortcuts</h3>
        <div className="space-y-2">
          {[
            { keys: ["Ctrl", "K"], action: "Command Palette" },
            { keys: ["Ctrl", "B"], action: "Toggle Sidebar" },
            { keys: ["Ctrl", "Shift", "P"], action: "Quick Open" },
            { keys: ["Ctrl", "D"], action: "Dashboard" },
            { keys: ["Ctrl", "T"], action: "Terminal" },
            { keys: ["Ctrl", "1"], action: "Dark Theme" },
            { keys: ["Ctrl", "2"], action: "Light Theme" },
          ].map((shortcut, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-nexus-border/30 px-4 py-2.5"
            >
              <span className="text-sm">{shortcut.action}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="rounded border border-nexus-border/50 bg-nexus-elevated px-2 py-0.5 font-mono text-xs"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
