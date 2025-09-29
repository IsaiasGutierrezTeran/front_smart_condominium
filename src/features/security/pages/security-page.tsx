"use client"

import { useState } from "react"
import { AlertTriangle, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecurityDashboard } from "../components/security-dashboard"
import { CameraMonitoring } from "../components/camera-monitoring"
import { SecurityAlerts } from "../components/security-alerts"
import { AccessControl } from "../components/access-control"

export function SecurityPage() {
  const [activeAlerts, setActiveAlerts] = useState(3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Seguridad</h1>
          <p className="text-muted-foreground">Monitoreo y control de seguridad del condominio</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={activeAlerts > 0 ? "destructive" : "default"} className="px-3 py-1">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {activeAlerts} Alertas Activas
          </Badge>
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Estado del Sistema
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Panel General</TabsTrigger>
          <TabsTrigger value="cameras">Cámaras</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="access">Control de Acceso</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <SecurityDashboard />
        </TabsContent>

        <TabsContent value="cameras">
          <CameraMonitoring />
        </TabsContent>

        <TabsContent value="alerts">
          <SecurityAlerts />
        </TabsContent>

        <TabsContent value="access">
          <AccessControl />
        </TabsContent>
      </Tabs>
    </div>
  )
}
