import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-8 max-w-7xl animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
