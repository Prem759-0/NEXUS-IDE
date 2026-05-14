"use client";

import { useAppStore } from "@/store/useAppStore";
import { fileTree } from "@/data/mockData";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileCode } from "lucide-react";
import { cn, syntaxHighlight } from "@/lib/utils";

function findFileById(nodes: typeof fileTree, id: string): typeof fileTree[0] | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findFileById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function CodeEditor() {
  const { openFiles, activeFile, closeFile, setActiveFile } = useAppStore();

  const languageIcons: Record<string, string> = {
    cpp: "C++",
    python: "PY",
    typescript: "TS",
    json: "JSON",
    markdown: "MD",
    cmake: "CM",
  };

  return (
    <GlassPanel className="flex h-full flex-col overflow-hidden">
      {openFiles.length > 0 && (
        <div className="flex border-b border-nexus-border/50">
          {openFiles.map((fileId) => {
            const file = findFileById(fileTree, fileId);
            if (!file) return null;
            const isActive = activeFile === fileId;

            return (
              <button
                key={fileId}
                onClick={() => setActiveFile(fileId)}
                className={cn(
                  "group relative flex items-center gap-2 border-r border-nexus-border/50 px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-nexus-elevated text-nexus-foreground"
                    : "text-nexus-muted hover:bg-nexus-elevated/50 hover:text-nexus-foreground"
                )}
              >
                <span className="text-xs font-bold text-nexus-muted">{languageIcons[file.language || ""] || "??"}</span>
                <span className="max-w-[120px] truncate">{file.name}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    closeFile(fileId);
                  }}
                  className="rounded p-0.5 opacity-0 transition-opacity hover:bg-nexus-error/10 hover:text-nexus-error group-hover:opacity-100"
                >
                  <X size={12} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-nexus-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {activeFile ? (
            <motion.div
              key={activeFile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4"
            >
              {(() => {
                const file = findFileById(fileTree, activeFile);
                if (!file || !file.content) return null;

                const lines = file.content.split("\n");
                return (
                  <div className="font-mono text-sm leading-relaxed">
                    <div className="mb-2 flex items-center gap-2 text-xs text-nexus-muted">
                      <FileCode size={14} />
                      <span>{file.name}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>Modified {file.modified}</span>
                    </div>
                    <div className="relative">
                      <div className="absolute left-0 top-0 select-none text-right text-nexus-muted/50">
                        {lines.map((_, i) => (
                          <div key={i} className="px-3">{i + 1}</div>
                        ))}
                      </div>
                      <div className="pl-12">
                        {lines.map((line, i) => (
                          <div
                            key={i}
                            className="whitespace-pre"
                            dangerouslySetInnerHTML={{
                              __html: syntaxHighlight(line, file.language || "text"),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-nexus-muted">
              <FileCode size={48} className="mb-4 opacity-20" />
              <p>Select a file from the explorer to view</p>
              <p className="mt-1 text-xs">or press Ctrl+Shift+P to quick open</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}
