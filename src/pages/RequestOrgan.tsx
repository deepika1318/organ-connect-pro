import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const organTypes = [
  { value: "heart", label: "Heart", emoji: "🫀" },
  { value: "kidney", label: "Kidney", emoji: "🫘" },
  { value: "liver", label: "Liver", emoji: "🟤" },
  { value: "lungs", label: "Lungs", emoji: "🫁" },
  { value: "pancreas", label: "Pancreas", emoji: "🟡" },
  { value: "cornea", label: "Cornea", emoji: "👁️" },
  { value: "blood", label: "Blood", emoji: "🩸" },
  { value: "bone_marrow", label: "Bone Marrow", emoji: "🦴" },
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const urgencyLevels = [
  { value: "critical", label: "Critical — Immediate", color: "text-destructive" },
  { value: "high", label: "High — Within 6 hours", color: "text-warning" },
  { value: "medium", label: "Medium — Within 24 hours", color: "text-primary" },
];

const RequestOrgan = () => {
  const [organ, setOrgan] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [urgency, setUrgency] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "🚨 Request Sent!",
      description: "All connected hospitals have been alerted. A transport will be assigned shortly.",
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
                onClick={() => setOrgan(o.value)}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg text-xs font-medium transition-all ${
                  organ === o.value
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                }`}
              >
                <span className="text-xl">{o.emoji}</span>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blood Type (conditional) */}
        {organ === "blood" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-2"
          >
            <Label className="text-muted-foreground">Blood Type Required</Label>
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
          </motion.div>
        )}

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

        <div className="space-y-2">
          <Label className="text-muted-foreground">Hospital Name</Label>
          <Input className="h-12 bg-secondary border-border" placeholder="Your hospital name" required />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Additional Notes</Label>
          <Textarea className="bg-secondary border-border min-h-[80px]" placeholder="Any specific requirements or notes..." />
        </div>

        {urgency === "critical" && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">This will trigger an immediate alert to all connected hospitals in the network.</p>
          </div>
        )}

        <Button type="submit" variant={urgency === "critical" ? "urgent" : "glow"} className="w-full h-12 text-base">
          <Send className="w-5 h-5" />
          Send Request to All Hospitals
        </Button>
      </motion.form>
    </div>
  );
};

export default RequestOrgan;
