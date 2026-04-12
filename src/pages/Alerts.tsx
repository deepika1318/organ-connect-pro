import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, Clock, MapPin, User, CheckCircle, Volume2, XCircle, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const alerts = [
  {
    id: 1,
    organ: "Heart",
    organDetail: "Full Heart",
    bloodType: "O+",
    hospital: "AIIMS Delhi",
    patient: "Patient #4521",
    urgency: "critical",
    time: "5 min ago",
    message: "Urgent heart transplant needed immediately. Patient in critical condition, cardiac failure stage IV.",
    location: "New Delhi, India",
    age: 34,
    waitlistDays: 120,
  },
  {
    id: 2,
    organ: "Kidney",
    organDetail: "Left Kidney",
    bloodType: "B+",
    hospital: "Max Hyderabad",
    patient: "Patient #6781",
    urgency: "critical",
    time: "12 min ago",
    message: "Left kidney required for end-stage renal failure. Dialysis failing, patient deteriorating rapidly.",
    location: "Hyderabad, Telangana",
    age: 28,
    waitlistDays: 85,
  },
  {
    id: 3,
    organ: "Blood",
    organDetail: "Packed RBC",
    bloodType: "AB-",
    hospital: "Fortis Mumbai",
    patient: "Patient #3892",
    urgency: "high",
    time: "18 min ago",
    message: "AB- blood units required urgently for emergency surgery. 4 units needed.",
    location: "Mumbai, Maharashtra",
    age: 45,
    waitlistDays: 0,
  },
  {
    id: 4,
    organ: "Liver",
    organDetail: "Right Lobe",
    bloodType: null,
    hospital: "Apollo Chennai",
    patient: "Patient #7210",
    urgency: "medium",
    time: "1 hour ago",
    message: "Liver donor match found for right lobe. Awaiting transport coordination and cross-match confirmation.",
    location: "Chennai, Tamil Nadu",
    age: 52,
    waitlistDays: 210,
  },
  {
    id: 5,
    organ: "Lungs",
    organDetail: "Right Lung",
    bloodType: "A+",
    hospital: "Narayana Bangalore",
    patient: "Patient #9043",
    urgency: "high",
    time: "35 min ago",
    message: "Right lung transplant needed for severe COPD patient. Currently on ventilator support.",
    location: "Bangalore, Karnataka",
    age: 61,
    waitlistDays: 160,
  },
];

const Alerts = () => {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const { toast } = useToast();

  const handleAccept = (alert: typeof alerts[0]) => {
    toast({
      title: "✅ Alert Accepted",
      description: `Transport for ${alert.organDetail} (${alert.organ}) is being coordinated with ${alert.hospital}.`,
    });
  };

  const handleDismiss = (id: number) => {
    setDismissed([...dismissed, id]);
  };

  const activeAlerts = alerts.filter((a) => !dismissed.includes(a.id));
  const criticalCount = activeAlerts.filter((a) => a.urgency === "critical").length;

  return (
    <div className="space-y-8">
      {/* Critical Banner */}
      {criticalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-destructive/10 border-2 border-destructive/30 p-4 flex items-center gap-4"
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
              🚨 {criticalCount} CRITICAL ALERT{criticalCount > 1 ? "S" : ""} — IMMEDIATE ACTION REQUIRED
            </p>
            <p className="text-xs text-destructive/80 mt-0.5">Patients in life-threatening condition. Response needed within minutes.</p>
          </div>
          <Volume2 className="w-5 h-5 text-destructive animate-pulse" />
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-1">Incoming organ requests from the hospital network</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bell className="w-4 h-4 text-primary" />
          <span>{activeAlerts.length} active alerts</span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {activeAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-xl shadow-card overflow-hidden ${
                alert.urgency === "critical"
                  ? "border-l-4 border-l-destructive ring-1 ring-destructive/20"
                  : alert.urgency === "high"
                  ? "border-l-4 border-l-warning"
                  : "border-l-4 border-l-primary"
              }`}
            >
              {/* Critical pulse bar */}
              {alert.urgency === "critical" && (
                <div className="h-1 w-full bg-gradient-urgent pulse-urgent" />
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                        alert.urgency === "critical"
                          ? "bg-destructive/20 text-destructive"
                          : alert.urgency === "high"
                          ? "bg-warning/15 text-warning"
                          : "bg-primary/15 text-primary"
                      }`}>
                        {alert.urgency === "critical" && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                          </span>
                        )}
                        {alert.urgency}
                      </span>
                      <span className="font-heading font-semibold text-foreground flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-primary" /> {alert.organ}
                      </span>
                      <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                        {alert.organDetail}
                      </span>
                      {alert.bloodType && (
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-semibold">
                          Blood: {alert.bloodType}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {alert.time}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">{alert.message}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.hospital}, {alert.location}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {alert.patient}</span>
                      <span>Age: <strong className="text-foreground">{alert.age}</strong></span>
                      {alert.waitlistDays > 0 && (
                        <span>Waitlist: <strong className="text-warning">{alert.waitlistDays} days</strong></span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button
                      variant={alert.urgency === "critical" ? "urgent" : "glow"}
                      size="sm"
                      onClick={() => handleAccept(alert)}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept & Assign
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDismiss(alert.id)}>
                      <XCircle className="w-4 h-4" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alerts;
