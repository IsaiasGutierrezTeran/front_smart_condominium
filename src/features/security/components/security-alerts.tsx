"use client"

import { useState } from "react"
import { AlertTriangle, Shield, Clock, CheckCircle, Eye, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockAlerts = [
  {
    id: "1",
    type: "security",
    priority: "high",
    title: "Acceso no autorizado detectado",
    description: "Movimiento detectado en parqueadero fuera del horario permitido",
    location: "Parqueadero Nivel 1",
    timestamp: "2024-01-15T22:30:00",
    status: "active",
    assignedTo: "Guardia Nocturno",
    camera: "CAM-002",
  },
  {
    id: "2",
    type: "maintenance",
    priority: "medium",
    title: "Falla en sistema de iluminación",
    description: "Luces de emergencia no funcionan correctamente en escalera B",
    location: "Escalera B - Piso 5",
    timestamp: "2024-01-15T20:15:00",
    status: "in-progress",
    assignedTo: "Técnico Eléctrico",
    camera: null,
  },
  {
    id: "3",
    type: "fire",
    priority: "critical",
    title: "Alarma de humo activada",
    description: "Detector de humo activado en cocina del salón de eventos",
    location: "Salón de Eventos",
    timestamp: "2024-01-15T19:45:00",
    status: "resolved",
    assignedTo: "Bomberos",
    camera: "CAM-004",
  },
  {
    id: "4",
    type: "access",
    priority: "low",
    title: "Tarjeta de acceso bloqueada",
    description: "Múltiples intentos fallidos de acceso con tarjeta 1234",
    location: "Entrada Principal",
    timestamp: "2024-01-15T18:20:00",
    status: "active",
    assignedTo: "Administración",
    camera: "CAM-001",
  },
]

const priorityColors = {
  critical: "destructive",
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const

const statusColors = {
  active: "destructive",
  "in-progress": "default",
  resolved: "secondary",
} as const

export function SecurityAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (filterStatus !== "all" && alert.status !== filterStatus) return false
    if (filterPriority !== "all" && alert.priority !== filterPriority) return false
    return true
  })

  const handleResolveAlert = (alertId: string) => {
    console.log("Resolving alert:", alertId)
    // Update alert status logic here
  }

  const handleAssignAlert = (alertId: string, assignee: string) => {
    console.log("Assigning alert:", alertId, "to:", assignee)
    // Assignment logic here
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("es-ES")
  }

  return (
    <div className="space-y-6">
      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alertas Activas</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockAlerts.filter((a) => a.status === "active").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Progreso</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockAlerts.filter((a) => a.status === "in-progress").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resueltas Hoy</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockAlerts.filter((a) => a.status === "resolved").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Críticas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockAlerts.filter((a) => a.priority === "critical").length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Estados</SelectItem>
            <SelectItem value="active">Activas</SelectItem>
            <SelectItem value="in-progress">En Progreso</SelectItem>
            <SelectItem value="resolved">Resueltas</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las Prioridades</SelectItem>
            <SelectItem value="critical">Crítica</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Media</SelectItem>
            <SelectItem value="low">Baja</SelectItem>
          </SelectContent>
        </Select>

        <Input placeholder="Buscar alertas..." className="max-w-xs" />
      </div>

      {/* Alerts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityColors[alert.priority]}>{alert.priority.toUpperCase()}</Badge>
                    <Badge variant={statusColors[alert.status]}>
                      {alert.status === "active"
                        ? "ACTIVA"
                        : alert.status === "in-progress"
                          ? "EN PROGRESO"
                          : "RESUELTA"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{alert.title}</CardTitle>
                  <CardDescription>{alert.description}</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Ubicación:</p>
                    <p className="font-medium">{alert.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Asignado a:</p>
                    <p className="font-medium">{alert.assignedTo}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">Fecha y hora:</p>
                  <p className="font-medium">{formatTimestamp(alert.timestamp)}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {alert.camera && (
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Cámara
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Comentar
                    </Button>
                  </div>

                  {alert.status === "active" && (
                    <Button size="sm" onClick={() => handleResolveAlert(alert.id)}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Resolver
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay alertas</h3>
            <p className="text-muted-foreground">No se encontraron alertas con los filtros seleccionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
