"use client"

import { useState } from "react"
import { Plus, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaintenanceRequests } from "../components/maintenance-requests"
import { MaintenanceForm } from "../components/maintenance-form"
import { ProviderManagement } from "../components/provider-management"
import { MaintenanceHistory } from "../components/maintenance-history"

export function MaintenancePage() {
  const [showRequestForm, setShowRequestForm] = useState(false)

  const maintenanceStats = {
    openRequests: 8,
    inProgress: 3,
    completedToday: 5,
    activeProviders: 12,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mantenimiento</h1>
          <p className="text-muted-foreground">Gestión de solicitudes y proveedores</p>
        </div>
        <Button onClick={() => setShowRequestForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Solicitudes Abiertas</p>
                <p className="text-2xl font-bold text-orange-600">{maintenanceStats.openRequests}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Progreso</p>
                <p className="text-2xl font-bold text-blue-600">{maintenanceStats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completadas Hoy</p>
                <p className="text-2xl font-bold text-green-600">{maintenanceStats.completedToday}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Proveedores Activos</p>
                <p className="text-2xl font-bold text-purple-600">{maintenanceStats.activeProviders}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests">Solicitudes</TabsTrigger>
          <TabsTrigger value="providers">Proveedores</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <MaintenanceRequests />
        </TabsContent>

        <TabsContent value="providers">
          <ProviderManagement />
        </TabsContent>

        <TabsContent value="history">
          <MaintenanceHistory />
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Mantenimiento</CardTitle>
              <CardDescription>Análisis y estadísticas de mantenimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Reportes en desarrollo...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showRequestForm && <MaintenanceForm onClose={() => setShowRequestForm(false)} />}
    </div>
  )
}
