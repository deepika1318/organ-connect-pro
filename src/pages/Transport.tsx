import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, User, Phone, Clock, ArrowRight, Package, Navigation, Radio, Shield } from "lucide-react";

const transports = [
  {
    id: "TR-001",
    organ: "Heart",
    organDetail: "Full Heart",
    status: "in_transit",
    driver: { name: "Rajesh Kumar", phone: "+91 98765 43210", vehicleNo: "DL-14-AB-1234" },
    donor: { name: "Anonymous Donor", hospital: "AIIMS Delhi", location: "New Delhi", coords: { lat: 28.5672, lng: 77.2100 } },
    receiver: { name: "Patient Sharma", hospital: "Fortis Mumbai", location: "Mumbai", coords: { lat: 19.0760, lng: 72.8777 } },
    driverLocation: { lat: 23.2599, lng: 77.4126, city: "Bhopal, MP", speed: "85 km/h", heading: "South-West", lastUpdate: "10 sec ago" },
    eta: "2h 15m",
    distance: { total: "1,400 km", covered: "840 km", remaining: "560 km" },
    progress: 60,
    startedAt: "10:30 AM",
    temperature: "4.1°C",
    urgent: true,
  },
  {
    id: "TR-003",
    organ: "Liver",
    organDetail: "Right Lobe",
    status: "pickup",
    driver: { name: "Suresh Patel", phone: "+91 87654 32109", vehicleNo: "HR-26-CD-5678" },
    donor: { name: "Donor #892", hospital: "Medanta Gurgaon", location: "Gurgaon", coords: { lat: 28.4595, lng: 77.0266 } },
    receiver: { name: "Patient Reddy", hospital: "Narayana Bangalore", location: "Bangalore", coords: { lat: 12.9716, lng: 77.5946 } },
    driverLocation: { lat: 28.4595, lng: 77.0266, city: "Gurgaon, HR", speed: "0 km/h", heading: "Stationary", lastUpdate: "2 sec ago" },
    eta: "Picking up",
    distance: { total: "2,010 km", covered: "0 km", remaining: "2,010 km" },
    progress: 5,
    startedAt: "12:00 PM",
    temperature: "3.8°C",
    urgent: true,
  },
  {
    id: "TR-004",
    organ: "Blood (O+)",
    organDetail: "4 Units Packed RBC",
    status: "in_transit",
    driver: { name: "Amit Singh", phone: "+91 76543 21098", vehicleNo: "TN-09-EF-9012" },
    donor: { name: "CMC Blood Bank", hospital: "CMC Vellore", location: "Vellore", coords: { lat: 12.9165, lng: 79.1325 } },
    receiver: { name: "Patient Nair", hospital: "KIMS Trivandrum", location: "Trivandrum", coords: { lat: 8.5241, lng: 76.9366 } },
    driverLocation: { lat: 10.7867, lng: 78.1370, city: "Trichy, TN", speed: "72 km/h", heading: "South", lastUpdate: "5 sec ago" },
    eta: "45m",
    distance: { total: "480 km", covered: "384 km", remaining: "96 km" },
    progress: 80,
    startedAt: "11:15 AM",
    temperature: "3.5°C",
    urgent: false,
  },
];

const LivePulse = () => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
    <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
  </span>
);

const Transport = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Transport Tracking</h1>
          <p className="text-muted-foreground mt-1">Live tracking with driver GPS, organ condition & route details</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
          <LivePulse />
          <span className="text-xs font-medium text-success">Live Tracking Active</span>
        </div>
      </div>

      <div className="space-y-6">
        {transports.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`glass rounded-xl shadow-card overflow-hidden ${
              t.urgent ? "border-l-4 border-l-destructive" : ""
            }`}
          >
            {/* Urgent Banner */}
            {t.urgent && (
              <div className="bg-destructive/10 border-b border-destructive/20 px-5 py-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                </span>
                <span className="text-xs font-bold text-destructive uppercase tracking-wider">🚨 Priority Transport — Time Critical</span>
              </div>
            )}

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
                    <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{t.organDetail}</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Started {t.startedAt} • ETA: {t.eta}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Organ Temp</div>
                  <div className="text-sm font-bold text-primary">{t.temperature}</div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${
                  t.status === "in_transit" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"
                }`}>
                  {t.status === "in_transit" ? "In Transit" : "Pickup"}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-5 pt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>{t.distance.covered} covered</span>
                <span>{t.distance.remaining} remaining</span>
              </div>
              <div className="h-2.5 rounded-full bg-secondary overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  className={`h-full rounded-full ${t.urgent ? "bg-gradient-urgent" : "bg-gradient-primary"}`}
                />
                {/* Driver position dot */}
                <motion.div
                  initial={{ left: 0 }}
                  animate={{ left: `${t.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-primary shadow-glow"
                />
              </div>
            </div>

            {/* 🚗 DRIVER LIVE LOCATION — NEW */}
            <div className="mx-5 mt-4 rounded-lg bg-secondary/60 border border-border/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Navigation className="w-4 h-4 text-success" />
                <span className="text-xs font-bold text-success uppercase tracking-wider">Driver Live Location</span>
                <LivePulse />
                <span className="text-xs text-muted-foreground ml-auto">Updated {t.driverLocation.lastUpdate}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">Current Location</div>
                  <div className="text-sm font-semibold text-foreground">{t.driverLocation.city}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Speed</div>
                  <div className="text-sm font-semibold text-foreground">{t.driverLocation.speed}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Heading</div>
                  <div className="text-sm font-semibold text-foreground">{t.driverLocation.heading}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">GPS Coordinates</div>
                  <div className="text-sm font-mono text-primary">{t.driverLocation.lat.toFixed(4)}°N, {t.driverLocation.lng.toFixed(4)}°E</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3 text-primary" />
                  Vehicle: <span className="font-semibold text-foreground">{t.driver.vehicleNo}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3 text-primary" />
                  <span className="font-semibold text-foreground">{t.driver.phone}</span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4 p-5">
              <div className="space-y-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">Donor</span>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="w-4 h-4 text-muted-foreground" /> {t.donor.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" /> {t.donor.hospital}, {t.donor.location}
                </div>
              </div>

              <div className="space-y-2 text-center">
                <span className="text-xs font-medium text-warning uppercase tracking-wide">Delivery Partner</span>
                <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                  <Package className="w-4 h-4 text-muted-foreground" /> {t.driver.name}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Radio className="w-3 h-3 text-success" /> Connected
                </div>
              </div>

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
                <div className="flex-1 flex items-center justify-center gap-1 text-muted-foreground px-2">
                  <div className="h-px flex-1 bg-border" />
                  <div className="flex items-center gap-1 bg-secondary rounded-full px-2 py-0.5">
                    <Navigation className="w-3 h-3 text-success" />
                    <span className="text-xs text-success font-medium">{t.driverLocation.city}</span>
                  </div>
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
