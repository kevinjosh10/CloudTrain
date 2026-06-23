import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout";

// Temporary page placeholders until we build them out
const Dashboard = () => <div className="text-2xl font-bold">Platform Dashboard</div>;
const Projects = () => <div className="text-2xl font-bold">Projects List</div>;
const Registry = () => <div className="text-2xl font-bold">Model Registry</div>;
const Runs = () => <div className="text-2xl font-bold">Training Runs</div>;
const Upload = () => <div className="text-2xl font-bold">Dataset Upload</div>;
const Architecture = () => <div className="text-2xl font-bold">Architecture Explorer</div>;
const Settings = () => <div className="text-2xl font-bold">Platform Settings</div>;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="registry" element={<Registry />} />
            <Route path="runs" element={<Runs />} />
            <Route path="upload" element={<Upload />} />
            <Route path="architecture" element={<Architecture />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<div className="text-destructive">404 - Page not found</div>} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
