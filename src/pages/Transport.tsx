import { motion } from "framer-motion";
import { Truck, MapPin, User, Phone, Clock, ArrowRight, Package } from "lucide-react";

const transports = [
  {
    id: "TR-001",
    organ: "Heart",
    status: "in_transit",
    driver: { name: "Rajesh Kumar", phone: "+91 98765 43210" },
    donor: { name: "Anonymous Donor", hospital: "AIIMS Delhi", location: "New Delhi" },
    receiver: { name: "Patient Sharma", hospital: "Fortis Mumbai", location: "Mumbai" },
    eta: "2h 15m",
    progress: 60,
    startedAt: "10:30 AM",
  },
  {
    id: "TR-003",
    organ: "Liver",
    status: "pickup",
    driver: { name: "Suresh Patel", phone: "+91 87654 32109" },
    donor: { name: "Donor #892", hospital: "Medanta Gurgaon", location: "Gurgaon" },
    receiver: { name: "Patient Reddy", hospital: "Narayana Bangalore", location: "Bangalore" },
    eta: "Picking up",
    progress: 10,
    startedAt: "12:00 PM",
  },
  {
    id: "TR-004",
    organ: "Blood (O+)",
    status: "in_transit",
    driver: { name: "Amit Singh", phone: "+91 76543 21098" },
    donor: { name: "CMC Blood Bank", hospital: "CMC Vellore", location: "Vellore" },
    receiver: { name: "Patient Nair", hospital: "KIMS Trivandrum", location: "Trivandrum" },
    eta: "45m",
    progress: 80,
    startedAt: "11:15 AM",
  },
];

const Transport = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Transport Tracking</h1>
        <p className="text-muted-foreground mt-1">Live tracking of organ transports with driver and patient details</p>
      </div>

      <div className="space-y-6">
        {transports.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-xl shadow-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  t.status === "in_transit" ? "bg-warning/15" : "bg-primary/15"
                }`}>
                  <Truck className={`w-5 h-5 ${t.status === "in_transit" ? "text-warning" : "text-primary"}`} />
                </div>
                <div>
                  <div className="font-heading font-semibold text-foreground flex items-center gap-2">
                    {t.id}
                    <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full">{t.organ}</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Started {t.startedAt} • ETA: {t.eta}
                  </div>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${
                t.status === "in_transit" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"
              }`}>
                {t.status === "in_transit" ? "In Transit" : "Pickup"}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="px-5 pt-4">
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  className="h-full rounded-full bg-gradient-primary"
                />
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4 p-5">
              {/* Donor */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">Donor</span>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="w-4 h-4 text-muted-foreground" /> {t.donor.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" /> {t.donor.hospital}, {t.donor.location}
                </div>
              </div>

              {/* Driver */}
              <div className="space-y-2 text-center">
                <span className="text-xs font-medium text-warning uppercase tracking-wide">Delivery Partner</span>
                <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                  <Package className="w-4 h-4 text-muted-foreground" /> {t.driver.name}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3" /> {t.driver.phone}
                </div>
              </div>

              {/* Receiver */}
              <div className="space-y-2 text-right">
                <span className="text-xs font-medium text-success uppercase tracking-wide">Receiver</span>
                <div className="flex items-center justify-end gap-2 text-sm text-foreground">
                  {t.receiver.name} <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  {t.receiver.hospital}, {t.receiver.location} <MapPin className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Route Visualization */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary" /> {t.donor.location}
                </span>
                <div className="flex-1 flex items-center justify-center gap-2 text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <div className="h-px flex-1 bg-border" />
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  {t.receiver.location} <MapPin className="w-3 h-3 text-success" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Transport;
