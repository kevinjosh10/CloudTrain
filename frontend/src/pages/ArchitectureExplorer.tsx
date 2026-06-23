import { motion } from "framer-motion";
import { Database, Server, HardDrive, Cpu, GitBranch, ArrowRight } from "lucide-react";

export function ArchitectureExplorer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Architecture</h1>
        <p className="text-muted-foreground mt-1">Interactive visualization of the CloudTrain Serverless MLOps platform.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-12 relative max-w-4xl mx-auto rounded-2xl border border-border bg-card/50 p-8 backdrop-blur"
      >
        <div className="flex flex-col items-center gap-12">
          {/* Frontend Layer */}
          <motion.div variants={item} className="flex flex-col items-center w-full">
            <div className="w-64 rounded-xl border border-primary/50 bg-primary/10 p-4 text-center shadow-lg shadow-primary/5">
              <Server className="mx-auto h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-primary">React Frontend</h3>
              <p className="text-xs text-muted-foreground mt-1">GitHub Pages / Vite</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground mt-6 rotate-90" />
          </motion.div>

          {/* API Layer */}
          <motion.div variants={item} className="flex justify-center w-full gap-16">
            <div className="flex flex-col items-center">
              <div className="w-64 rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-4 text-center">
                <GitBranch className="mx-auto h-8 w-8 text-emerald-500 mb-2" />
                <h3 className="font-semibold text-emerald-500">API Gateway</h3>
                <p className="text-xs text-muted-foreground mt-1">REST API Endpoint</p>
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground mt-6 rotate-90" />
              <div className="mt-6 w-64 rounded-xl border border-blue-500/50 bg-blue-500/10 p-4 text-center">
                <Cpu className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-semibold text-blue-500">Inference Lambda</h3>
                <p className="text-xs text-muted-foreground mt-1">Python 3.12 Serverless</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-64 rounded-xl border border-orange-500/50 bg-orange-500/10 p-4 text-center">
                <HardDrive className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                <h3 className="font-semibold text-orange-500">Amazon S3</h3>
                <p className="text-xs text-muted-foreground mt-1">Datasets & Models Storage</p>
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground mt-6 rotate-90" />
              <div className="mt-6 w-64 rounded-xl border border-purple-500/50 bg-purple-500/10 p-4 text-center">
                <Cpu className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                <h3 className="font-semibold text-purple-500">Training Lambda</h3>
                <p className="text-xs text-muted-foreground mt-1">Event-Driven ML Engine</p>
              </div>
            </div>
          </motion.div>

          {/* Database Layer */}
          <motion.div variants={item} className="flex flex-col items-center w-full pt-6">
            <ArrowRight className="h-6 w-6 text-muted-foreground mb-6 rotate-90" />
            <div className="w-96 rounded-xl border border-yellow-500/50 bg-yellow-500/10 p-4 text-center">
              <Database className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
              <h3 className="font-semibold text-yellow-500">Firebase Firestore</h3>
              <p className="text-xs text-muted-foreground mt-1">Metadata, Metrics & Governance History</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
