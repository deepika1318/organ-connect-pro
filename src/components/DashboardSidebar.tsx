import { NavLink, useLocation } from "react-router-dom";
import { Heart, LayoutDashboard, Send, Bell, Truck, Droplets, LogOut, BarChart3, Users, Building2, Clock, HeartHandshake } from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/request", icon: Send, label: "Request Organ" },
  { to: "/dashboard/donor", icon: HeartHandshake, label: "Donor Registration" },
  { to: "/dashboard/alerts", icon: Bell, label: "Alerts", badge: 3 },
  { to: "/dashboard/transport", icon: Truck, label: "Transport" },
  { to: "/dashboard/matches", icon: Users, label: "Match Log" },
  { to: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard/organs", icon: Heart, label: "Organ Types" },
  { to: "/dashboard/blood", icon: Droplets, label: "Blood Bank" },
  { to: "/dashboard/hospitals", icon: Building2, label: "Hospitals" },
  { to: "/dashboard/timeline", icon: Clock, label: "Activity" },
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

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.to === "/dashboard"
            ? location.pathname === "/dashboard"
            : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
              {item.badge && (
                <span className="ml-auto w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">{item.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          Sign Out
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
