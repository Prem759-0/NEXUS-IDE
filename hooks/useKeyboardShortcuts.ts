"use client";

import { useEffect, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";

export function useKeyboardShortcuts() {
  const { setCommandPaletteOpen, toggleSidebar, setActivePanel, setTheme } = useAppStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setActivePanel("files");
      }
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        setActivePanel("dashboard");
      }
      if (e.ctrlKey && e.key === "t") {
        e.preventDefault();
        setActivePanel("terminal");
      }
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        setActivePanel("algorithms");
      }
      if (e.ctrlKey && e.key === "m") {
        e.preventDefault();
        setActivePanel("memory");
      }
      if (e.ctrlKey && e.key === "1") {
        e.preventDefault();
        setTheme({ mode: "dark" });
      }
      if (e.ctrlKey && e.key === "2") {
        e.preventDefault();
        setTheme({ mode: "light" });
      }
      if (e.ctrlKey && e.key === "3") {
        e.preventDefault();
        setTheme({ mode: "high-contrast" });
      }
    },
    [setCommandPaletteOpen, toggleSidebar, setActivePanel, setTheme]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}