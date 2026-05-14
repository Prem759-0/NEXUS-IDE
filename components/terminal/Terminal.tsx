"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Trash, Copy, Download } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { TerminalCommand } from "@/types";

const WELCOME_MESSAGE = [
  "╔══════════════════════════════════════════════════════════════╗",
  "║                    NEXUS TERMINAL v2.1.0                     ║",
  "║              C++ / Python Development Environment              ║",
  "╚══════════════════════════════════════════════════════════════╝",
  "",
  "System: Linux x86_64 6.7.0-nexus-custom",
  "Compiler: Clang 17.0.0 (C++20)",
  "Python: 3.12.0 (main, Nov 15 2024)",
  "Node: 22.3.0",
  "",
  "Type 'help' for available commands",
  "",
];

const AVAILABLE_COMMANDS: Record<string, (args: string[]) => string[]> = {
  help: () => [
    "Available commands:",
    "  help         Show this help message",
    "  clear        Clear terminal screen",
    "  ls           List files in current directory",
    "  ps           List running processes",
    "  build        Start build pipeline",
    "  test         Run test suite",
    "  profile      Start CPU profiler",
    "  mem          Show memory allocation",
    "  git          Show git status",
    "  python       Execute Python snippet",
    "  cpp          Show C++ compilation info",
    "  uptime       Show system uptime",
    "  whoami       Show current user",
    "  exit         Close terminal session",
  ],
  ls: () => [
    "total 48",
    "drwxr-xr-x  4 nexus dev  4096 Jan 15 09:23 .",
    "drwxr-xr-x 12 root  root 4096 Jan 15 08:00 ..",
    "-rw-r--r--  1 nexus dev  4200 Jan 15 09:20 main.cpp",
    "-rw-r--r--  1 nexus dev  3800 Jan 15 09:15 algorithm.py",
    "-rw-r--r--  1 nexus dev  1200 Jan 15 08:45 config.json",
    "drwxr-xr-x  2 nexus dev  4096 Jan 15 08:30 src",
    "drwxr-xr-x  2 nexus dev  4096 Jan 15 08:00 tests",
    "-rw-r--r--  1 nexus dev  1800 Jan 14 16:00 CMakeLists.txt",
    "-rw-r--r--  1 nexus dev  5600 Jan 14 15:30 README.md",
  ],
  ps: () => [
    "  PID  USER      CPU%  MEM%  STAT   TIME     COMMAND",
    "18432  root      12.4  2.5   R+     2:34:12  nexus-daemon",
    "18456  dev       89.2  10.0  R+     0:00:45  clang++ -O3 main.cpp",
    "18478  dev       34.7  5.0   S+     0:12:30  python3.12 algorithm.py",
    "18501  dev        8.1  1.2   S      1:45:22  node server.js",
    "18523  postgres   2.3  0.6   S      5:00:00  postgres: writer",
    "18545  redis      1.8  0.3   S      5:00:00  redis-server",
    "18567  root       5.6  3.7   S      3:22:15  dockerd",
    "18589  www        0.4  0.1   S      5:00:00  nginx: worker",
  ],
  build: () => [
    "[1/6] CMake Configuration .................................... ✓ 2.3s",
    "[2/6] Dependency Resolution .................................. ✓ 5.1s",
    "[3/6] Compilation (C++ Modules) .............................. ● 45.2s",
    "        [ 12%] Building CXX object src/main.cpp.o",
    "        [ 25%] Building CXX object src/memory.cpp.o",
    "        [ 38%] Building CXX object src/algorithm.cpp.o",
    "        [ 50%] Linking CXX executable nexus-core",
    "[4/6] Python Bytecode ........................................ ○ Pending",
    "[5/6] Linking & Optimization ................................. ○ Pending",
    "[6/6] Test Execution ........................................... ○ Pending",
    "",
    "Build Status: IN PROGRESS",
    "Estimated completion: 1m 23s",
  ],
  test: () => [
    "Running 42 test cases...",
    "",
    "src/test_memory.cpp(45): info: check allocate(256) == ptr passed",
    "src/test_memory.cpp(67): info: check deallocate(ptr) passed",
    "src/test_algorithm.cpp(23): info: check quicksort([5,2,8,1]) == [1,2,5,8] passed",
    "src/test_algorithm.cpp(45): info: check heapsort([9,3,7,1]) == [1,3,7,9] passed",
    "",
    "Test suite summary:",
    "  Total:     42",
    "  Passed:    41",
    "  Failed:    1",
    "  Skipped:   0",
    "  Duration:  3.45s",
    "",
    "FAILED: src/test_main.cpp(89)",
    "  Assertion: pool.allocate(0) should throw",
    "",
    "1 failure detected in test suite",
  ],
  profile: () => [
    "CPU Profiler started (sampling every 10ms)",
    "Duration: 5.0 seconds",
    "",
    "Flat profile:",
    "",
    "  %   cumulative   self              self     total",
    " time   seconds   seconds    calls  ms/call  ms/call  name",
    " 32.4      1.62     1.62   100000     0.02     0.05  MemoryPool::allocate",
    " 28.1      3.03     1.41    50000     0.03     0.04  quicksort_partition",
    " 18.5      3.96     0.93   200000     0.00     0.01  std::vector::push_back",
    " 12.3      4.58     0.62   150000     0.00     0.01  Block::constructor",
    "  8.7      5.00     0.42    25000     0.02     0.02  heapify",
    "",
    "Call graph:",
    "index % time    self  children    called     name",
    "                1.62    0.00  100000/100000  main [1]",
    "  [2]   32.4    1.62    0.00  100000         MemoryPool::allocate [2]",
    "",
    "                1.41    0.00   50000/50000   quicksort [3]",
    "  [4]   28.1    1.41    0.00   50000         quicksort_partition [4]",
  ],
  mem: () => [
    "Memory Allocation Map:",
    "",
    "HEAP:",
    "  0x7f8a2c000000  [1024 B]  ALLOCATED  MemoryPool instance",
    "  0x7f8a2c100000  [ 256 B]  ALLOCATED  Block[0] data",
    "  0x7f8a2c100100  [ 128 B]  FREE       <available>",
    "  0x7f8a2c100180  [ 512 B]  ALLOCATED  Block[2] metadata",
    "  0x7f8a2c100380  [  64 B]  LEAKED     ⚠ unfreed allocation",
    "",
    "STACK:",
    "  0x7fff5e8a2c00  [  32 B]  ALLOCATED  main() frame",
    "  0x7fff5e8a2c20  [  16 B]  ALLOCATED  loop counter",
    "",
    "STATIC:",
    "  0x401000        [4096 B]  ALLOCATED  .text segment",
    "  0x402000        [2048 B]  ALLOCATED  .data segment",
    "",
    "Summary:",
    "  Total:     8,064 B",
    "  Used:      7,872 B (97.6%)",
    "  Free:        128 B ( 1.6%)",
    "  Leaked:       64 B ( 0.8%) ⚠",
  ],
  git: () => [
    "On branch main",
    "Your branch is ahead of 'origin/main' by 3 commits.",
    "",
    "Changes to be committed:",
    "  (use \"git restore --staged <file>...\" to unstage)",
    "        modified:   src/main.cpp",
    "        modified:   src/algorithm.py",
    "        new file:   tests/benchmark.py",
    "",
    "Changes not staged for commit:",
    "  (use \"git add <file>...\" to update what will be committed)",
    "        modified:   CMakeLists.txt",
    "",
    "Untracked files:",
    "  (use \"git add <file>...\" to include in what will be committed)",
    "        build/",
    "        .cache/",
    "",
    "Last 3 commits:",
    "  a3f7d2e  feat: implement memory pool allocator",
    "  8b2c1a9  refactor: optimize quicksort partition",
    "  4e5d8f1  fix: resolve Python 3.12 deprecation warnings",
  ],
  python: () => [
    "Python 3.12.0 (main, Nov 15 2024, 10:23:45) [Clang 17.0.0]",
    "Type 'help', 'copyright', 'credits' or 'license' for more info.",
    ">>> import numpy as np",
    ">>> data = np.random.randint(0, 1000, 1000)",
    ">>> sorter = OptimizedSorter(data.tolist())",
    ">>> result = sorter.quicksort()",
    ">>> print(f\"Comparisons: {sorter.comparisons}\")",
    "Comparisons: 8765",
    ">>> print(f\"Swaps: {sorter.swaps}\")",
    "Swaps: 3421",
    ">>> print(f\"Time complexity: {sorter.stats['complexity']}\")",
    "Time complexity: O(n log n) avg",
    ">>> ",
  ],
  cpp: () => [
    "clang version 17.0.0",
    "Target: x86_64-pc-linux-gnu",
    "Thread model: posix",
    "",
    "Compilation flags:",
    "  -std=c++20",
    "  -O3",
    "  -march=native",
    "  -flto",
    "  -Wall -Wextra -Wpedantic",
    "  -fmodules-ts",
    "",
    "Preprocessing main.cpp...",
    "Compiling main.cpp...",
    "In file included from src/main.cpp:1:",
    "In file included from /usr/include/c++/v1/iostream:37:",
    "/usr/include/c++/v1/ios:216:5: warning: constexpr if is a C++17 extension [-Wc++17-extensions]",
    "",
    "Linking...",
    "Generating code...",
    "Optimization report: 47 functions inlined, 12 loops vectorized",
    "",
    "Build successful: ./build/nexus-core (2.4 MB)",
  ],
  uptime: () => [
    " 09:23:45 up 5 days, 12:34,  3 users,  load average: 1.23, 0.89, 0.76",
  ],
  whoami: () => ["nexus-dev"],
  exit: () => ["Session terminated. Goodbye.", ""],
};

