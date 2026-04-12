import { useState } from "react";
import { Bell, Search, User, ChevronDown, Clock, Heart, Truck, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const notifications = [
  { id: 1, type: "critical", message: "🚨 Critical: Heart needed at AIIMS Delhi", time: "2m ago" },
  { id: 2, type: "transport", message: "TR-001 arrived at Fortis Mumbai", time: "8m ago" },
  { id: 3, type: "match", message: "New kidney match found — 96% compatibility", time: "15m ago" },
  { id: 4, type: "info", message: "Blood Bank O- stock below threshold", time: "1h ago" },
];

const TopBar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const criticalCount = notifications.filter((n) => n.type === "critical").length;

  return (
    <header className="h-16 border-b border-border bg-card/60 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Search patients, hospitals, transports…"
          className="w-full h-9 pl-10 pr-4 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Stats */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground mr-2">
          <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-primary" /> 12 Active</span>
          <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-warning" /> 5 In Transit</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-success" /> Avg 4.2m Response</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {criticalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                {criticalCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 glass rounded-xl shadow-card overflow-hidden z-50"
              >
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Notifications</span>
                  <span className="text-xs text-primary cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-3 py-3 border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer ${
                        n.type === "critical" ? "bg-destructive/5" : ""
                      }`}
                    >
                      <p className="text-sm text-foreground">{n.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <button
                    onClick={() => { navigate("/dashboard/alerts"); setShowNotif(false); }}
                    className="text-xs text-primary hover:underline"
                  >
                    View all alerts →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-foreground leading-tight">Dr. Mehta</div>
              <div className="text-xs text-muted-foreground leading-tight">Hospital Head</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="absolute right-0 top-12 w-48 glass rounded-xl shadow-card overflow-hidden z-50"
              >
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Dr. Mehta</p>
                  <p className="text-xs text-muted-foreground">mehta@aiims.edu.in</p>
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
