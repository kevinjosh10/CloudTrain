import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import { SplashScreen } from "./components/SplashScreen";

import { Dashboard } from "./pages/Dashboard";
import { ArchitectureExplorer } from "./pages/ArchitectureExplorer";
import { DatasetUpload } from "./pages/DatasetUpload";
import { ProjectDetails } from "./pages/ProjectDetails";

const Projects = () => <div className="text-2xl font-bold">Projects List</div>;
const Registry = () => <div className="text-2xl font-bold">Model Registry</div>;
const Runs = () => <div className="text-2xl font-bold">Training Runs</div>;
const Settings = () => <div className="text-2xl font-bold">Platform Settings</div>;

const queryClient = new QueryClient();

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("hasPlayedSplash");
  });

  if (showSplash) {
    return <SplashScreen onComplete={() => {
      sessionStorage.setItem("hasPlayedSplash", "true");
      setShowSplash(false);
    }} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/CloudTrain">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="registry" element={<Registry />} />
            <Route path="runs" element={<Runs />} />
            <Route path="upload" element={<DatasetUpload />} />
            <Route path="architecture" element={<ArchitectureExplorer />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<div className="text-destructive">404 - Page not found</div>} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
