import { Routes, Route, Navigate } from "react-router-dom";
import Shell from "./components/layout/Shell";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ClientDirectory from "./pages/client/ClientDirectory";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProjectsPage from "./pages/projects/ProjectsPage";
import Assets from "./pages/assets/Assets";
import Notifications from "./pages/notifications/Notifications";
import ProposalBuilder from "./components/proposals/ProposalBuilder";
import DataVaultsWorkspace from "./pages/dataVaults/DataVaultsWorkspace";

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
        <Route path="/assets" element={<Assets />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/proposals" element={<ProposalBuilder />} />
        <Route path="/vaults" element={<DataVaultsWorkspace />} />
        <Route
          path="/admin/vaults/intake"
          element={<DataVaultsWorkspace activeVaultRoute="intake" />}
        />

        {/* Multi-Format Specific Vault Pages */}
        <Route
          path="/admin/vaults/assets/images"
          element={<DataVaultsWorkspace activeVaultRoute="images" />}
        />
        <Route
          path="/admin/vaults/assets/docs"
          element={<DataVaultsWorkspace activeVaultRoute="docs" />}
        />
        <Route
          path="/admin/vaults/assets/archives"
          element={<DataVaultsWorkspace activeVaultRoute="archives" />}
        />
        <Route
          path="/admin/vaults/assets/media-kits"
          element={<DataVaultsWorkspace activeVaultRoute="media-kits" />}
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/vaults" replace />} />
      </Route>
    </Routes>
  );
}
