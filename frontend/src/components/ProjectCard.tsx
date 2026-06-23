import { Link } from "react-router-dom";
import { ArrowRight, Activity, GitCommit } from "lucide-react";
import { motion } from "framer-motion";

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
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
    training: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    idle: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative flex flex-col glass rounded-[2rem] p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:border-amber-500/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] pointer-events-none" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="pr-4">
          <h3 className="text-2xl font-extrabold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-500 transition-all">
            {name}
          </h3>
          <p className="mt-3 text-[15px] text-zinc-400 line-clamp-2 leading-relaxed font-medium">
            {description}
          </p>
        </div>
        <span className={`shrink-0 inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-bold tracking-wide ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 relative z-10">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 flex items-center gap-1.5 uppercase tracking-wider font-bold"><GitCommit className="h-3.5 w-3.5" /> Version</span>
          <span className="mt-1.5 font-semibold text-zinc-200">{version}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 flex items-center gap-1.5 uppercase tracking-wider font-bold"><Activity className="h-3.5 w-3.5" /> Latest Score</span>
          <span className="mt-1.5 font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{(accuracy * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <Link
          to={`/projects/${id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-4 text-[15px] font-bold text-white transition-all hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:border-transparent hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:text-black"
        >
          Open Project
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </motion.div>
  );
}
