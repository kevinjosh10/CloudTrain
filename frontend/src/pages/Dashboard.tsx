import { ProjectCard } from "../components/ProjectCard";
import { Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MOCK_PROJECTS = [
  {
    id: "customer-churn",
    name: "Customer Churn Predictor",
    description: "Predicts which telecom customers are likely to cancel their subscription next month.",
    version: "v4",
    accuracy: 0.92,
    status: "success" as const,
  },
  {
    id: "house-prices",
    name: "House Price Estimator",
    description: "Estimates housing prices based on location, square footage, and property age using regression.",
    version: "v2",
    accuracy: 0.85,
    status: "training" as const,
  },
  {
    id: "loan-approval",
    name: "Loan Approval Engine",
    description: "Determines risk level and approval odds for new personal loan applications.",
    version: "v7",
    accuracy: 0.96,
    status: "success" as const,
  }
];

export function Dashboard() {
  return (
    <div className="space-y-12 relative max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-8 border-b border-white/5">
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-4 h-4" />
            Active Environment
          </motion.div>
          <h1 className="text-5xl font-black tracking-tight text-white mb-2">Platform <span className="text-gradient">Dashboard</span></h1>
          <p className="text-zinc-400 text-lg font-medium">Overview of your machine learning models and infrastructure.</p>
        </div>
        <Link
          to="/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-[15px] font-extrabold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Create Project
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_PROJECTS.map((project, idx) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
