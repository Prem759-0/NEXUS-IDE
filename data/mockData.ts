import type { FileNode, ProcessInfo, LogEntry, BuildStep, AlgorithmStep, MemoryBlock } from "@/types";

export const fileTree: FileNode[] = [
  {
    id: "root",
    name: "nexus-project",
    type: "directory",
    isOpen: true,
    children: [
      {
        id: "src",
        name: "src",
        type: "directory",
        isOpen: true,
        children: [
          {
            id: "main.cpp",
            name: "main.cpp",
            type: "file",
            language: "cpp",
            size: "4.2 KB",
            modified: "2 mins ago",
            content: `#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <memory>\n\n// Advanced C++ Memory Management Demo\nclass MemoryPool {\n    struct Block {\n        size_t size;\n        bool used;\n        void* ptr;\n    };\n    \n    std::vector<Block> blocks;\n    void* pool;\n    \npublic:\n    explicit MemoryPool(size_t totalSize) {\n        pool = malloc(totalSize);\n        blocks.reserve(1024);\n    }\n    \n    void* allocate(size_t size) {\n        for (auto& block : blocks) {\n            if (!block.used && block.size >= size) {\n                block.used = true;\n                return block.ptr;\n            }\n        }\n        // New allocation\n        Block b{size, true, (char*)pool + blocks.size() * 64};\n        blocks.push_back(b);\n        return b.ptr;\n    }\n    \n    void deallocate(void* ptr) {\n        for (auto& block : blocks) {\n            if (block.ptr == ptr) {\n                block.used = false;\n                break;\n            }\n        }\n    }\n    \n    ~MemoryPool() { free(pool); }\n};\n\nint main() {\n    auto pool = std::make_unique<<MemoryPool>(1024 * 1024);\n    \n    auto data = pool->allocate(256);\n    std::cout << "Allocated 256 bytes at " << data << std::endl;\n    \n    pool->deallocate(data);\n    std::cout << "Memory deallocated successfully" << std::endl;\n    \n    return 0;\n}`,
          },
          {
            id: "algorithm.py",
            name: "algorithm.py",
            type: "file",
            language: "python",
            size: "3.8 KB",
            modified: "5 mins ago",
            content: `import numpy as np\nfrom typing import List, Tuple\nimport heapq\nfrom dataclasses import dataclass\n\n@dataclass\nclass Node:\n    value: int\n    priority: float\n    \nclass OptimizedSorter:\n    def __init__(self, data: List[int]):\n        self.data = np.array(data, dtype=np.int32)\n        self.comparisons = 0\n        self.swaps = 0\n    \n    def quicksort(self, arr=None, low=0, high=None) -> np.ndarray:\n        if arr is None:\n            arr = self.data.copy()\n            high = len(arr) - 1\n        \n        if low < high:\n            pi = self._partition(arr, low, high)\n            self.quicksort(arr, low, pi - 1)\n            self.quicksort(arr, pi + 1, high)\n        \n        return arr\n    \n    def _partition(self, arr, low, high):\n        pivot = arr[high]\n        i = low - 1\n        \n        for j in range(low, high):\n            self.comparisons += 1\n            if arr[j] < pivot:\n                i += 1\n                arr[i], arr[j] = arr[j], arr[i]\n                self.swaps += 1\n        \n        arr[i + 1], arr[high] = arr[high], arr[i + 1]\n        self.swaps += 1\n        return i + 1\n    \n    def heapsort(self) -> np.ndarray:\n        arr = self.data.copy().tolist()\n        heapq.heapify(arr)\n        return np.array([heapq.heappop(arr) for _ in range(len(arr))])\n    \n    @property\n    def stats(self) -> dict:\n        return {\n            'comparisons': self.comparisons,\n            'swaps': self.swaps,\n            'complexity': 'O(n log n) avg'\n        }\n\n# Data Pipeline\nclass DataPipeline:\n    def __init__(self):\n        self.stages = []\n    \n    def add_stage(self, transform):\n        self.stages.append(transform)\n        return self\n    \n    def process(self, data: np.ndarray) -> np.ndarray:\n        for stage in self.stages:\n            data = stage(data)\n        return data\n\nif __name__ == "__main__":\n    data = np.random.randint(0, 1000, 1000)\n    sorter = OptimizedSorter(data.tolist())\n    \n    result = sorter.quicksort()\n    print(f"Sorted {len(result)} elements")\n    print(f"Stats: {sorter.stats}")`,
          },
          {
            id: "config.json",
            name: "config.json",
            type: "file",
            language: "json",
            size: "1.2 KB",
            modified: "1 hour ago",
            content: `{\n  "project": {\n    "name": "nexus-core",\n    "version": "2.1.0",\n    "environment": "production"\n  },\n  "compiler": {\n    "cxx": "clang++-17",\n    "std": "c++20",\n    "optimizations": ["O3", "march=native", "flto"],\n    "warnings": ["Wall", "Wextra", "Wpedantic"]\n  },\n  "python": {\n    "interpreter": "python3.12",\n    "packages": ["numpy", "pandas", "scikit-learn", "torch"],\n    "venv": ".venv"\n  },\n  "build": {\n    "parallel_jobs": 16,\n    "cache": true,\n    "incremental": true\n  }\n}`,
          },
          {
            id: "utils",
            name: "utils",
            type: "directory",
            isOpen: false,
            children: [
              {
                id: "helpers.ts",
                name: "helpers.ts",
                type: "file",
                language: "typescript",
                size: "2.1 KB",
                modified: "3 hours ago",
                content: `export const formatBytes = (bytes: number): string => {\n  if (bytes === 0) return '0 B';\n  const k = 1024;\n  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];\n  const i = Math.floor(Math.log(bytes) / Math.log(k));\n  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];\n};\n\nexport const debounce = <T extends (...args: unknown[]) => unknown>(\n  fn: T,\n  delay: number\n): ((...args: Parameters<T>) => void) => {\n  let timeoutId: ReturnType<<typeof setTimeout>;\n  return (...args: Parameters<T>) => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn(...args), delay);\n  };\n};`,
              },
            ],
          },
        ],
      },
      {
        id: "tests",
        name: "tests",
        type: "directory",
        isOpen: false,
        children: [
          {
            id: "test_main.cpp",
            name: "test_main.cpp",
            type: "file",
            language: "cpp",
            size: "3.5 KB",
            modified: "1 day ago",
          },
          {
            id: "benchmark.py",
            name: "benchmark.py",
            type: "file",
            language: "python",
            size: "2.8 KB",
            modified: "2 days ago",
          },
        ],
      },
      {
        id: "CMakeLists.txt",
        name: "CMakeLists.txt",
        type: "file",
        language: "cmake",
        size: "1.8 KB",
        modified: "2 days ago",
        content: `cmake_minimum_required(VERSION 3.25)\nproject(nexus-core VERSION 2.1.0 LANGUAGES CXX)\n\nset(CMAKE_CXX_STANDARD 20)\nset(CMAKE_CXX_STANDARD_REQUIRED ON)\nset(CMAKE_CXX_EXTENSIONS OFF)\n\n# Compiler optimizations\nif(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")\n    add_compile_options(-O3 -march=native -flto)\n    add_compile_options(-Wall -Wextra -Wpedantic)\nendif()\n\nfind_package(Python3 3.12 REQUIRED COMPONENTS Development)\n\nadd_executable(nexus-core\n    src/main.cpp\n)\n\ntarget_link_libraries(nexus-core\n    Python3::Python\n)\n\nenable_testing()\nadd_subdirectory(tests)`,
      },
      {
        id: "README.md",
        name: "README.md",
        type: "file",
        language: "markdown",
        size: "5.6 KB",
        modified: "3 days ago",
      },
    ],
  },
];

