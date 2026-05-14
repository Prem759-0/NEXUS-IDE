"use client";

import { useAppStore } from "@/store/useAppStore";
import { Search, Bell, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";

export function Header() {
  const { setCommandPaletteOpen, notifications } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="flex h-14 items-center justify-between border-b border-nexus-border/50 bg-nexus-surface/95 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-nexus-muted">
          <span className="font-mono text-nexus-primary">nexus@dev</span>
          <span>:</span>
          <span className="font-mono text-nexus-secondary">~</span>
          <span>$</span>
          <motion.span
            className="inline-block h-4 w-2 bg-nexus-primary"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-nexus-border/50 bg-nexus-elevated/50 px-3 py-1.5 text-sm text-nexus-muted transition-colors hover:border-nexus-primary/30 hover:text-nexus-foreground"
        >
          <Search size={14} />
          <span>Search...</span>
          <kbd className="ml-2 rounded border border-nexus-border/50 bg-nexus-surface px-1.5 py-0.5 font-mono text-xs">
            Ctrl K
          </kbd>
        </button>

        <button className="relative rounded-lg p-2 text-nexus-muted transition-colors hover:bg-nexus-elevated hover:text-nexus-foreground">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-nexus-error text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 border-l border-nexus-border/50 pl-4">
          <div className="text-right">
            <div className="text-sm font-medium">{formatDate(new Date())}</div>
            <div className="text-xs text-nexus-muted">UTC+0</div>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-nexus-primary to-nexus-secondary" />
        </div>
      </div>
    </header>
  );
}