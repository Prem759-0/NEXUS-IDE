# NEXUS IDE — Unified Development Environment

A premium, fully functional frontend application that simulates a high-end IDE environment with terminal aesthetics, C++/Python inspired interfaces, system monitoring, algorithm visualization, and analytics dashboards.

## Features

- **Interactive Terminal** — Fully functional CLI with 15+ commands, command history, and realistic output
- **System Dashboard** — Real-time CPU, memory, disk, and network monitoring with animated charts
- **File Explorer** — Hierarchical file tree with syntax-highlighted code editor
- **Algorithm Visualizer** — Animated quicksort visualization with step-by-step controls
- **Memory Monitor** — Memory allocation map with leak detection visualization
- **Build Pipeline** — CI/CD pipeline visualization with live progress tracking
- **Command Palette** — Spotlight-style command search with keyboard navigation
- **Theme System** — Dark, light, and high-contrast modes with accent color selection
- **Keyboard Shortcuts** — Full keyboard navigation (Ctrl+K, Ctrl+B, Ctrl+D, etc.)
- **Process Manager** — Sortable process table with live CPU/memory bars
- **Settings Panel** — Comprehensive appearance and behavior customization

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (Strict)
- Tailwind CSS
- Framer Motion
- Recharts
- Zustand (State Management)
- Lucide React (Icons)

## Installation

```bash
# Clone and enter directory
cd nexus-ide

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

| Shortcut     | Action           |
| ------------ | ---------------- |
| Ctrl+K       | Command Palette  |
| Ctrl+B       | Toggle Sidebar   |
| Ctrl+Shift+P | Quick Open Files |
| Ctrl+D       | Dashboard        |
| Ctrl+T       | Terminal         |
| Ctrl+A       | Algorithms       |
| Ctrl+M       | Memory           |
| Ctrl+R       | Profiler         |
| Ctrl+1       | Dark Theme       |
| Ctrl+2       | Light Theme      |
| Ctrl+3       | High Contrast    |



app/
├── page.tsx              # Main layout with panel routing
├── layout.tsx            # Root layout with fonts & metadata
└── globals.css           # Global styles & Tailwind config

components/
├── ui/                   # Reusable UI primitives
│   ├── GlassPanel.tsx
│   └── StatusBadge.tsx
├── layout/               # App shell components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── CommandPalette.tsx
├── terminal/             # Terminal interface
│   └── Terminal.tsx
├── dashboard/            # System monitoring
│   ├── MetricsChart.tsx
│   ├── ProcessTable.tsx
│   └── BuildPipeline.tsx
├── files/                # File explorer
│   └── FileExplorer.tsx
├── editor/               # Code editor
│   └── CodeEditor.tsx
├── algorithms/           # Algorithm visualization
│   └── AlgorithmVisualizer.tsx
├── memory/               # Memory visualization
│   └── MemoryVisualizer.tsx
└── settings/             # Settings panel
    └── SettingsPanel.tsx

store/
└── useAppStore.ts        # Zustand global state

hooks/
├── useKeyboardShortcuts.ts
└── useSystemMetrics.ts

data/
└── mockData.ts           # Realistic mock datasets

types/
└── index.ts              # TypeScript definitions

lib/
└── utils.ts              # Utility functions



---

## DEPLOYMENT CHECKLIST

✅ **Next.js 15** with App Router  
✅ **TypeScript Strict** mode enabled  
✅ **Tailwind CSS** with custom design tokens  
✅ **Zustand** store with LocalStorage persistence  
✅ **Framer Motion** animations throughout  
✅ **Recharts** for data visualization  
✅ **Keyboard shortcuts** fully implemented  
✅ **Command palette** with search & navigation  
✅ **Theme switching** (dark/light/high-contrast)  
✅ **Responsive design** for all screen sizes  
✅ **No backend required** — fully client-side  
✅ **Vercel-ready** with static export config  
✅ **Zero hydration errors** — suppressHydrationWarning set  
✅ **Complete file structure** with exact imports  
✅ **Production-ready code** — no placeholders or TODOs  

---

To deploy: create a new Next.js project, replace the default files with the code above (maintaining exact file paths), run `npm install && npm run build`, and deploy the `dist` folder to Vercel. The application is fully self-contained and requires no API keys or backend services.
