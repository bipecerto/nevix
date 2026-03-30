import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./components/app/AppLayout.tsx";
import DashboardPage from "./pages/app/DashboardPage.tsx";
import ConversationsPage from "./pages/app/ConversationsPage.tsx";
import ContactsPage from "./pages/app/ContactsPage.tsx";
import TagsPage from "./pages/app/TagsPage.tsx";
import QuickRepliesPage from "./pages/app/QuickRepliesPage.tsx";
import RemindersPage from "./pages/app/RemindersPage.tsx";
import TeamPage from "./pages/app/TeamPage.tsx";
import ReportsPage from "./pages/app/ReportsPage.tsx";
import SettingsPage from "./pages/app/SettingsPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="conversas" element={<ConversationsPage />} />
            <Route path="contatos" element={<ContactsPage />} />
            <Route path="etiquetas" element={<TagsPage />} />
            <Route path="respostas" element={<QuickRepliesPage />} />
            <Route path="lembretes" element={<RemindersPage />} />
            <Route path="equipe" element={<TeamPage />} />
            <Route path="relatorios" element={<ReportsPage />} />
            <Route path="config" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
