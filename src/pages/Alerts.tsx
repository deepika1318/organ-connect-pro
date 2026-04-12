import { motion } from "framer-motion";
import { Bell, Heart, Clock, MapPin, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: 1,
    organ: "Heart",
    bloodType: null,
    hospital: "AIIMS Delhi",
    patient: "Patient #4521",
    urgency: "critical",
    time: "5 min ago",
    message: "Urgent heart transplant needed. Patient critical, O+ blood type.",
    location: "New Delhi, India",
  },
  {
    id: 2,
    organ: "Blood",
    bloodType: "AB-",
    hospital: "Fortis Mumbai",
    patient: "Patient #3892",
    urgency: "high",
    time: "18 min ago",
    message: "AB- blood units required urgently for surgery.",
    location: "Mumbai, Maharashtra",
  },
  {
    id: 3,
    organ: "Kidney",
    bloodType: null,
    hospital: "Apollo Chennai",
    patient: "Patient #7210",
    urgency: "medium",
    time: "1 hour ago",
    message: "Kidney donor match found. Awaiting transport coordination.",
    location: "Chennai, Tamil Nadu",
  },
];

const Alerts = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-1">Incoming organ requests from the hospital network</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bell className="w-4 h-4 text-primary" />
          <span>{alerts.length} active alerts</span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`glass rounded-xl p-6 shadow-card border-l-4 ${
              alert.urgency === "critical" ? "border-l-destructive" :
              alert.urgency === "high" ? "border-l-warning" : "border-l-primary"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                    alert.urgency === "critical" ? "bg-destructive/15 text-destructive" :
                    alert.urgency === "high" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"
                  }`}>
                    {alert.urgency}
                  </span>
                  <span className="font-heading font-semibold text-foreground flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-primary" /> {alert.organ}
                    {alert.bloodType && <span className="text-destructive">({alert.bloodType})</span>}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {alert.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.hospital}, {alert.location}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {alert.patient}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="glow" size="sm">Accept & Assign</Button>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
