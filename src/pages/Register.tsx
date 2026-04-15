import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Heart, Shield, Activity, Eye, EyeOff, ArrowLeft, ArrowRight,
  User, Mail, Phone, Building2, BadgeCheck, FileText, Calendar,
  Stethoscope, Crown
} from "lucide-react";

type Role = "doctor" | "admin" | "hospital_head";

interface FormData {
  // Common
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profilePhoto: string;
  // Doctor
  medicalLicenseNo: string;
  specialization: string;
  yearsOfExperience: string;
  hospitalAffiliation: string;
  department: string;
  qualifications: string;
  nmcRegistrationNo: string;
  // Admin
  adminId: string;
  designation: string;
  authorityLevel: string;
  governmentId: string;
  organizationName: string;
  // Hospital Head
  hospitalName: string;
  hospitalRegNo: string;
  hospitalType: string;
  headDesignation: string;
  nabhAccreditationNo: string;
  hospitalAddress: string;
  totalBeds: string;
}

const initialFormData: FormData = {
  fullName: "", email: "", phone: "", password: "", confirmPassword: "",
  dateOfBirth: "", gender: "", address: "", city: "", state: "", pincode: "", profilePhoto: "",
  medicalLicenseNo: "", specialization: "", yearsOfExperience: "",
  hospitalAffiliation: "", department: "", qualifications: "", nmcRegistrationNo: "",
  adminId: "", designation: "", authorityLevel: "", governmentId: "", organizationName: "",
  hospitalName: "", hospitalRegNo: "", hospitalType: "", headDesignation: "",
  nabhAccreditationNo: "", hospitalAddress: "", totalBeds: "",
};

