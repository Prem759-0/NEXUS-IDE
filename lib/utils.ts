import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function generateRandomMetrics(length: number = 20): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function syntaxHighlight(code: string, language: string): string {
  const keywords: Record<string, string[]> = {
    cpp: ["include", "using", "namespace", "class", "struct", "public", "private", "return", "if", "else", "for", "while", "auto", "void", "int", "size_t", "const", "explicit", "virtual", "override", "new", "delete", "template", "typename"],
    python: ["import", "from", "def", "class", "return", "if", "else", "elif", "for", "while", "in", "as", "with", "try", "except", "finally", "raise", "yield", "lambda", "pass", "None", "True", "False", "and", "or", "not", "is", "self", "async", "await"],
    typescript: ["import", "from", "export", "const", "let", "var", "function", "class", "interface", "type", "extends", "implements", "return", "if", "else", "for", "while", "switch", "case", "default", "try", "catch", "finally", "throw", "new", "this", "async", "await", "undefined", "null"],
  };

  let highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const words = keywords[language] || [];
  words.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "g");
    highlighted = highlighted.replace(regex, `<span class="text-nexus-purple font-semibold">${word}</span>`);
  });

  highlighted = highlighted
    .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-nexus-success">$1</span>')
    .replace(/(\/\/.*$|#.*$)/gm, '<span class="text-nexus-muted italic">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-nexus-warning">$1</span>');

  return highlighted;
}