import { motion } from "framer-motion";
import { TrendingUp, Activity, Heart, Clock, BarChart3, PieChart, Users, Zap } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";

const weeklyData = [
  { day: "Mon", requests: 12, fulfilled: 10, transports: 8 },
  { day: "Tue", requests: 18, fulfilled: 15, transports: 13 },
  { day: "Wed", requests: 8, fulfilled: 8, transports: 7 },
  { day: "Thu", requests: 22, fulfilled: 19, transports: 16 },
  { day: "Fri", requests: 15, fulfilled: 14, transports: 12 },
  { day: "Sat", requests: 9, fulfilled: 7, transports: 6 },
  { day: "Sun", requests: 6, fulfilled: 5, transports: 4 },
];

const organDemand = [
  { name: "Kidney", value: 35, color: "#f59e0b" },
  { name: "Liver", value: 22, color: "#ef4444" },
  { name: "Heart", value: 15, color: "#ec4899" },
  { name: "Cornea", value: 12, color: "#3b82f6" },
  { name: "Blood", value: 10, color: "#10b981" },
  { name: "Other", value: 6, color: "#6b7280" },
];

const monthlyTransports = [
  { month: "Jan", count: 45 },
  { month: "Feb", count: 52 },
  { month: "Mar", count: 68 },
  { month: "Apr", count: 71 },
  { month: "May", count: 85 },
  { month: "Jun", count: 92 },
];

const kpis = [
  { label: "Avg Response Time", value: "4.2 min", change: "-12%", positive: true, icon: Clock },
  { label: "Success Rate", value: "99.2%", change: "+0.3%", positive: true, icon: TrendingUp },
  { label: "Active Hospitals", value: "127", change: "+8", positive: true, icon: Users },
  { label: "Organs Saved (Month)", value: "92", change: "+15%", positive: true, icon: Heart },
  { label: "Avg Transport Time", value: "3.4 hrs", change: "-8%", positive: true, icon: Zap },
  { label: "Critical Fulfillment", value: "97.8%", change: "+1.2%", positive: true, icon: Activity },
];

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Analytics & Insights</h1>
        <p className="text-muted-foreground mt-1">Network performance metrics and organ demand intelligence</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className="w-5 h-5 text-primary" />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                kpi.positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
              }`}>
                {kpi.change}
              </span>
            </div>
            <div className="font-heading text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl shadow-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">Weekly Requests vs Fulfilled</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(162, 70%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(162, 70%, 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFul" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 12%, 18%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(200, 8%, 55%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(200, 8%, 55%)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(200, 18%, 10%)",
                  border: "1px solid hsl(200, 12%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(180, 10%, 92%)",
                }}
              />
              <Area type="monotone" dataKey="requests" stroke="hsl(162, 70%, 45%)" fill="url(#colorReq)" strokeWidth={2} name="Requests" />
              <Area type="monotone" dataKey="fulfilled" stroke="hsl(38, 92%, 55%)" fill="url(#colorFul)" strokeWidth={2} name="Fulfilled" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Organ Demand Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl shadow-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">Organ Demand Distribution</h2>
          </div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={250}>
              <RechartsPie>
                <Pie
                  data={organDemand}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {organDemand.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(200, 18%, 10%)",
                    border: "1px solid hsl(200, 12%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(180, 10%, 92%)",
                  }}
                />
              </RechartsPie>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {organDemand.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Monthly Transport Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-xl shadow-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold text-foreground">Monthly Transports (2024)</h2>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyTransports}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 12%, 18%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(200, 8%, 55%)", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(200, 8%, 55%)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(200, 18%, 10%)",
                border: "1px solid hsl(200, 12%, 18%)",
                borderRadius: "8px",
                color: "hsl(180, 10%, 92%)",
              }}
            />
            <Bar dataKey="count" fill="hsl(162, 70%, 45%)" radius={[6, 6, 0, 0]} name="Transports" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Analytics;
