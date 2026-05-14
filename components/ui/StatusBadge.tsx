import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusColors: Record<string, string> = {
  running: "bg-nexus-success/10 text-nexus-success border-nexus-success/20",
  sleeping: "bg-nexus-warning/10 text-nexus-warning border-nexus-warning/20",
  zombie: "bg-nexus-error/10 text-nexus-error border-nexus-error/20",
  success: "bg-nexus-success/10 text-nexus-success border-nexus-success/20",
  failed: "bg-nexus-error/10 text-nexus-error border-nexus-error/20",
  pending: "bg-nexus-muted/10 text-nexus-muted border-nexus-muted/20",
  allocated: "bg-nexus-success/10 text-nexus-success border-nexus-success/20",
  free: "bg-nexus-primary/10 text-nexus-primary border-nexus-primary/20",
  leaked: "bg-nexus-error/10 text-nexus-error border-nexus-error/20",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium uppercase tracking-wider",
      statusColors[status] || statusColors.pending,
      className
    )}>
      {status}
    </span>
  );
}