export const processes: ProcessInfo[] = [
  { id: "p1", name: "nexus-daemon", pid: 18432, cpu: 12.4, memory: 256, status: "running", user: "root", time: "2:34:12" },
  { id: "p2", name: "clang++", pid: 18456, cpu: 89.2, memory: 1024, status: "running", user: "dev", time: "0:00:45" },
  { id: "p3", name: "python3.12", pid: 18478, cpu: 34.7, memory: 512, status: "running", user: "dev", time: "0:12:30" },
  { id: "p4", name: "node", pid: 18501, cpu: 8.1, memory: 128, status: "sleeping", user: "dev", time: "1:45:22" },
  { id: "p5", name: "postgres", pid: 18523, cpu: 2.3, memory: 64, status: "running", user: "postgres", time: "5:00:00" },
  { id: "p6", name: "redis-server", pid: 18545, cpu: 1.8, memory: 32, status: "running", user: "redis", time: "5:00:00" },
  { id: "p7", name: "dockerd", pid: 18567, cpu: 5.6, memory: 384, status: "running", user: "root", time: "3:22:15" },
  { id: "p8", name: "nginx", pid: 18589, cpu: 0.4, memory: 16, status: "sleeping", user: "www", time: "5:00:00" },
];

export const logs: LogEntry[] = [
  { id: "l1", timestamp: new Date(Date.now() - 1000 * 30), level: "info", source: "nexus-core", message: "Build pipeline initialized successfully" },
  { id: "l2", timestamp: new Date(Date.now() - 1000 * 120), level: "debug", source: "memory-allocator", message: "Allocated 1024MB memory pool at 0x7f8a2c000000" },
  { id: "l3", timestamp: new Date(Date.now() - 1000 * 180), level: "info", source: "compiler", message: "Compilation started: main.cpp with -O3 -march=native" },
  { id: "l4", timestamp: new Date(Date.now() - 1000 * 240), level: "warn", source: "python-runtime", message: "Deprecation warning: numpy.ndarray.tostring() is deprecated" },
  { id: "l5", timestamp: new Date(Date.now() - 1000 * 300), level: "error", source: "linker", message: "Undefined symbol: _ZN10MemoryPool10deallocateEPv in test_main.o" },
  { id: "l6", timestamp: new Date(Date.now() - 1000 * 360), level: "info", source: "nexus-core", message: "System monitor started on port 8080" },
  { id: "l7", timestamp: new Date(Date.now() - 1000 * 420), level: "debug", source: "cache-manager", message: "Cache hit ratio: 94.2% (LRU policy active)" },
  { id: "l8", timestamp: new Date(Date.now() - 1000 * 480), level: "fatal", source: "kernel", message: "Segmentation fault at 0x00000000 (core dumped)" },
];

