import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function Shell() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Sidebar />
      <main className="lg:pl-[250px]">
        <Topbar />
        <div className="p-5 lg:p-7 xl:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
