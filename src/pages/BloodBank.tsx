import { motion } from "framer-motion";
import { Droplets, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const bloodTypes = [
  { type: "A+", units: 45, demand: "High", trend: "up", compatible: ["A+", "AB+"], color: "from-red-500/30" },
  { type: "A-", units: 12, demand: "Critical", trend: "down", compatible: ["A+", "A-", "AB+", "AB-"], color: "from-red-700/30" },
  { type: "B+", units: 38, demand: "Medium", trend: "up", compatible: ["B+", "AB+"], color: "from-blue-500/30" },
  { type: "B-", units: 8, demand: "Critical", trend: "down", compatible: ["B+", "B-", "AB+", "AB-"], color: "from-blue-700/30" },
  { type: "AB+", units: 22, demand: "Low", trend: "up", compatible: ["AB+"], color: "from-purple-500/30" },
  { type: "AB-", units: 5, demand: "Critical", trend: "down", compatible: ["AB+", "AB-"], color: "from-purple-700/30" },
  { type: "O+", units: 60, demand: "High", trend: "up", compatible: ["A+", "B+", "AB+", "O+"], color: "from-green-500/30" },
  { type: "O-", units: 15, demand: "Critical", trend: "down", compatible: ["All Types"], color: "from-green-700/30" },
];

const BloodBank = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Blood Bank</h1>
        <p className="text-muted-foreground mt-1">Network-wide blood inventory and compatibility chart</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Units", value: bloodTypes.reduce((a, b) => a + b.units, 0).toString(), color: "text-primary" },
          { label: "Critical Types", value: bloodTypes.filter(b => b.demand === "Critical").length.toString(), color: "text-destructive" },
          { label: "Universal Donor (O-)", value: "15 units", color: "text-warning" },
          { label: "Most Available", value: "O+ (60)", color: "text-success" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4 shadow-card text-center"
          >
            <div className={`font-heading text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Blood Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bloodTypes.map((blood, i) => (
          <motion.div
            key={blood.type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={`glass rounded-xl p-5 shadow-card bg-gradient-to-br ${blood.color} to-transparent hover:scale-105 transition-transform`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-destructive" />
                <span className="font-heading text-2xl font-bold text-foreground">{blood.type}</span>
              </div>
              {blood.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
            </div>

            <div className="text-3xl font-heading font-bold text-foreground">{blood.units}</div>
            <div className="text-xs text-muted-foreground">units available</div>

            <div className="mt-3 flex items-center gap-1.5">
              {blood.demand === "Critical" && <AlertTriangle className="w-3 h-3 text-destructive" />}
              <span className={`text-xs font-medium ${
                blood.demand === "Critical" ? "text-destructive" :
                blood.demand === "High" ? "text-warning" :
                blood.demand === "Medium" ? "text-primary" : "text-success"
              }`}>
                {blood.demand} demand
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Compatible with:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {blood.compatible.map((c) => (
                  <span key={c} className="text-xs bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BloodBank;
