import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, AlertTriangle, Siren } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const organTypes = [
  { value: "heart", label: "Heart", emoji: "🫀", subtypes: ["Full Heart", "Heart Valves", "Heart-Lung Block"] },
  { value: "kidney", label: "Kidney", emoji: "🫘", subtypes: ["Left Kidney", "Right Kidney", "Pediatric En Bloc"] },
  { value: "liver", label: "Liver", emoji: "🟤", subtypes: ["Full Liver", "Left Lobe", "Right Lobe", "Split Liver"] },
  { value: "lungs", label: "Lungs", emoji: "🫁", subtypes: ["Left Lung", "Right Lung", "Single Lobe", "Double Lung"] },
  { value: "pancreas", label: "Pancreas", emoji: "🟡", subtypes: ["Whole Pancreas", "Islet Cells", "SPK Combined"] },
  { value: "cornea", label: "Cornea", emoji: "👁️", subtypes: ["Full Thickness (PK)", "Endothelial (DSEK)", "Anterior Lamellar"] },
  { value: "blood", label: "Blood", emoji: "🩸", subtypes: ["Packed RBC", "Platelets", "Fresh Frozen Plasma", "Whole Blood"] },
  { value: "bone_marrow", label: "Bone Marrow", emoji: "🦴", subtypes: ["Autologous", "Allogeneic", "Haploidentical", "Cord Blood"] },
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const urgencyLevels = [
  { value: "critical", label: "🚨 Critical — Immediate (life-threatening)", color: "text-destructive" },
  { value: "high", label: "⚠️ High — Within 6 hours", color: "text-warning" },
  { value: "medium", label: "🔵 Medium — Within 24 hours", color: "text-primary" },
];

const RequestOrgan = () => {
  const [organ, setOrgan] = useState("");
  const [subtype, setSubtype] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [urgency, setUrgency] = useState("");
  const { toast } = useToast();

  const selectedOrgan = organTypes.find((o) => o.value === organ);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "🚨 Request Sent!",
      description: `${subtype || selectedOrgan?.label || "Organ"} request broadcast to all connected hospitals. A transport will be assigned shortly.`,
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Request Organ</h1>
        <p className="text-muted-foreground mt-1">Send an urgent organ request to all connected hospitals</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass rounded-xl p-6 shadow-card space-y-6"
      >
        {/* Organ Type */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Organ Type</Label>
          <div className="grid grid-cols-4 gap-2">
            {organTypes.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => { setOrgan(o.value); setSubtype(""); }}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg text-xs font-medium transition-all ${
                  organ === o.value
                    ? "bg-primary/15 text-primary border border-primary/30 shadow-glow"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                }`}
              >
                <span className="text-xl">{o.emoji}</span>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Organ Subtype */}
        <AnimatePresence>
          {selectedOrgan && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <Label className="text-muted-foreground">Specific Type — {selectedOrgan.label}</Label>
              <div className="grid grid-cols-2 gap-2">
                {selectedOrgan.subtypes.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSubtype(st)}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all text-left ${
                      subtype === st
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blood Type (always show for blood, optional for organs) */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">
            Blood Type {organ === "blood" ? "(Required)" : "(Patient's Blood Group)"}
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {bloodTypes.map((bt) => (
              <button
                key={bt}
                type="button"
                onClick={() => setBloodType(bt)}
                className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                  bloodType === bt
                    ? "bg-destructive/15 text-destructive border border-destructive/30"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                }`}
              >
                {bt}
              </button>
            ))}
          </div>
        </div>

        {/* Urgency Level */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Urgency Level</Label>
          <Select onValueChange={setUrgency} value={urgency}>
            <SelectTrigger className="h-12 bg-secondary border-border">
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              {urgencyLevels.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  <span className={u.color}>{u.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Patient Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Patient Name</Label>
            <Input className="h-12 bg-secondary border-border" placeholder="Patient full name" required />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Patient Age</Label>
            <Input className="h-12 bg-secondary border-border" type="number" placeholder="Age" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Hospital Name</Label>
            <Input className="h-12 bg-secondary border-border" placeholder="Your hospital name" required />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Hospital Location</Label>
            <Input className="h-12 bg-secondary border-border" placeholder="City, State" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Additional Notes</Label>
          <Textarea className="bg-secondary border-border min-h-[80px]" placeholder="Any specific requirements, allergies, medical history notes..." />
        </div>

        {urgency === "critical" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border-2 border-destructive/30"
          >
            <span className="relative flex h-4 w-4 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive" />
            </span>
            <Siren className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive font-medium">
              This will trigger an <strong>IMMEDIATE RED ALERT</strong> to all connected hospitals in the network with audible notifications.
            </p>
          </motion.div>
        )}

        <Button type="submit" variant={urgency === "critical" ? "urgent" : "glow"} className="w-full h-12 text-base">
          <Send className="w-5 h-5" />
          {urgency === "critical" ? "🚨 Send Critical Alert to All Hospitals" : "Send Request to All Hospitals"}
        </Button>
      </motion.form>
    </div>
  );
};

export default RequestOrgan;
