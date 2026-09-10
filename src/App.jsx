import { Routes, Route, Navigate } from "react-router-dom";
import Shell from "./components/layout/Shell";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ClientDirectory from "./pages/client/ClientDirectory";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProjectsPage from "./pages/projects/ProjectsPage";
import AssetsDrive from "./pages/assets/AssetsDrive";
import Notifications from "./pages/notifications/Notifications";
import ProposalBuilder from "./components/proposals/ProposalBuilder";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Shell />}>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/admin/clients" element={<ClientDirectory />} />
        <Route path="/projects/:id" element={<ProjectsPage />} />
        <Route path="/assets" element={<AssetsDrive />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/proposals" element={<ProposalBuilder />} />
      </Route>
    </Routes>
  );
}
