import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";

export function Layout() {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#050505] text-foreground">
      {/* Animated Moving Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-600/20 blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[50%] rounded-full bg-orange-600/20 blur-[120px] animate-blob mix-blend-screen" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[40%] rounded-full bg-yellow-500/10 blur-[120px] animate-blob mix-blend-screen" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 flex w-full h-full p-6 gap-6">
        <Sidebar />
        <motion.main 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 overflow-y-auto glass rounded-3xl p-8 shadow-2xl relative"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
