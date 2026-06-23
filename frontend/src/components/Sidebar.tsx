import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Database, Activity, GitCommit, FileUp, Settings, Network } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Database },
  { name: "Model Registry", href: "/registry", icon: GitCommit },
  { name: "Architecture", href: "/architecture", icon: Network },
  { name: "Training Runs", href: "/runs", icon: Activity },
  { name: "Dataset Upload", href: "/upload", icon: FileUp },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-72 flex-col glass rounded-3xl p-6 shadow-2xl shrink-0 border-white/5">
      <div className="flex items-center gap-4 px-2 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-500/20">
          <Activity className="h-7 w-7 text-black" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-white">
          Cloud<span className="text-gradient">Train</span>
        </span>
      </div>

      <nav className="mt-10 flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-300 border",
                isActive
                  ? "bg-gradient-to-r from-amber-500/10 to-orange-500/5 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)] border-amber-500/20"
                  : "border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-amber-500" : "text-zinc-500 group-hover:text-amber-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <Link
          to="/settings"
          className="group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-[15px] font-semibold text-zinc-400 transition-colors border border-transparent hover:bg-white/5 hover:text-white"
        >
          <Settings className="h-5 w-5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
          Settings
        </Link>
      </div>
    </div>
  );
}
