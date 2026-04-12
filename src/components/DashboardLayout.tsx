import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import TopBar from "./TopBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
