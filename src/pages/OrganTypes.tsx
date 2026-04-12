import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Thermometer, AlertTriangle, ChevronDown, ChevronUp, Info } from "lucide-react";

const organs = [
  {
    name: "Heart",
    emoji: "🫀",
    maxTime: "4-6 hours",
    temp: "4°C",
    availability: 3,
    color: "from-red-500/20 to-red-900/20",
    notes: "Must be transported in cardioplegic solution",
    subtypes: [
      { name: "Full Heart", description: "Complete heart transplant", availability: 1 },
      { name: "Heart Valves", description: "Aortic, Mitral, Tricuspid, Pulmonary", availability: 4 },
      { name: "Heart-Lung Block", description: "Combined heart and lung transplant", availability: 0 },
    ],
  },
  {
    name: "Kidney",
    emoji: "🫘",
    maxTime: "24-36 hours",
    temp: "4°C",
    availability: 8,
    color: "from-amber-500/20 to-amber-900/20",
    notes: "Can be preserved longer with machine perfusion",
    subtypes: [
      { name: "Left Kidney", description: "Preferred for living donation — longer renal vein", availability: 5 },
      { name: "Right Kidney", description: "Shorter renal vein, often from deceased donors", availability: 3 },
      { name: "Pediatric Kidney (En Bloc)", description: "Both kidneys transplanted as one unit", availability: 1 },
    ],
  },
  {
    name: "Liver",
    emoji: "🟤",
    maxTime: "12-18 hours",
    temp: "4°C",
    availability: 5,
    color: "from-orange-500/20 to-orange-900/20",
    notes: "Time-sensitive, prioritize fastest route",
    subtypes: [
      { name: "Full Liver", description: "Complete liver transplant from deceased donor", availability: 2 },
      { name: "Left Lobe", description: "Segments II & III — typically for pediatric patients", availability: 1 },
      { name: "Right Lobe", description: "Segments V-VIII — living donor, larger graft", availability: 2 },
      { name: "Split Liver", description: "One liver split between two recipients", availability: 0 },
    ],
  },
  {
    name: "Lungs",
    emoji: "🫁",
    maxTime: "6-8 hours",
    temp: "4°C",
    availability: 2,
    color: "from-sky-500/20 to-sky-900/20",
    notes: "Requires ex-vivo perfusion for assessment",
    subtypes: [
      { name: "Left Lung", description: "Two lobes — superior and inferior", availability: 1 },
      { name: "Right Lung", description: "Three lobes — superior, middle, inferior", availability: 1 },
      { name: "Single Lobe (Living)", description: "One lobe from a living donor", availability: 0 },
      { name: "Double Lung", description: "Bilateral transplant — both lungs replaced", availability: 0 },
    ],
  },
  {
    name: "Pancreas",
    emoji: "🟡",
    maxTime: "12-18 hours",
    temp: "4°C",
    availability: 4,
    color: "from-yellow-500/20 to-yellow-900/20",
    notes: "Often co-transplanted with kidney",
    subtypes: [
      { name: "Whole Pancreas", description: "Full organ for Type 1 diabetes patients", availability: 2 },
      { name: "Islet Cells", description: "Isolated islets of Langerhans — minimally invasive", availability: 3 },
      { name: "Pancreas-Kidney (SPK)", description: "Simultaneous pancreas-kidney transplant", availability: 1 },
    ],
  },
  {
    name: "Cornea",
    emoji: "👁️",
    maxTime: "7-14 days",
    temp: "2-8°C",
    availability: 12,
    color: "from-blue-500/20 to-blue-900/20",
    notes: "Stored in preservative medium",
    subtypes: [
      { name: "Full Thickness (PK)", description: "Penetrating keratoplasty — entire cornea replaced", availability: 5 },
      { name: "Endothelial (DSEK/DMEK)", description: "Only inner layer — faster recovery", availability: 4 },
      { name: "Anterior Lamellar (DALK)", description: "Outer layers only — preserves endothelium", availability: 3 },
    ],
  },
  {
    name: "Bone Marrow",
    emoji: "🦴",
    maxTime: "24-72 hours",
    temp: "Room temp",
    availability: 6,
    color: "from-gray-500/20 to-gray-900/20",
    notes: "Must be transported upright, no freezing",
    subtypes: [
      { name: "Autologous", description: "Patient's own marrow — harvested before treatment", availability: 2 },
      { name: "Allogeneic (Matched)", description: "HLA-matched donor — sibling or registry", availability: 3 },
      { name: "Haploidentical", description: "Half-matched family donor — emerging technique", availability: 1 },
      { name: "Cord Blood", description: "Umbilical cord stem cells — smaller volume", availability: 4 },
    ],
  },
  {
    name: "Skin Graft",
    emoji: "🩹",
    maxTime: "5 years (frozen)",
    temp: "-70°C",
    availability: 15,
    color: "from-pink-500/20 to-pink-900/20",
    notes: "Cryopreserved for long-term storage",
    subtypes: [
      { name: "Split-Thickness (STSG)", description: "Epidermis + partial dermis — for burns", availability: 8 },
      { name: "Full-Thickness (FTSG)", description: "Epidermis + full dermis — better cosmetic result", availability: 4 },
      { name: "Allograft (Cadaveric)", description: "Temporary biological dressing from deceased donor", availability: 6 },
      { name: "Amniotic Membrane", description: "Placental tissue graft — anti-inflammatory", availability: 3 },
    ],
  },
];

const OrganTypes = () => {
  const [expandedOrgan, setExpandedOrgan] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Organ Types</h1>
        <p className="text-muted-foreground mt-1">Organ categories, subtypes, preservation requirements, and availability</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-muted-foreground glass rounded-lg px-4 py-3">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-warning" /> Limited</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" /> Unavailable</span>
        <span className="flex items-center gap-1.5"><Info className="w-3 h-3" /> Click card to expand subtypes</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {organs.map((organ, i) => {
          const isExpanded = expandedOrgan === organ.name;
          const totalSubAvail = organ.subtypes.reduce((a, b) => a + b.availability, 0);

          return (
            <motion.div
              key={organ.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              layout
              className={`glass rounded-xl shadow-card bg-gradient-to-br ${organ.color} transition-all cursor-pointer`}
              onClick={() => setExpandedOrgan(isExpanded ? null : organ.name)}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{organ.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold text-foreground">{organ.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {organ.subtypes.length} subtypes
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
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
                      <span className="text-xs font-medium text-primary">{totalSubAvail} total available in network</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Subtypes */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 border-t border-border/50">
                      <div className="space-y-2 mt-4">
                        {organ.subtypes.map((sub) => (
                          <div
                            key={sub.name}
                            className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-3"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  sub.availability === 0 ? "bg-destructive" :
                                  sub.availability <= 2 ? "bg-warning" : "bg-success"
                                }`} />
                                <span className="text-sm font-medium text-foreground">{sub.name}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 ml-4">{sub.description}</p>
                            </div>
                            <div className="text-right ml-4">
                              <span className={`text-sm font-bold ${
                                sub.availability === 0 ? "text-destructive" :
                                sub.availability <= 2 ? "text-warning" : "text-primary"
                              }`}>
                                {sub.availability}
                              </span>
                              <p className="text-xs text-muted-foreground">avail.</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganTypes;
