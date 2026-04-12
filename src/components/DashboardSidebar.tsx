import { NavLink, useLocation } from "react-router-dom";
import { Heart, LayoutDashboard, Send, Bell, Truck, Droplets, LogOut } from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/request", icon: Send, label: "Request Organ" },
  { to: "/dashboard/alerts", icon: Bell, label: "Alerts" },
  { to: "/dashboard/transport", icon: Truck, label: "Transport" },
  { to: "/dashboard/organs", icon: Heart, label: "Organ Types" },
  { to: "/dashboard/blood", icon: Droplets, label: "Blood Bank" },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-30">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-heading text-lg font-bold text-foreground">Arogya</h1>
          <span className="text-xs text-primary font-medium">AI Platform</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.label === "Alerts" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">3</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
