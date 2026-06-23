import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Activity, Database, GitCommit, Play } from "lucide-react";

export function ProjectDetails() {
  const { id } = useParams();

  // Mock data for the static UI
  const project = {
    id: id || "customer-churn",
    name: "Customer Churn Predictor",
    description: "Predicts which telecom customers are likely to cancel their subscription next month.",
    status: "success",
    algorithm: "Random Forest",
    metrics: { accuracy: 0.92, precision: 0.91, recall: 0.89, f1: 0.90 }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 rounded-full hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Database className="h-4 w-4" /> {project.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg border-b border-border pb-2 mb-4">Metadata</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-emerald-500 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Algorithm</span>
                <span>{project.algorithm}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prod Version</span>
                <span className="flex items-center gap-1"><GitCommit className="h-3 w-3"/> v4</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 border-l-4 border-l-primary shadow-sm">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" /> Test Inference API
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Send a payload to the serverless endpoint.</p>
            <textarea 
              className="w-full h-32 rounded-md border border-input bg-background p-3 text-xs font-mono shadow-inner focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              defaultValue={`{\n  "project_id": "${project.id}",\n  "features": [34, 50000, 2]\n}`}
            />
            <button className="w-full mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Send Request
            </button>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-primary" />
              Production Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="bg-secondary/50 rounded-lg p-4 text-center shadow-inner">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{key}</div>
                  <div className="text-2xl font-bold mt-1 text-foreground">{(value * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg mb-4">Training History</h3>
            <div className="space-y-4">
              {[4, 3, 2, 1].map((v) => (
                <div key={v} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors border border-transparent hover:border-border">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${v === 4 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-muted'}`} />
                    <span className="font-medium">Version {v}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {v === 4 ? 'Promoted to Prod' : 'Archived'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
