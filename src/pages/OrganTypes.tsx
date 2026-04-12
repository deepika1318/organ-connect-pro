import { motion } from "framer-motion";
import { Clock, Thermometer, AlertTriangle } from "lucide-react";

const organs = [
  { name: "Heart", emoji: "🫀", maxTime: "4-6 hours", temp: "4°C", availability: 3, color: "from-red-500/20 to-red-900/20", notes: "Must be transported in cardioplegic solution" },
  { name: "Kidney", emoji: "🫘", maxTime: "24-36 hours", temp: "4°C", availability: 8, color: "from-amber-500/20 to-amber-900/20", notes: "Can be preserved longer with machine perfusion" },
  { name: "Liver", emoji: "🟤", maxTime: "12-18 hours", temp: "4°C", availability: 5, color: "from-orange-500/20 to-orange-900/20", notes: "Time-sensitive, prioritize fastest route" },
  { name: "Lungs", emoji: "🫁", maxTime: "6-8 hours", temp: "4°C", availability: 2, color: "from-sky-500/20 to-sky-900/20", notes: "Requires ex-vivo perfusion for assessment" },
  { name: "Pancreas", emoji: "🟡", maxTime: "12-18 hours", temp: "4°C", availability: 4, color: "from-yellow-500/20 to-yellow-900/20", notes: "Often co-transplanted with kidney" },
  { name: "Cornea", emoji: "👁️", maxTime: "7-14 days", temp: "2-8°C", availability: 12, color: "from-blue-500/20 to-blue-900/20", notes: "Stored in preservative medium" },
  { name: "Bone Marrow", emoji: "🦴", maxTime: "24-72 hours", temp: "Room temp", availability: 6, color: "from-gray-500/20 to-gray-900/20", notes: "Must be transported upright, no freezing" },
  { name: "Skin Graft", emoji: "🩹", maxTime: "5 years (frozen)", temp: "-70°C", availability: 15, color: "from-pink-500/20 to-pink-900/20", notes: "Cryopreserved for long-term storage" },
];

const OrganTypes = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Organ Types</h1>
        <p className="text-muted-foreground mt-1">Organ categories, preservation requirements, and availability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {organs.map((organ, i) => (
          <motion.div
            key={organ.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={`glass rounded-xl p-5 shadow-card bg-gradient-to-br ${organ.color} hover:scale-[1.02] transition-transform cursor-pointer`}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{organ.emoji}</span>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-bold text-foreground">{organ.name}</h3>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3 text-warning" /> {organ.maxTime}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-primary" /> {organ.temp}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
                  <AlertTriangle className="w-3 h-3 text-warning flex-shrink-0 mt-0.5" />
                  {organ.notes}
                </p>
                <div className="mt-3">
                  <span className="text-xs font-medium text-primary">{organ.availability} available in network</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrganTypes;
