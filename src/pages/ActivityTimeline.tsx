import { motion } from "framer-motion";
import { Clock, Heart, Truck, CheckCircle, AlertTriangle, Users, Droplets, Bell, Zap } from "lucide-react";

const activities = [
  {
    id: 1,
    time: "2 min ago",
    type: "critical",
    icon: AlertTriangle,
    title: "Critical Alert: Heart Request",
    description: "AIIMS Delhi sent an urgent request for a full heart transplant. Patient in cardiac failure stage IV.",
    actor: "AIIMS Delhi",
  },
  {
    id: 2,
    time: "8 min ago",
    type: "transport",
    icon: Truck,
    title: "Transport TR-001 Update",
    description: "Driver Rajesh Kumar crossed Bhopal checkpoint. Current speed: 85 km/h. ETA to Mumbai: 2h 15m.",
    actor: "System GPS",
  },
  {
    id: 3,
    time: "15 min ago",
    type: "match",
    icon: Users,
    title: "New Match Found — Kidney",
    description: "94% HLA match detected: Donor B456 (CMC Vellore) → Patient Reddy (Max Hyderabad). Left kidney, B+ blood type.",
    actor: "Arogya AI Matching",
  },
  {
    id: 4,
    time: "22 min ago",
    type: "success",
    icon: CheckCircle,
    title: "Transport TR-002 Completed",
    description: "Kidney successfully delivered to Apollo Chennai. Cold ischemia: 5h 20m (within safe limit). Surgery scheduled.",
    actor: "Apollo Chennai",
  },
  {
    id: 5,
    time: "35 min ago",
    type: "alert",
    icon: Bell,
    title: "Right Lung Request — High Priority",
    description: "Narayana Bangalore requests right lung for severe COPD patient on ventilator. A+ blood type needed.",
    actor: "Narayana Bangalore",
  },
  {
    id: 6,
    time: "45 min ago",
    type: "blood",
    icon: Droplets,
    title: "Blood Stock Alert: O- Below Threshold",
    description: "O- (universal donor) inventory dropped to 15 units across the network. Auto-request sent to 12 blood banks.",
    actor: "Inventory System",
  },
  {
    id: 7,
    time: "1 hour ago",
    type: "transport",
    icon: Truck,
    title: "Transport TR-004 Dispatched",
    description: "4 units Packed RBC (O+) dispatched from CMC Vellore to KIMS Trivandrum. Driver: Amit Singh.",
    actor: "CMC Vellore",
  },
  {
    id: 8,
    time: "1.5 hours ago",
    type: "match",
    icon: Zap,
    title: "AI Compatibility Analysis Complete",
    description: "Cross-match analysis for liver transplant M-1003 passed all 6 antigen checks. Approved for transport.",
    actor: "Arogya AI Engine",
  },
  {
    id: 9,
    time: "2 hours ago",
    type: "success",
    icon: Heart,
    title: "Cornea Transplant Successful",
    description: "DSEK cornea transplant at LV Prasad Eye Institute completed successfully. Patient recovery started.",
    actor: "LV Prasad Eye Institute",
  },
];

const typeColors: Record<string, { bg: string; text: string; dot: string }> = {
  critical: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
  transport: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  match: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  success: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  alert: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  blood: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
};

const ActivityTimeline = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Activity Timeline</h1>
        <p className="text-muted-foreground mt-1">Real-time feed of all network events, alerts, and transport updates</p>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2 glass rounded-full px-4 py-2 w-fit">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
        </span>
        <span className="text-xs font-medium text-success">Live — Auto-updating</span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-1">
          {activities.map((activity, i) => {
            const colors = typeColors[activity.type] || typeColors.match;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-4 pl-0"
              >
                {/* Dot on timeline */}
                <div className="relative z-10 flex-shrink-0 w-12 flex justify-center pt-5">
                  <div className={`w-3 h-3 rounded-full ${colors.dot} ring-4 ring-background`} />
                </div>

                {/* Card */}
                <div className={`flex-1 glass rounded-xl p-4 shadow-card mb-3 hover:shadow-glow transition-all ${
                  activity.type === "critical" ? "border-l-3 border-l-destructive" : ""
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <activity.icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{activity.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{activity.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-muted-foreground">{activity.actor}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
                      <Clock className="w-3 h-3" /> {activity.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
