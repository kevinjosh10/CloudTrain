import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: The Ignition (Icon scales in)
    const t1 = setTimeout(() => setStage(1), 500);
    // Stage 2: The Reveal (Text slides in)
    const t2 = setTimeout(() => setStage(2), 1600);
    // Stage 3: The Transition (Fade everything out)
    const t3 = setTimeout(() => {
      setStage(3);
      // Wait for fade out animation to finish before calling onComplete
      setTimeout(onComplete, 800); 
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 3 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Background glowing nebulas fading in during Stage 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div className="absolute w-[60%] h-[60%] rounded-full bg-amber-600/15 blur-[120px] mix-blend-screen" />
        <div className="absolute w-[40%] h-[40%] rounded-full bg-orange-600/15 blur-[100px] mix-blend-screen translate-x-1/4 -translate-y-1/4" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* The Spark / Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ 
            scale: stage >= 1 ? 1 : 0, 
            opacity: stage >= 1 ? 1 : 0,
            rotate: stage >= 1 ? 0 : -180
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-[0_0_100px_rgba(245,158,11,0.6)] mb-8"
        >
          <Activity className="h-12 w-12 text-black" />
        </motion.div>

        {/* The Text Reveal */}
        <div className="overflow-hidden flex flex-col items-center">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ 
              y: stage >= 2 ? 0 : "100%", 
              opacity: stage >= 2 ? 1 : 0 
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="text-7xl md:text-8xl font-black tracking-tighter text-white flex items-center"
          >
            Cloud<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 ml-1">Train</span>
          </motion.div>
        </div>
        
        {/* Subtitle */}
        <div className="overflow-hidden mt-6">
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ 
              y: stage >= 2 ? 0 : "-100%", 
              opacity: stage >= 2 ? 1 : 0 
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="text-zinc-400 text-xl md:text-2xl font-bold tracking-[0.2em] uppercase"
          >
            Serverless MLOps
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