export function Terminal() {
  const { commands, addCommand, clearCommands } = useAppStore();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<<HTMLDivElement>(null);
  const inputRef = useRef<<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const [command, ...args] = trimmed.split(" ");
    const handler = AVAILABLE_COMMANDS[command.toLowerCase()];

    const newCmd: TerminalCommand = {
      id: crypto.randomUUID(),
      input: trimmed,
      output: handler ? handler(args) : [`Command not found: ${command}. Type 'help' for available commands.`],
      timestamp: new Date(),
      type: handler ? "success" : "error",
    };

    addCommand(newCmd);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIndex((i) => {
        const newIndex = Math.min(i + 1, history.length - 1);
        if (newIndex >= 0) setInput(history[history.length - 1 - newIndex]);
        return newIndex;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex((i) => {
        const newIndex = Math.max(i - 1, -1);
        setInput(newIndex >= 0 ? history[history.length - 1 - newIndex] : "");
        return newIndex;
      });
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-nexus-border/50 bg-nexus-bg overflow-hidden">
      <div className="flex items-center justify-between border-b border-nexus-border/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-nexus-primary" />
          <span className="font-mono text-sm font-semibold">nexus@dev: ~/nexus-project</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearCommands} className="rounded p-1.5 text-nexus-muted hover:bg-nexus-elevated hover:text-nexus-error transition-colors" title="Clear">
            <Trash size={14} />
          </button>
          <button className="rounded p-1.5 text-nexus-muted hover:bg-nexus-elevated hover:text-nexus-foreground transition-colors" title="Copy">
            <Copy size={14} />
          </button>
          <button className="rounded p-1.5 text-nexus-muted hover:bg-nexus-elevated hover:text-nexus-foreground transition-colors" title="Export">
            <Download size={14} />
          </button>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {commands.length === 0 && WELCOME_MESSAGE.map((line, i) => (
          <div key={i} className="text-nexus-muted whitespace-pre-wrap">{line}</div>
        ))}

        <AnimatePresence>
          {commands.map((cmd) => (
            <motion.div
              key={cmd.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-2 text-nexus-primary">
                <span className="text-nexus-success">➜</span>
                <span className="text-nexus-secondary">~</span>
                <span className="text-nexus-foreground">{cmd.input}</span>
              </div>
              {cmd.output.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "whitespace-pre-wrap pl-4",
                    cmd.type === "error" && "text-nexus-error",
                    cmd.type === "success" && "text-nexus-foreground",
                    line.includes("✓") && "text-nexus-success",
                    line.includes("●") && "text-nexus-warning",
                    line.includes("○") && "text-nexus-muted",
                    line.includes("⚠") && "text-nexus-warning",
                    line.includes("FAILED") && "text-nexus-error font-bold"
                  )}
                >
                  {line}
                </div>
              ))}
              <div className="text-xs text-nexus-muted pl-4">
                [{formatDate(cmd.timestamp)}]
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-center gap-2 pt-2">
          <span className="text-nexus-success">➜</span>
          <span className="text-nexus-secondary">~</span>
          <span className="text-nexus-muted">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-nexus-foreground outline-none font-mono"
            placeholder="Type a command..."
            autoFocus
          />
          <motion.span
            className="inline-block h-4 w-2 bg-nexus-primary"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
