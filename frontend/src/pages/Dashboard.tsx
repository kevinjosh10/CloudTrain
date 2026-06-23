import { ProjectCard } from "../components/ProjectCard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your machine learning models and infrastructure.</p>
        </div>
        <Link
          to="/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Create Project
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
