import { motion } from "framer-motion";
import { Building2, MapPin, Phone, Globe, CheckCircle, Clock, Wifi, WifiOff, Star, Users, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const hospitals = [
  {
    name: "AIIMS New Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    specialties: ["Heart", "Kidney", "Liver", "Lungs"],
    status: "online",
    phone: "+91 11-2658 8500",
    activeRequests: 4,
    successRate: 99.5,
    totalTransports: 342,
    rating: 4.9,
    lastActive: "2 min ago",
  },
  {
    name: "Fortis Memorial Research Institute",
    city: "Gurgaon",
    state: "Haryana",
    type: "Private",
    specialties: ["Heart", "Kidney", "Bone Marrow"],
    status: "online",
    phone: "+91 124-4962 200",
    activeRequests: 2,
    successRate: 98.8,
    totalTransports: 215,
    rating: 4.7,
    lastActive: "Just now",
  },
  {
    name: "Apollo Hospitals",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Private",
    specialties: ["Liver", "Kidney", "Cornea", "Pancreas"],
    status: "online",
    phone: "+91 44-2829 3333",
    activeRequests: 3,
    successRate: 99.1,
    totalTransports: 287,
    rating: 4.8,
    lastActive: "5 min ago",
  },
  {
    name: "CMC Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Trust",
    specialties: ["Kidney", "Blood", "Bone Marrow"],
    status: "online",
    phone: "+91 416-228 1000",
    activeRequests: 1,
    successRate: 99.7,
    totalTransports: 198,
    rating: 4.9,
    lastActive: "1 min ago",
  },
  {
    name: "Narayana Health City",
    city: "Bangalore",
    state: "Karnataka",
    type: "Private",
    specialties: ["Heart", "Lungs", "Liver"],
    status: "online",
    phone: "+91 80-7122 2222",
    activeRequests: 2,
    successRate: 98.5,
    totalTransports: 176,
    rating: 4.6,
    lastActive: "8 min ago",
  },
  {
    name: "Max Super Specialty Hospital",
    city: "Hyderabad",
    state: "Telangana",
    type: "Private",
    specialties: ["Kidney", "Liver", "Cornea"],
    status: "offline",
    phone: "+91 40-4567 8900",
    activeRequests: 0,
    successRate: 97.9,
    totalTransports: 134,
    rating: 4.5,
    lastActive: "3 hours ago",
  },
  {
    name: "PGIMER Chandigarh",
    city: "Chandigarh",
    state: "Punjab",
    type: "Government",
    specialties: ["Heart", "Kidney", "Liver", "Lungs", "Pancreas"],
    status: "online",
    phone: "+91 172-274 6018",
    activeRequests: 3,
    successRate: 99.0,
    totalTransports: 256,
    rating: 4.8,
    lastActive: "30 sec ago",
  },
  {
    name: "Sankara Nethralaya",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Trust",
    specialties: ["Cornea"],
    status: "online",
    phone: "+91 44-2827 1616",
    activeRequests: 1,
    successRate: 99.9,
    totalTransports: 520,
    rating: 5.0,
    lastActive: "10 min ago",
  },
];

const HospitalNetwork = () => {
  const [search, setSearch] = useState("");

  const filtered = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const onlineCount = hospitals.filter((h) => h.status === "online").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Hospital Network</h1>
        <p className="text-muted-foreground mt-1">Connected hospitals, their specialties, and real-time status</p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Hospitals", value: hospitals.length, icon: Building2, color: "text-primary" },
          { label: "Online Now", value: onlineCount, icon: Wifi, color: "text-success" },
          { label: "Total Transports", value: hospitals.reduce((a, b) => a + b.totalTransports, 0).toLocaleString(), icon: Heart, color: "text-warning" },
          { label: "Active Requests", value: hospitals.reduce((a, b) => a + b.activeRequests, 0), icon: Users, color: "text-destructive" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4 shadow-card"
          >
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <div className={`font-heading text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by hospital, city, or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-11 bg-secondary border-border"
        />
      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((hospital, i) => (
          <motion.div
            key={hospital.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className={`glass rounded-xl shadow-card p-5 hover:shadow-glow transition-all ${
              hospital.status === "offline" ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  hospital.status === "online" ? "bg-success/15" : "bg-muted"
                }`}>
                  <Building2 className={`w-5 h-5 ${hospital.status === "online" ? "text-success" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-sm">{hospital.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {hospital.city}, {hospital.state}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {hospital.status === "online" ? (
                  <Wifi className="w-3.5 h-3.5 text-success" />
                ) : (
                  <WifiOff className="w-3.5 h-3.5 text-muted-foreground" />
                )}
                <span className={`text-xs font-medium ${hospital.status === "online" ? "text-success" : "text-muted-foreground"}`}>
                  {hospital.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {hospital.specialties.map((s) => (
                <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>
              ))}
              <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{hospital.type}</span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border/50">
              <div>
                <div className="text-xs text-muted-foreground">Success</div>
                <div className="text-sm font-semibold text-success">{hospital.successRate}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Transports</div>
                <div className="text-sm font-semibold text-foreground">{hospital.totalTransports}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Active</div>
                <div className="text-sm font-semibold text-warning">{hospital.activeRequests}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Rating</div>
                <div className="text-sm font-semibold text-foreground flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-warning fill-warning" /> {hospital.rating}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {hospital.phone}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {hospital.lastActive}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HospitalNetwork;
