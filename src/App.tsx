import { Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/features/auth/components/auth-provider"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { LoginPage } from "@/features/auth/pages/login-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { FinancesPage } from "@/features/finances/pages/finances-page"
import { CommunicationPage } from "@/features/communication/pages/communication-page"
import { ReservationsPage } from "@/features/reservations/pages/reservations-page"
import { SecurityPage } from "@/features/security/pages/security-page"
import { IncidentsPage } from "@/features/incidents/pages/incidents-page"
import { VisitorsPage } from "@/features/visitors/pages/visitors-page"
import { MaintenancePage } from "@/features/maintenance/pages/maintenance-page"
import { ResidentsPage } from "@/features/residents/pages/residents-page"
import { AmenitiesPage } from "@/features/amenities/pages/amenities-page"
import { DocumentsPage } from "@/features/documents/pages/documents-page"
import { NotificationsPage } from "@/features/notifications/pages/notifications-page"
import { ProfilePage } from "@/features/profile/pages/profile-page"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="smart-condominium-theme">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="finances" element={<FinancesPage />} />
            <Route path="communication" element={<CommunicationPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="incidents" element={<IncidentsPage />} />
            <Route path="visitors" element={<VisitorsPage />} />
            <Route path="maintenance" element={<MaintenancePage />} />
            <Route path="residents" element={<ResidentsPage />} />
            <Route path="amenities" element={<AmenitiesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
