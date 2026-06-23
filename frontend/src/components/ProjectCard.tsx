import { Link } from "react-router-dom";
import { ArrowRight, Activity, GitCommit } from "lucide-react";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  version: string;
  accuracy: number;
  status: "success" | "failed" | "training" | "idle";
}

export function ProjectCard({ id, name, description, version, accuracy, status }: ProjectCardProps) {
  const statusColors = {
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    failed: "bg-red-500/10 text-red-500 border-red-500/20",
    training: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    idle: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  };

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground flex items-center gap-1"><GitCommit className="h-3 w-3" /> Version</span>
          <span className="mt-1 font-medium">{version}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground flex items-center gap-1"><Activity className="h-3 w-3" /> Latest Score</span>
          <span className="mt-1 font-medium">{(accuracy * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to={`/projects/${id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Open Project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
