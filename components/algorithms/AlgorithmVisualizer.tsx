"use client";

import { useState, useEffect, useCallback } from "react";
import { algorithmSteps } from "@/data/mockData";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function AlgorithmVisualizer() {
  const [currentStep, setCurrentStep] = useState<<number>(0);
  const [isPlaying, setIsPlaying] = useState<<boolean>(false);
  const [speed, setSpeed] = useState<<number>(1000);

  const step = algorithmSteps[currentStep];
  const maxBar = Math.max(...(step.array || []));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= algorithmSteps.length - 1) {
          setIsPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  return (
    <div className="space-y-4">
      <GlassPanel className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-geist text-xl font-bold">Quicksort Visualization</h3>
            <p className="text-sm text-nexus-muted">Step {currentStep + 1} of {algorithmSteps.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="rounded-lg p-2 text-nexus-muted transition-colors hover:bg-nexus-elevated hover:text-nexus-foreground"
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="rounded-lg p-2 text-nexus-muted transition-colors hover:bg-nexus-elevated hover:text-nexus-foreground disabled:opacity-30"
            >
              <SkipBack size={18} className="rotate-180" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                "rounded-lg p-2.5 transition-colors",
                isPlaying
                  ? "bg-nexus-warning/10 text-nexus-warning"
                  : "bg-nexus-success/10 text-nexus-success"
              )}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(algorithmSteps.length - 1, currentStep + 1))}
              disabled={currentStep === algorithmSteps.length - 1}
              className="rounded-lg p-2 text-nexus-muted transition-colors hover:bg-nexus-elevated hover:text-nexus-foreground disabled:opacity-30"
            >
              <SkipForward size={18} />
            </button>
            <button
              onClick={reset}
              className="rounded-lg p-2 text-nexus-muted transition-colors hover:bg-nexus-elevated hover:text-nexus-foreground"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-end justify-center gap-2 py-8" style={{ minHeight: 200 }}>
          <AnimatePresence mode="popLayout">
            {step.array?.map((value, index) => {
              const isHighlighted = step.highlights?.includes(index);
              const height = `${(value / maxBar) * 100}%`;

              return (
                <motion.div
                  key={`${currentStep}-${index}-${value}`}
                  layout
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: 1,
                    opacity: 1,
                    backgroundColor: isHighlighted ? "#00f0ff" : "#2a2a3a",
                  }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative flex w-12 items-end justify-center rounded-t-lg"
                  style={{ height }}
                >
                  <span className={cn(
                    "absolute -top-6 font-mono text-sm font-bold",
                    isHighlighted ? "text-nexus-primary" : "text-nexus-muted"
                  )}>
                    {value}
                  </span>
                  <div className="w-full rounded-t-lg bg-current opacity-80" style={{ height: "100%" }} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="rounded-lg bg-nexus-bg p-4">
          <p className="text-center font-mono text-lg text-nexus-foreground">{step.description}</p>
          <div className="mt-3 flex justify-center gap-6 text-sm text-nexus-muted">
            <span>Comparisons: <span className="text-nexus-primary font-mono">{step.comparisons}</span></span>
            <span>Swaps: <span className="text-nexus-warning font-mono">{step.swaps}</span></span>
            <span>Complexity: <span className="text-nexus-success font-mono">{step.complexity}</span></span>
          </div>
        </div>
      </GlassPanel>

      <div className="flex items-center gap-4">
        <span className="text-sm text-nexus-muted">Speed:</span>
        <input
          type="range"
          min="200"
          max="2000"
          step="200"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="flex-1 accent-nexus-primary"
        />
        <span className="font-mono text-sm text-nexus-muted">{speed}ms</span>
      </div>
    </div>
  );
}