export const buildSteps: BuildStep[] = [
  { id: 1, name: "CMake Configuration", status: "success", duration: 2.3, output: ["-- The CXX compiler identification is Clang 17.0.0", "-- Detecting CXX compiler ABI info", "-- Configuring done", "-- Generating done"] },
  { id: 2, name: "Dependency Resolution", status: "success", duration: 5.1, output: ["[FETCH] Getting Python3 3.12.0", "[FETCH] Getting numpy 1.26.0", "[FETCH] Getting pybind11 2.11.0", "[DONE] All dependencies resolved"] },
  { id: 3, name: "Compilation (C++ Modules)", status: "running", duration: 45.2, output: ["[ 12%] Building CXX object src/main.cpp.o", "[ 25%] Building CXX object src/memory.cpp.o", "[ 38%] Building CXX object src/algorithm.cpp.o", "[ 50%] Linking CXX executable nexus-core"] },
  { id: 4, name: "Python Bytecode", status: "pending", duration: 0, output: [] },
  { id: 5, name: "Linking & Optimization", status: "pending", duration: 0, output: [] },
  { id: 6, name: "Test Execution", status: "pending", duration: 0, output: [] },
];

export const memoryBlocks: MemoryBlock[] = [
  { address: "0x7f8a2c000000", size: 1024, type: "heap", status: "allocated", value: "MemoryPool instance" },
  { address: "0x7f8a2c100000", size: 256, type: "heap", status: "allocated", value: "Block[0] data" },
  { address: "0x7f8a2c100100", size: 128, type: "heap", status: "free" },
  { address: "0x7f8a2c100180", size: 512, type: "heap", status: "allocated", value: "Block[2] metadata" },
  { address: "0x7f8a2c100380", size: 64, type: "heap", status: "leaked" },
  { address: "0x7fff5e8a2c00", size: 32, type: "stack", status: "allocated", value: "main() frame" },
  { address: "0x7fff5e8a2c20", size: 16, type: "stack", status: "allocated", value: "loop counter" },
  { address: "0x401000", size: 4096, type: "static", status: "allocated", value: ".text segment" },
  { address: "0x402000", size: 2048, type: "static", status: "allocated", value: ".data segment" },
];

