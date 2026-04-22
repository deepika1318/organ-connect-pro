import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Shield, Activity, Eye, EyeOff, UserPlus } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"doctor" | "admin" | "hospital_head">("doctor");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login — navigate to dashboard
    navigate("/dashboard");
  };

  const roles = [
    { id: "doctor" as const, label: "Doctor", icon: Activity },
    { id: "hospital_head" as const, label: "Hospital Head", icon: Heart },
    { id: "admin" as const, label: "Admin", icon: Shield },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(162 70% 45% / 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(180 60% 40% / 0.1) 0%, transparent 40%)',
        }} />
        <div className="relative z-10 max-w-md px-8 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Heart className="w-12 h-12 text-primary-foreground" />
            </div>
          </motion.div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
            Arogya <span className="text-gradient">AI</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Saving lives through intelligent organ transport coordination. Connecting hospitals, doctors, and patients in real-time.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { num: "500+", label: "Hospitals" },
              { num: "2,000+", label: "Transports" },
              { num: "99.8%", label: "Success Rate" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4">
                <div className="font-heading text-2xl font-bold text-gradient">{stat.num}</div>
                <div className="text-muted-foreground text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold">
              Arogya <span className="text-gradient">AI</span>
            </h1>
          </div>

          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to manage organ transport requests</p>

          {/* Role Selector */}
          <div className="flex gap-2 mb-6">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  role === r.id
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground border border-transparent hover:bg-secondary/80"
                }`}
              >
                <r.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-secondary border-border focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-secondary border-border focus:border-primary pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="glow" className="w-full h-12 text-base">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-3 text-muted-foreground">New to Arogya AI?</span>
            </div>
          </div>

          {/* Register CTA */}
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/register")}
            className="w-full h-12 text-base border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Register as Doctor / Hospital Head / Admin
          </Button>

          <p className="text-center text-muted-foreground text-xs mt-4 leading-relaxed">
            Professional registrations are reviewed and verified by an admin before access is granted.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
