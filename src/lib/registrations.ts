// Lightweight client-side store for pending professional registrations.
// In production this should be backed by Lovable Cloud (auth + DB + RLS).

export type RegRole = "doctor" | "admin" | "hospital_head";
export type RegStatus = "pending" | "approved" | "rejected";

export interface PendingRegistration {
  id: string;
  role: RegRole;
  status: RegStatus;
  submittedAt: string; // ISO
  data: Record<string, string>;
}

const KEY = "arogya_pending_registrations";
const EVENT = "arogya:registrations:changed";

function read(): PendingRegistration[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PendingRegistration[];
  } catch {
    return [];
  }
}

function write(items: PendingRegistration[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT));
}

export function listRegistrations(): PendingRegistration[] {
  return read().sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function countPending(): number {
  return read().filter((r) => r.status === "pending").length;
}

export function addRegistration(role: RegRole, data: Record<string, string>) {
  const items = read();
  const entry: PendingRegistration = {
    id: `REG-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    role,
    status: "pending",
    submittedAt: new Date().toISOString(),
    data,
  };
  items.push(entry);
  write(items);
  return entry;
}

export function setStatus(id: string, status: RegStatus) {
  const items = read().map((r) => (r.id === id ? { ...r, status } : r));
  write(items);
}

export function removeRegistration(id: string) {
  write(read().filter((r) => r.id !== id));
}

export function subscribe(cb: () => void) {
  const handler = () => cb();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