export const algorithmSteps: AlgorithmStep[] = [
  { id: 1, description: "Initialize array with random integers", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [], comparisons: 0, swaps: 0, complexity: "O(n)" },
  { id: 2, description: "Select pivot (last element: 5)", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [7], comparisons: 0, swaps: 0, complexity: "O(1)" },
  { id: 3, description: "Compare 64 > 5, no swap needed", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [0, 7], comparisons: 1, swaps: 0, complexity: "O(1)" },
  { id: 4, description: "Compare 34 > 5, no swap needed", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [1, 7], comparisons: 2, swaps: 0, complexity: "O(1)" },
  { id: 5, description: "Compare 25 > 5, no swap needed", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [2, 7], comparisons: 3, swaps: 0, complexity: "O(1)" },
  { id: 6, description: "Compare 12 > 5, no swap needed", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [3, 7], comparisons: 4, swaps: 0, complexity: "O(1)" },
  { id: 7, description: "Compare 22 > 5, no swap needed", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [4, 7], comparisons: 5, swaps: 0, complexity: "O(1)" },
  { id: 8, description: "Compare 11 > 5, no swap needed", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [5, 7], comparisons: 6, swaps: 0, complexity: "O(1)" },
  { id: 9, description: "Compare 90 > 5, no swap needed", array: [64, 34, 25, 12, 22, 11, 90, 5], highlights: [6, 7], comparisons: 7, swaps: 0, complexity: "O(1)" },
  { id: 10, description: "Swap pivot to correct position", array: [5, 34, 25, 12, 22, 11, 90, 64], highlights: [0, 7], comparisons: 7, swaps: 1, complexity: "O(1)" },
];

export const keyboardShortcuts = [
  { key: "k", modifiers: ["Ctrl"], action: "Command Palette", category: "General" },
  { key: "p", modifiers: ["Ctrl", "Shift"], action: "Quick Open File", category: "General" },
  { key: "b", modifiers: ["Ctrl"], action: "Toggle Sidebar", category: "General" },
  { key: "j", modifiers: ["Ctrl"], action: "Toggle Panel", category: "General" },
  { key: "Enter", modifiers: ["Ctrl"], action: "Execute Terminal Command", category: "Terminal" },
  { key: "l", modifiers: ["Ctrl"], action: "Clear Terminal", category: "Terminal" },
  { key: "c", modifiers: ["Ctrl"], action: "Copy Selection", category: "Editor" },
  { key: "f", modifiers: ["Ctrl"], action: "Find in File", category: "Editor" },
  { key: "d", modifiers: ["Ctrl"], action: "Go to Dashboard", category: "Navigation" },
  { key: "t", modifiers: ["Ctrl"], action: "Go to Terminal", category: "Navigation" },
  { key: "a", modifiers: ["Ctrl"], action: "Go to Algorithms", category: "Navigation" },
  { key: "m", modifiers: ["Ctrl"], action: "Go to Memory", category: "Navigation" },
  { key: "1", modifiers: ["Ctrl"], action: "Theme: Dark", category: "Appearance" },
  { key: "2", modifiers: ["Ctrl"], action: "Theme: Light", category: "Appearance" },
  { key: "3", modifiers: ["Ctrl"], action: "Theme: High Contrast", category: "Appearance" },
];