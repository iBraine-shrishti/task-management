import { Routes, Route, Navigate } from "react-router-dom";
import Shell from "./components/layout/Shell";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProjectDetails from "./pages/projects/ProjectDetails";
import Assets from "./pages/assets/Assets";
import Notifications from "./pages/notifications/Notifications";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Shell />}>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}
