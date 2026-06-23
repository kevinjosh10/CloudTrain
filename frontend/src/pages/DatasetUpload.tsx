import { useState } from "react";
import { UploadCloud, FileJson } from "lucide-react";

export function DatasetUpload() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dataset Upload</h1>
        <p className="text-muted-foreground mt-1">Upload a CSV dataset and configure its schema to trigger an automated training pipeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Zone */}
        <div 
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border bg-card/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
        >
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <UploadCloud className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Upload CSV Dataset</h3>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-[250px]">
            Drag and drop your file here, or click to select. Max size 10MB.
          </p>
          <button className="mt-6 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
            Select File
          </button>
        </div>

        {/* Schema Definition */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <FileJson className="h-5 w-5 text-primary" />
            Dataset Manifest
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Target Column</label>
              <input type="text" className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="e.g. churn" />
            </div>
            <div>
              <label className="text-sm font-medium">Model Type</label>
              <select className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground">
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Algorithm</label>
              <select className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground">
                <option value="random_forest">Random Forest</option>
                <option value="logistic_regression">Logistic Regression</option>
                <option value="decision_tree">Decision Tree</option>
              </select>
            </div>
            <button className="w-full mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Generate Manifest & Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
