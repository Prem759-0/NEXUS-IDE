export interface FileNode {
  id: string;
  name: string;
  type: "file" | "directory";
  language?: string;
  content?: string;
  size?: string;
  modified?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

export interface TerminalCommand {
  id: string;
  input: string;
  output: string[];
  timestamp: Date;
  type: "success" | "error" | "info" | "warning";
}

export interface ProcessInfo {
  id: string;
  name: string;
  pid: number;
  cpu: number;
  memory: number;
  status: "running" | "sleeping" | "zombie";
  user: string;
  time: string;
}

export interface MemoryBlock {
  address: string;
  size: number;
  type: "heap" | "stack" | "static";
  status: "allocated" | "free" | "leaked";
  value?: string;
}

export interface AlgorithmStep {
  id: number;
  description: string;
  array?: number[];
  highlights?: number[];
  comparisons?: number;
  swaps?: number;
  complexity: string;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: "debug" | "info" | "warn" | "error" | "fatal";
  source: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface BuildStep {
  id: number;
  name: string;
  status: "pending" | "running" | "success" | "failed";
  duration: number;
  output: string[];
}

export interface KeyboardShortcut {
  key: string;
  modifiers: string[];
  action: string;
  category: string;
}

export interface ThemeSettings {
  mode: "dark" | "light" | "high-contrast";
  accentColor: "cyan" | "purple" | "green" | "orange";
  fontSize: "sm" | "base" | "lg";
  animations: boolean;
  glassEffects: boolean;
}

export interface SystemMetrics {
  cpu: number[];
  memory: number;
  disk: number;
  network: { up: number; down: number };
  temperature: number;
  processes: number;
  uptime: string;
}