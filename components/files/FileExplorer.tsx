"use client";

import { useState } from "react";
import { fileTree } from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, FileCode, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileNode } from "@/types";

function FileTreeItem({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(node.isOpen ?? false);
  const { openFile, activeFile } = useAppStore();

  const isActive = activeFile === node.id;

  if (node.type === "directory") {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors hover:bg-nexus-elevated/50",
            isActive && "bg-nexus-primary/10 text-nexus-primary"
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isOpen ? <ChevronDown size={14} className="text-nexus-muted" /> : <ChevronRight size={14} className="text-nexus-muted" />}
          {isOpen ? <FolderOpen size={16} className="text-nexus-warning" /> : <Folder size={16} className="text-nexus-warning" />}
          <span className="font-medium">{node.name}</span>
        </button>
        <AnimatePresence>
          {isOpen && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {node.children.map((child) => (
                <FileTreeItem key={child.id} node={child} depth={depth + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const languageColors: Record<string, string> = {
    cpp: "text-nexus-error",
    python: "text-nexus-warning",
    typescript: "text-nexus-primary",
    json: "text-nexus-success",
    markdown: "text-nexus-muted",
    cmake: "text-nexus-secondary",
  };

  return (
    <button
      onClick={() => openFile(node.id)}
      className={cn(
        "flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors hover:bg-nexus-elevated/50",
        isActive && "bg-nexus-primary/10 text-nexus-primary"
      )}
      style={{ paddingLeft: `${depth * 12 + 28}px` }}
    >
      <FileCode size={14} className={cn("shrink-0", languageColors[node.language || ""] || "text-nexus-muted")} />
      <span className="truncate">{node.name}</span>
      <span className="ml-auto text-xs text-nexus-muted">{node.size}</span>
    </button>
  );
}

export function FileExplorer() {
  return (
    <GlassPanel className="h-full overflow-hidden">
      <div className="border-b border-nexus-border/50 px-3 py-2">
        <h3 className="font-geist text-sm font-semibold uppercase tracking-wider text-nexus-muted">Explorer</h3>
      </div>
      <div className="p-2">
        {fileTree.map((node) => (
          <FileTreeItem key={node.id} node={node} />
        ))}
      </div>
    </GlassPanel>
  );
}
