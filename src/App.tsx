import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import RequestOrgan from "./pages/RequestOrgan";
import DonorRegistration from "./pages/DonorRegistration";
import Alerts from "./pages/Alerts";
import Transport from "./pages/Transport";
import OrganTypes from "./pages/OrganTypes";
import BloodBank from "./pages/BloodBank";
import Analytics from "./pages/Analytics";
import MatchLog from "./pages/MatchLog";
import HospitalNetwork from "./pages/HospitalNetwork";
import ActivityTimeline from "./pages/ActivityTimeline";
import AdminApprovals from "./pages/AdminApprovals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="request" element={<RequestOrgan />} />
            <Route path="donor" element={<DonorRegistration />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="transport" element={<Transport />} />
            <Route path="organs" element={<OrganTypes />} />
            <Route path="blood" element={<BloodBank />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="matches" element={<MatchLog />} />
            <Route path="hospitals" element={<HospitalNetwork />} />
            <Route path="timeline" element={<ActivityTimeline />} />
            <Route path="approvals" element={<AdminApprovals />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
