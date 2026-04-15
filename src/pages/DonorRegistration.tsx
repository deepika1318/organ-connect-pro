import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeartHandshake, CheckCircle, Shield, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const donorOrgans = [
  { value: "kidney", label: "Kidney", emoji: "🫘", subtypes: ["Left Kidney", "Right Kidney", "Either Kidney"] },
  { value: "liver", label: "Liver", emoji: "🟤", subtypes: ["Full Liver", "Left Lobe", "Right Lobe"] },
  { value: "heart", label: "Heart", emoji: "🫀", subtypes: ["Full Heart", "Heart Valves"] },
  { value: "lungs", label: "Lungs", emoji: "🫁", subtypes: ["Left Lung", "Right Lung", "Both Lungs"] },
  { value: "cornea", label: "Cornea", emoji: "👁️", subtypes: ["Left Eye", "Right Eye", "Both Eyes"] },
  { value: "bone_marrow", label: "Bone Marrow", emoji: "🦴", subtypes: ["Autologous", "Allogeneic"] },
  { value: "blood", label: "Blood", emoji: "🩸", subtypes: ["Whole Blood", "Platelets", "Plasma"] },
  { value: "skin", label: "Skin Tissue", emoji: "🧬", subtypes: ["Skin Graft", "Dermal Tissue"] },
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const donorTypes = [
  { value: "living", label: "Living Donor", desc: "Donate while alive (kidney, liver lobe, blood, marrow)", icon: "💚" },
  { value: "deceased", label: "Deceased Donor (Pledge)", desc: "Pledge organs to be donated after death", icon: "🕊️" },
  { value: "blood_regular", label: "Regular Blood Donor", desc: "Sign up for recurring blood donations", icon: "🩸" },
];

const DonorRegistration = () => {
  const [donorType, setDonorType] = useState("");
  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([]);
  const [subtypes, setSubtypes] = useState<Record<string, string>>({});
  const [bloodType, setBloodType] = useState("");
  const [consent, setConsent] = useState(false);
  const { toast } = useToast();

  const toggleOrgan = (value: string) => {
    setSelectedOrgans((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast({ title: "⚠️ Consent Required", description: "Please confirm your consent before submitting.", variant: "destructive" });
      return;
    }
    toast({
      title: "✅ Donor Registered Successfully!",
      description: `Thank you for your noble decision. Your donor ID will be sent via SMS & email. You are now part of the Arogya lifesaver network.`,
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Donor Registration</h1>
        <p className="text-muted-foreground mt-1">Register as an organ or blood donor — save lives</p>
      </div>

      {/* Success Rate Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-success/10 border border-success/30 p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-success" />
        </div>
        <div>
          <p className="text-sm font-bold text-success">89% Transplant Success Rate</p>
          <p className="text-xs text-success/70">Our network has one of the highest success rates in the country</p>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass rounded-xl p-6 shadow-card space-y-6"
      >
        {/* Donor Type */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Donor Type</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {donorTypes.map((dt) => (
              <button
                key={dt.value}
                type="button"
                onClick={() => setDonorType(dt.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all ${
                  donorType === dt.value
                    ? "bg-primary/15 text-primary border-2 border-primary/30 shadow-glow"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border-2 border-transparent"
                }`}
              >
                <span className="text-2xl">{dt.icon}</span>
                <span className="text-sm font-semibold">{dt.label}</span>
                <span className="text-xs opacity-70 leading-tight">{dt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Organs to Donate (multi-select) */}
        <AnimatePresence>
          {donorType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <Label className="text-muted-foreground">Organs to Donate (select all that apply)</Label>
              <div className="grid grid-cols-4 gap-2">
                {donorOrgans.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => toggleOrgan(o.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg text-xs font-medium transition-all ${
                      selectedOrgans.includes(o.value)
                        ? "bg-primary/15 text-primary border border-primary/30 shadow-glow"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                    }`}
                  >
                    <span className="text-xl">{o.emoji}</span>
                    {o.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtypes for selected organs */}
        <AnimatePresence>
          {selectedOrgans.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              {selectedOrgans.map((organVal) => {
                const organ = donorOrgans.find((o) => o.value === organVal);
                if (!organ) return null;
                return (
                  <div key={organVal} className="space-y-2">
                    <Label className="text-muted-foreground text-xs">
                      {organ.emoji} {organ.label} — Specific Part
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {organ.subtypes.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setSubtypes((prev) => ({ ...prev, [organVal]: st }))}
                          className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                            subtypes[organVal] === st
                              ? "bg-primary/15 text-primary border border-primary/30"
                              : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blood Type */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Blood Group</Label>
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

        {/* Personal Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Full Name</Label>
            <Input className="h-12 bg-secondary border-border" placeholder="Donor full name" required />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Age</Label>
            <Input className="h-12 bg-secondary border-border" type="number" placeholder="Age" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Phone Number</Label>
            <Input className="h-12 bg-secondary border-border" placeholder="+91 XXXXX XXXXX" required />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Email</Label>
            <Input className="h-12 bg-secondary border-border" type="email" placeholder="donor@email.com" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">City / District</Label>
            <Input className="h-12 bg-secondary border-border" placeholder="City, State" required />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Nearest Hospital</Label>
            <Input className="h-12 bg-secondary border-border" placeholder="Hospital name" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Medical History / Notes</Label>
          <Textarea className="bg-secondary border-border min-h-[80px]" placeholder="Any existing conditions, allergies, past surgeries..." />
        </div>

        {/* Consent */}
        <div
          onClick={() => setConsent(!consent)}
          className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
            consent
              ? "bg-success/10 border-2 border-success/30"
              : "bg-secondary border-2 border-border hover:border-primary/30"
          }`}
        >
          <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 flex-shrink-0 ${
            consent ? "bg-success text-success-foreground" : "bg-muted border border-border"
          }`}>
            {consent && <CheckCircle className="w-3.5 h-3.5" />}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">I consent to organ/blood donation</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              I voluntarily agree to register as a donor. I understand my data will be securely stored and used only for matching with patients in need. I can withdraw my consent at any time.
            </p>
          </div>
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        </div>

        <Button type="submit" variant="glow" className="w-full h-12 text-base">
          <HeartHandshake className="w-5 h-5" />
          Register as Donor — Save Lives 💚
        </Button>
      </motion.form>
    </div>
  );
};

export default DonorRegistration;
