import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ArrowRight, CheckCircle, Clock, XCircle, Search, Filter, Heart, Droplets, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const matches = [
  {
    id: "M-1001",
    organ: "Heart",
    organDetail: "Full Heart",
    bloodType: "O+",
    status: "completed",
    matchScore: 98,
    donor: { name: "Donor #A210", age: 32, hospital: "AIIMS Delhi", city: "New Delhi" },
    receiver: { name: "Patient Sharma", age: 34, hospital: "Fortis Mumbai", city: "Mumbai" },
    matchedAt: "2024-03-15 10:30 AM",
    completedAt: "2024-03-15 02:45 PM",
    hlaCrossMatch: "6/6 Antigen Match",
    coldIschemia: "3h 15m",
  },
  {
    id: "M-1002",
    organ: "Kidney",
    organDetail: "Left Kidney",
    bloodType: "B+",
    status: "in_progress",
    matchScore: 94,
    donor: { name: "Donor #B456", age: 28, hospital: "CMC Vellore", city: "Vellore" },
    receiver: { name: "Patient Reddy", age: 45, hospital: "Max Hyderabad", city: "Hyderabad" },
    matchedAt: "2024-03-16 08:00 AM",
    completedAt: null,
    hlaCrossMatch: "5/6 Antigen Match",
    coldIschemia: "Ongoing",
  },
  {
    id: "M-1003",
    organ: "Liver",
    organDetail: "Right Lobe",
    bloodType: "A-",
    status: "completed",
    matchScore: 91,
    donor: { name: "Living Donor #789", age: 35, hospital: "Medanta Gurgaon", city: "Gurgaon" },
    receiver: { name: "Patient Nair", age: 52, hospital: "Narayana Bangalore", city: "Bangalore" },
    matchedAt: "2024-03-14 06:00 AM",
    completedAt: "2024-03-14 08:30 PM",
    hlaCrossMatch: "ABO Compatible",
    coldIschemia: "6h 45m",
  },
  {
    id: "M-1004",
    organ: "Blood",
    organDetail: "Packed RBC (4 Units)",
    bloodType: "AB-",
    status: "cancelled",
    matchScore: 100,
    donor: { name: "Blood Bank #CMC", age: null, hospital: "CMC Vellore", city: "Vellore" },
    receiver: { name: "Patient Khan", age: 61, hospital: "Apollo Chennai", city: "Chennai" },
    matchedAt: "2024-03-13 11:00 AM",
    completedAt: null,
    hlaCrossMatch: "N/A — Blood Product",
    coldIschemia: "N/A",
  },
  {
    id: "M-1005",
    organ: "Cornea",
    organDetail: "Endothelial (DSEK)",
    bloodType: null,
    status: "completed",
    matchScore: 96,
    donor: { name: "Donor #C321", age: 45, hospital: "Sankara Nethralaya", city: "Chennai" },
    receiver: { name: "Patient Das", age: 67, hospital: "LV Prasad Eye", city: "Hyderabad" },
    matchedAt: "2024-03-12 09:00 AM",
    completedAt: "2024-03-13 11:00 AM",
    hlaCrossMatch: "Tissue Typing OK",
    coldIschemia: "26h (within limit)",
  },
];

const MatchLog = () => {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = matches.filter(
    (m) =>
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      m.organ.toLowerCase().includes(search.toLowerCase()) ||
      m.donor.hospital.toLowerCase().includes(search.toLowerCase()) ||
      m.receiver.hospital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Donor–Receiver Match Log</h1>
        <p className="text-muted-foreground mt-1">Complete history of organ matching with HLA compatibility and cold ischemia data</p>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, organ, or hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-secondary border-border"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Matches", value: matches.length, color: "text-primary" },
          { label: "Completed", value: matches.filter((m) => m.status === "completed").length, color: "text-success" },
          { label: "In Progress", value: matches.filter((m) => m.status === "in_progress").length, color: "text-warning" },
          { label: "Avg Match Score", value: `${Math.round(matches.reduce((a, b) => a + b.matchScore, 0) / matches.length)}%`, color: "text-primary" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-lg p-4 text-center shadow-card"
          >
            <div className={`font-heading text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Match Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((match, i) => {
            const isExpanded = expanded === match.id;
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                layout
                className={`glass rounded-xl shadow-card overflow-hidden cursor-pointer ${
                  match.status === "in_progress" ? "border-l-4 border-l-warning" :
                  match.status === "cancelled" ? "border-l-4 border-l-destructive/50" :
                  "border-l-4 border-l-success"
                }`}
                onClick={() => setExpanded(isExpanded ? null : match.id)}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        {match.organ === "Blood" ? (
                          <Droplets className="w-6 h-6 text-destructive" />
                        ) : (
                          <Heart className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-heading font-semibold text-foreground">{match.id}</span>
                          <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full">{match.organ}</span>
                          <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{match.organDetail}</span>
                          {match.bloodType && (
                            <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-semibold">{match.bloodType}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>{match.donor.hospital}</span>
                          <ArrowRight className="w-3 h-3 text-primary" />
                          <span>{match.receiver.hospital}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Match Score */}
                      <div className="text-center">
                        <div className={`font-heading text-lg font-bold ${
                          match.matchScore >= 95 ? "text-success" : match.matchScore >= 90 ? "text-primary" : "text-warning"
                        }`}>
                          {match.matchScore}%
                        </div>
                        <div className="text-xs text-muted-foreground">Match</div>
                      </div>

                      {/* Status */}
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        match.status === "completed" ? "bg-success/15 text-success" :
                        match.status === "in_progress" ? "bg-warning/15 text-warning" :
                        "bg-destructive/15 text-destructive"
                      }`}>
                        {match.status === "completed" ? <CheckCircle className="w-3 h-3" /> :
                         match.status === "in_progress" ? <Clock className="w-3 h-3" /> :
                         <XCircle className="w-3 h-3" />}
                        {match.status === "completed" ? "Completed" :
                         match.status === "in_progress" ? "In Progress" : "Cancelled"}
                      </span>

                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-border/50 pt-4">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Donor</span>
                            <div className="space-y-1 text-sm">
                              <p className="text-foreground font-medium">{match.donor.name}</p>
                              {match.donor.age && <p className="text-muted-foreground">Age: {match.donor.age}</p>}
                              <p className="text-muted-foreground">{match.donor.hospital}, {match.donor.city}</p>
                            </div>
                          </div>
                          <div className="space-y-3 text-center">
                            <span className="text-xs font-bold text-warning uppercase tracking-wider">Match Details</span>
                            <div className="space-y-1 text-sm">
                              <p className="text-foreground font-medium">{match.hlaCrossMatch}</p>
                              <p className="text-muted-foreground">Cold Ischemia: <span className="text-warning font-semibold">{match.coldIschemia}</span></p>
                              <p className="text-muted-foreground">Matched: {match.matchedAt}</p>
                              {match.completedAt && <p className="text-success text-xs">Completed: {match.completedAt}</p>}
                            </div>
                          </div>
                          <div className="space-y-3 text-right">
                            <span className="text-xs font-bold text-success uppercase tracking-wider">Receiver</span>
                            <div className="space-y-1 text-sm">
                              <p className="text-foreground font-medium">{match.receiver.name}</p>
                              {match.receiver.age && <p className="text-muted-foreground">Age: {match.receiver.age}</p>}
                              <p className="text-muted-foreground">{match.receiver.hospital}, {match.receiver.city}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MatchLog;