const roles = [
  { id: "doctor" as const, label: "Doctor", icon: Stethoscope, desc: "Medical professional" },
  { id: "hospital_head" as const, label: "Hospital Head", icon: Crown, desc: "Hospital administrator" },
  { id: "admin" as const, label: "Admin", icon: Shield, desc: "System administrator" },
];

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("doctor");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const totalSteps = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/"), 2500);
  };

  const genderOptions = ["Male", "Female", "Other"];

  const InputField = ({
    label, field, type = "text", placeholder, icon: Icon, required = true,
  }: {
    label: string; field: keyof FormData; type?: string; placeholder: string;
    icon?: React.ElementType; required?: boolean;
  }) => (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
        <Input
          type={type}
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => update(field, e.target.value)}
          className={`h-11 bg-secondary border-border focus:border-primary ${Icon ? "pl-10" : ""}`}
          required={required}
        />
      </div>
    </div>
  );

  // Step 1: Personal Information (common)
  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <User className="w-5 h-5 text-primary" /> Personal Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Full Name *" field="fullName" placeholder="Dr. Rajesh Kumar" icon={User} />
        <InputField label="Email Address *" field="email" type="email" placeholder="doctor@hospital.com" icon={Mail} />
        <InputField label="Phone Number *" field="phone" type="tel" placeholder="+91 98765 43210" icon={Phone} />
        <InputField label="Date of Birth *" field="dateOfBirth" type="date" placeholder="" icon={Calendar} />
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Gender *</Label>
          <div className="flex gap-2">
            {genderOptions.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => update("gender", g)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  formData.gender === g
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground border border-transparent hover:bg-secondary/80"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <InputField label="City *" field="city" placeholder="Mumbai" icon={Building2} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputField label="State *" field="state" placeholder="Maharashtra" />
        <InputField label="Pincode *" field="pincode" placeholder="400001" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Full Address *</Label>
        <textarea
          placeholder="Enter your complete address"
          value={formData.address}
          onChange={(e) => update("address", e.target.value)}
          className="w-full h-20 rounded-lg bg-secondary border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
          required
        />
      </div>
    </div>
  );

  // Step 2: Role-specific professional details
  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <BadgeCheck className="w-5 h-5 text-primary" /> Professional Details — {roles.find((r) => r.id === role)?.label}
      </h3>

      {role === "doctor" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Medical License No. *" field="medicalLicenseNo" placeholder="MCI-123456" icon={FileText} />
          <InputField label="NMC Registration No. *" field="nmcRegistrationNo" placeholder="NMC-2024-78901" icon={BadgeCheck} />
          <InputField label="Specialization *" field="specialization" placeholder="Cardiology, Nephrology…" icon={Stethoscope} />
          <InputField label="Years of Experience *" field="yearsOfExperience" type="number" placeholder="12" icon={Calendar} />
          <InputField label="Hospital Affiliation *" field="hospitalAffiliation" placeholder="AIIMS Delhi" icon={Building2} />
          <InputField label="Department *" field="department" placeholder="Cardiac Surgery" />
          <div className="sm:col-span-2">
            <InputField label="Qualifications *" field="qualifications" placeholder="MBBS, MD, DM (Cardiology)" icon={FileText} />
          </div>
        </div>
      )}

      {role === "admin" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Admin ID *" field="adminId" placeholder="ADM-2024-001" icon={Shield} />
          <InputField label="Government ID *" field="governmentId" placeholder="Aadhaar / PAN / Service ID" icon={FileText} />
          <InputField label="Designation *" field="designation" placeholder="Regional Transplant Coordinator" icon={BadgeCheck} />
          <InputField label="Authority Level *" field="authorityLevel" placeholder="State / National" />
          <div className="sm:col-span-2">
            <InputField label="Organization Name *" field="organizationName" placeholder="NOTTO / ROTTO / SOTTO" icon={Building2} />
          </div>
        </div>
      )}

      {role === "hospital_head" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Hospital Name *" field="hospitalName" placeholder="Fortis Hospital Mumbai" icon={Building2} />
          <InputField label="Hospital Registration No. *" field="hospitalRegNo" placeholder="HRN-MH-2024-789" icon={FileText} />
          <InputField label="NABH Accreditation No. *" field="nabhAccreditationNo" placeholder="NABH-H-2024-1234" icon={BadgeCheck} />
          <InputField label="Designation *" field="headDesignation" placeholder="Chief Medical Officer" icon={Crown} />
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Hospital Type *</Label>
            <select
              value={formData.hospitalType}
              onChange={(e) => update("hospitalType", e.target.value)}
              className="w-full h-11 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground focus:outline-none focus:border-primary"
              required
            >
              <option value="">Select type</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="trust">Trust / NGO</option>
              <option value="military">Military / Defence</option>
            </select>
          </div>
          <InputField label="Total Beds *" field="totalBeds" type="number" placeholder="500" />
          <div className="sm:col-span-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Hospital Address *</Label>
              <textarea
                placeholder="Complete hospital address"
                value={formData.hospitalAddress}
                onChange={(e) => update("hospitalAddress", e.target.value)}
                className="w-full h-20 rounded-lg bg-secondary border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                required
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Step 3: Password & Consent
  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" /> Account Security
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Password *</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={(e) => update("password", e.target.value)}
              className="h-11 bg-secondary border-border focus:border-primary pr-10"
              required
              minLength={8}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Confirm Password *</Label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="h-11 bg-secondary border-border focus:border-primary pr-10"
              required
              minLength={8}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
        <p className="text-destructive text-xs">Passwords do not match</p>
      )}

      <div className="glass rounded-xl p-4 space-y-3 mt-4">
        <h4 className="text-sm font-semibold text-foreground">Registration Summary</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div><span className="text-muted-foreground">Role:</span> <span className="text-foreground font-medium">{roles.find(r => r.id === role)?.label}</span></div>
          <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground font-medium">{formData.fullName || "—"}</span></div>
          <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground font-medium">{formData.email || "—"}</span></div>
          <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground font-medium">{formData.phone || "—"}</span></div>
          {role === "doctor" && (
            <>
              <div><span className="text-muted-foreground">License:</span> <span className="text-foreground font-medium">{formData.medicalLicenseNo || "—"}</span></div>
              <div><span className="text-muted-foreground">Specialization:</span> <span className="text-foreground font-medium">{formData.specialization || "—"}</span></div>
            </>
          )}
          {role === "admin" && (
            <>
              <div><span className="text-muted-foreground">Admin ID:</span> <span className="text-foreground font-medium">{formData.adminId || "—"}</span></div>
              <div><span className="text-muted-foreground">Organization:</span> <span className="text-foreground font-medium">{formData.organizationName || "—"}</span></div>
            </>
          )}
          {role === "hospital_head" && (
            <>
              <div><span className="text-muted-foreground">Hospital:</span> <span className="text-foreground font-medium">{formData.hospitalName || "—"}</span></div>
              <div><span className="text-muted-foreground">NABH No.:</span> <span className="text-foreground font-medium">{formData.nabhAccreditationNo || "—"}</span></div>
            </>
          )}
        </div>
      </div>

      <label className="flex items-start gap-3 mt-4 cursor-pointer">
        <input type="checkbox" required className="mt-1 accent-primary" />
        <span className="text-xs text-muted-foreground leading-relaxed">
          I certify that all information provided is accurate. I agree to the platform's Terms of Service,
          Privacy Policy, and understand that my credentials will be verified before account activation.
          Misrepresentation may lead to legal action under applicable medical regulations.
        </span>
      </label>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center glass rounded-2xl p-12 max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            className="w-20 h-20 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6"
          >
            <BadgeCheck className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Registration Submitted!</h2>
          <p className="text-muted-foreground text-sm mb-1">
            Your {roles.find(r => r.id === role)?.label} account is under verification.
          </p>
          <p className="text-muted-foreground text-xs">You'll be redirected to login shortly…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Branding Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-[420px] relative overflow-hidden items-center justify-center flex-shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(162 70% 45% / 0.15) 0%, transparent 50%)',
        }} />
        <div className="relative z-10 max-w-xs px-8 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
            Join Arogya <span className="text-gradient">AI</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Register as a verified medical professional to access organ transport coordination, real-time matching, and life-saving tools.
          </p>
          <div className="mt-10 space-y-3">
            {roles.map((r) => (
              <div key={r.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                role === r.id ? "glass border border-primary/30" : "opacity-50"
              }`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  role === r.id ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                }`}>
                  <r.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Form Panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex-1 flex items-start justify-center p-6 sm:p-8 overflow-y-auto"
      >
        <div className="w-full max-w-2xl py-4">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-3">
              <Heart className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-bold">
              Join Arogya <span className="text-gradient">AI</span>
            </h1>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Create Account</h2>
              <p className="text-muted-foreground text-sm">Step {step} of {totalSteps}</p>
            </div>
            <button onClick={() => navigate("/")} className="text-sm text-primary hover:underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step >= s ? "100%" : "0%" }}
                  className="h-full bg-gradient-primary rounded-full"
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>

          {/* Role Selector (Step 1 only) */}
          {step === 1 && (
            <div className="flex gap-2 mb-6">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => { setRole(r.id); setFormData(initialFormData); }}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                    role === r.id
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground border border-transparent hover:bg-secondary/80"
                  }`}
                >
                  <r.icon className="w-5 h-5" />
                  {r.label}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button type="button" variant="outline" className="flex-1 h-11" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button type="button" variant="glow" className="flex-1 h-11" onClick={() => setStep(step + 1)}>
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button type="submit" variant="glow" className="flex-1 h-11">
                  Submit Registration
                </Button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
