import { motion } from "framer-motion";
import { Heart, Truck, Clock, CheckCircle, AlertTriangle, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Active Requests", value: "12", icon: Heart, trend: "+3 today", color: "text-primary" },
  { label: "In Transit", value: "5", icon: Truck, trend: "2 arriving soon", color: "text-warning" },
  { label: "Pending Alerts", value: "3", icon: AlertTriangle, trend: "Urgent", color: "text-destructive" },
  { label: "Completed Today", value: "8", icon: CheckCircle, trend: "100% success", color: "text-success" },
];

const recentTransports = [
  { id: "TR-001", organ: "Heart", from: "AIIMS Delhi", to: "Fortis Mumbai", status: "In Transit", eta: "2h 15m", urgent: true },
  { id: "TR-002", organ: "Kidney", from: "Apollo Chennai", to: "Max Hyderabad", status: "Delivered", eta: "Completed", urgent: false },
  { id: "TR-003", organ: "Liver", from: "Medanta Gurgaon", to: "Narayana Bangalore", status: "Preparing", eta: "30m to pickup", urgent: true },
  { id: "TR-004", organ: "Blood (O+)", from: "CMC Vellore", to: "KIMS Trivandrum", status: "In Transit", eta: "45m", urgent: false },
];

const DashboardHome = () => {
  return (
    <div className="space-y-8">
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
        <div className="p-5 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-foreground">Recent Transports</h2>
        </div>
        <div className="divide-y divide-border">
          {recentTransports.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 p-5 hover:bg-secondary/30 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                t.status === "In Transit" ? "bg-warning pulse-urgent" :
                t.status === "Delivered" ? "bg-success" : "bg-primary"
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-foreground">{t.organ}</span>
                  <span className="text-xs text-muted-foreground">{t.id}</span>
                  {t.urgent && (
                    <span className="text-xs bg-destructive/15 text-destructive px-2 py-0.5 rounded-full font-medium">Urgent</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {t.from} → {t.to}
                </div>
              </div>
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
