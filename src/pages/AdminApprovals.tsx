import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  BadgeCheck, Shield, Stethoscope, Crown, Check, X, Mail, Phone,
  Building2, FileText, Clock, Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  listRegistrations,
  setStatus,
  subscribe,
  type PendingRegistration,
  type RegRole,
} from "@/lib/registrations";

const roleMeta: Record<RegRole, { label: string; icon: React.ElementType; color: string }> = {
  doctor: { label: "Doctor", icon: Stethoscope, color: "text-primary" },
  hospital_head: { label: "Hospital Head", icon: Crown, color: "text-amber-400" },
  admin: { label: "Admin", icon: Shield, color: "text-cyan-400" },
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  approved: "bg-primary/15 text-primary border-primary/30",
  rejected: "bg-destructive/15 text-destructive border-destructive/30",
};

const AdminApprovals = () => {
  const [items, setItems] = useState<PendingRegistration[]>(listRegistrations());
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [selected, setSelected] = useState<PendingRegistration | null>(null);

  useEffect(() => subscribe(() => setItems(listRegistrations())), []);

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);
  const counts = {
    pending: items.filter((i) => i.status === "pending").length,
    approved: items.filter((i) => i.status === "approved").length,
    rejected: items.filter((i) => i.status === "rejected").length,
    all: items.length,
  };

  const approve = (id: string) => {
    setStatus(id, "approved");
    toast.success("Professional approved", { description: "User can now sign in to the platform." });
    setSelected(null);
  };
  const reject = (id: string) => {
    setStatus(id, "rejected");
    toast.error("Application rejected");
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Professional Approvals</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Review and verify doctors, hospital heads, and admins requesting access.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-secondary text-muted-foreground border border-transparent hover:bg-secondary/80"
              }`}
            >
              {f} <span className="ml-1 opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">No {filter !== "all" ? filter : ""} requests</h3>
          <p className="text-muted-foreground text-sm">
            New professional registrations will appear here for your review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map((r) => {
              const meta = roleMeta[r.role];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelected(r)}
                  className="glass rounded-2xl p-5 cursor-pointer hover:border-primary/30 transition-all border border-transparent"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${meta.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{r.data.fullName || "Unnamed"}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusStyles[r.status]}`}>
                          {r.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {meta.label}
                        {r.role === "doctor" && r.data.specialization && ` · ${r.data.specialization}`}
                        {r.role === "hospital_head" && r.data.hospitalName && ` · ${r.data.hospitalName}`}
                        {r.role === "admin" && r.data.organizationName && ` · ${r.data.organizationName}`}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{r.data.email || "—"}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />
                          {new Date(r.submittedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {r.status === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="glow" className="flex-1"
                        onClick={(e) => { e.stopPropagation(); approve(r.id); }}>
                        <Check className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1"
                        onClick={(e) => { e.stopPropagation(); reject(r.id); }}>
                        <X className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{selected.data.fullName}</h3>
                    <p className="text-xs text-muted-foreground">{roleMeta[selected.role].label} · {selected.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(selected.data)
                  .filter(([k, v]) => v && !["password", "confirmPassword"].includes(k))
                  .map(([k, v]) => (
                    <div key={k} className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground capitalize mb-0.5">
                        {k.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="text-foreground font-medium break-words">{v}</div>
                    </div>
                  ))}
              </div>

              {selected.status === "pending" && (
                <div className="flex gap-3 mt-6">
                  <Button variant="glow" className="flex-1" onClick={() => approve(selected.id)}>
                    <Check className="w-4 h-4 mr-1" /> Approve Application
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => reject(selected.id)}>
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminApprovals;
