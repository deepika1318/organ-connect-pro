import { motion } from "framer-motion";
import { Heart, Truck, Clock, CheckCircle, AlertTriangle, ArrowUpRight, Navigation, Siren, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Active Requests", value: "12", icon: Heart, trend: "+3 today", color: "text-primary" },
  { label: "In Transit", value: "5", icon: Truck, trend: "2 arriving soon", color: "text-warning" },
  { label: "Pending Alerts", value: "3", icon: AlertTriangle, trend: "2 Critical!", color: "text-destructive" },
  { label: "Completed Today", value: "8", icon: CheckCircle, trend: "100% success", color: "text-success" },
];

const recentTransports = [
  { id: "TR-001", organ: "Heart", detail: "Full Heart", from: "AIIMS Delhi", to: "Fortis Mumbai", status: "In Transit", eta: "2h 15m", urgent: true, driverLoc: "Bhopal, MP" },
  { id: "TR-002", organ: "Kidney", detail: "Left Kidney", from: "Apollo Chennai", to: "Max Hyderabad", status: "Delivered", eta: "Completed", urgent: false, driverLoc: "—" },
  { id: "TR-003", organ: "Liver", detail: "Right Lobe", from: "Medanta Gurgaon", to: "Narayana Bangalore", status: "Preparing", eta: "30m to pickup", urgent: true, driverLoc: "Gurgaon, HR" },
  { id: "TR-004", organ: "Blood (O+)", detail: "4 Units RBC", from: "CMC Vellore", to: "KIMS Trivandrum", status: "In Transit", eta: "45m", urgent: false, driverLoc: "Trichy, TN" },
];

const criticalAlerts = [
  { organ: "Heart", hospital: "AIIMS Delhi", time: "5 min ago" },
  { organ: "Left Kidney", hospital: "Max Hyderabad", time: "12 min ago" },
];

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Emergency Banner */}
      {criticalAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/dashboard/alerts")}
          className="rounded-xl bg-destructive/10 border-2 border-destructive/30 p-4 flex items-center gap-4 cursor-pointer hover:bg-destructive/15 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive" />
            </span>
            <Siren className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-destructive">
              🚨 {criticalAlerts.length} CRITICAL ALERTS — IMMEDIATE ACTION NEEDED
            </p>
            <p className="text-xs text-destructive/80 mt-0.5">
              {criticalAlerts.map((a) => `${a.organ} (${a.hospital})`).join(" • ")}
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-destructive" />
        </motion.div>
      )}

      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time organ transport overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-5 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="font-heading text-3xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            <div className={`text-xs mt-2 ${stat.color}`}>{stat.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Transports */}
      <div className="glass rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">Recent Transports</h2>
          <button
            onClick={() => navigate("/dashboard/transport")}
            className="text-xs text-primary hover:underline"
          >
            View All →
          </button>
        </div>
        <div className="divide-y divide-border">
          {recentTransports.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`flex items-center gap-4 p-5 hover:bg-secondary/30 transition-colors ${
                t.urgent ? "bg-destructive/5" : ""
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                t.status === "In Transit" ? "bg-warning pulse-urgent" :
                t.status === "Delivered" ? "bg-success" : "bg-primary"
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-foreground">{t.organ}</span>
                  <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{t.detail}</span>
                  <span className="text-xs text-muted-foreground">{t.id}</span>
                  {t.urgent && (
                    <span className="text-xs bg-destructive/15 text-destructive px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-destructive" />
                      </span>
                      Urgent
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {t.from} → {t.to}
                </div>
              </div>
              {/* Driver Location */}
              {t.driverLoc !== "—" && (
                <div className="hidden md:flex items-center gap-1.5 text-xs text-success bg-success/10 px-2.5 py-1 rounded-full">
                  <Navigation className="w-3 h-3" />
                  {t.driverLoc}
                </div>
              )}
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  t.status === "In Transit" ? "text-warning" :
                  t.status === "Delivered" ? "text-success" : "text-primary"
                }`}>{t.status}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3" /> {t.eta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
