import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Database, Activity, GitCommit, FileUp, Settings, Network } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Database },
  { name: "Model Registry", href: "/registry", icon: GitCommit },
  { name: "Training Runs", href: "/runs", icon: Activity },
  { name: "Dataset Upload", href: "/upload", icon: FileUp },
  { name: "Architecture", href: "/architecture", icon: Network },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card px-3 py-4 sticky top-0">
      <div className="mb-8 px-4 mt-2">
        <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Activity className="h-6 w-6" />
          CloudTrain
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Serverless MLOps Platform</p>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            CA
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">Cloud Architect</p>
            <p className="text-xs text-muted-foreground">Platform Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
