import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeSettings, TerminalCommand, FileNode } from "@/types";

interface AppState {
  // Theme
  theme: ThemeSettings;
  setTheme: (theme: Partial<<ThemeSettings>) => void;

  // Terminal
  commands: TerminalCommand[];
  addCommand: (cmd: TerminalCommand) => void;
  clearCommands: () => void;

  // Files
  activeFile: string | null;
  openFiles: string[];
  setActiveFile: (id: string | null) => void;
  openFile: (id: string) => void;
  closeFile: (id: string) => void;

  // UI
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  activePanel: string;
  setActivePanel: (panel: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Notifications
  notifications: Array<{ id: string; title: string; message: string; type: string; read: boolean }>;
  addNotification: (notification: Omit<<AppState["notifications"][0], "id" | "read">) => void;
  markNotificationRead: (id: string) => void;
}

export const useAppStore = create<<AppState>()(
  persist(
    (set, get) => ({
      theme: {
        mode: "dark",
        accentColor: "cyan",
        fontSize: "base",
        animations: true,
        glassEffects: true,
      },
      setTheme: (partial) =>
        set((state) => ({ theme: { ...state.theme, ...partial } })),

      commands: [],
      addCommand: (cmd) =>
        set((state) => ({ commands: [...state.commands, cmd] })),
      clearCommands: () => set({ commands: [] }),

      activeFile: null,
      openFiles: [],
      setActiveFile: (id) => set({ activeFile: id }),
      openFile: (id) =>
        set((state) => ({
          openFiles: state.openFiles.includes(id)
            ? state.openFiles
            : [...state.openFiles, id],
          activeFile: id,
        })),
      closeFile: (id) =>
        set((state) => ({
          openFiles: state.openFiles.filter((f) => f !== id),
          activeFile: state.activeFile === id ? null : state.activeFile,
        })),

      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      activePanel: "dashboard",
      setActivePanel: (panel) => set({ activePanel: panel }),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id: crypto.randomUUID(), read: false },
          ],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
    }),
    { name: "nexus-store" }
  )
);