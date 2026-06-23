import { motion } from "framer-motion";
import { GitCommit, Search, ShieldCheck, Clock, Archive } from "lucide-react";

const MOCK_MODELS = [
  {
    id: "MOD-8429",
    name: "Customer Churn Predictor",
    version: "v4.2.1",
    status: "production",
    accuracy: 0.94,
    date: "2 hours ago",
    size: "45 MB"
  },
  {
    id: "MOD-8428",
    name: "Customer Churn Predictor",
    version: "v4.2.0",
    status: "archived",
    accuracy: 0.91,
    date: "5 days ago",
    size: "44 MB"
  },
  {
    id: "MOD-7192",
    name: "House Price Estimator",
    version: "v2.0.0",
    status: "staging",
    accuracy: 0.85,
    date: "1 week ago",
    size: "120 MB"
  },
  {
    id: "MOD-6551",
    name: "Loan Approval Engine",
    version: "v7.1.0",
    status: "production",
    accuracy: 0.96,
    date: "2 weeks ago",
    size: "18 MB"
  }
];

export function ModelRegistry() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'production':
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 uppercase tracking-wider"><ShieldCheck className="w-3.5 h-3.5" /> Production</span>;
      case 'staging':
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider"><Clock className="w-3.5 h-3.5" /> Staging</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-500/10 border border-zinc-500/20 px-3 py-1 text-xs font-bold text-zinc-400 uppercase tracking-wider"><Archive className="w-3.5 h-3.5" /> Archived</span>;
    }
  };

  return (
    <div className="space-y-10 relative max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/5 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Model <span className="text-gradient">Registry</span></h1>
          <p className="text-zinc-400 text-lg font-medium">Centralized hub for all your compiled machine learning artifacts.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search models..." 
            className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-medium"
          />
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-zinc-500">Model Name</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-zinc-500">Version</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-zinc-500">Status</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-zinc-500">Accuracy</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-zinc-500">Deployed</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_MODELS.map((model, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={model.id} 
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-[15px]">{model.name}</span>
                      <span className="text-xs text-zinc-500 font-medium mt-1">{model.id} • {model.size}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      <GitCommit className="w-3.5 h-3.5 text-amber-500" />
                      {model.version}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {getStatusBadge(model.status)}
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                      {(model.accuracy * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-zinc-400">
                    {model.date}
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-sm font-bold text-amber-500 hover:text-orange-400 transition-colors bg-amber-500/10 px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100">
                      View Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
