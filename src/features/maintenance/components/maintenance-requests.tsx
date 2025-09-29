"use client"

import { useState } from "react"
import { Wrench, CheckCircle, User, MapPin, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const mockRequests = [
  {
    id: "MNT001",
    title: "Fuga de agua en baño",
    description: "Hay una fuga constante en el grifo del baño principal",
    category: "plumbing",
    priority: "high",
    status: "open",
    location: "Apt 301 - Baño Principal",
    requestedBy: "María González",
    requestDate: "2024-01-15T09:30:00",
    assignedTo: null,
    estimatedCost: 150000,
    images: ["/placeholder.svg?key=plumbing1"],
  },
  {
    id: "MNT002",
    title: "Problema eléctrico en cocina",
    description: "Los tomacorrientes de la cocina no funcionan",
    category: "electrical",
    priority: "critical",
    status: "in-progress",
    location: "Apt 205 - Cocina",
    requestedBy: "Carlos Rodríguez",
    requestDate: "2024-01-14T16:20:00",
    assignedTo: "ElectroServicios Ltda",
    estimatedCost: 300000,
    images: ["/placeholder.svg?key=electrical1"],
  },
  {
    id: "MNT003",
    title: "Mantenimiento aire acondicionado",
    description: "Limpieza y revisión general del sistema de A/C",
    category: "hvac",
    priority: "medium",
    status: "scheduled",
    location: "Apt 102 - Sala Principal",
    requestedBy: "Ana Martínez",
    requestDate: "2024-01-13T11:15:00",
    assignedTo: "ClimaTotal S.A.S",
    estimatedCost: 200000,
    images: [],
  },
  {
    id: "MNT004",
    title: "Reparación puerta principal",
    description: "La cerradura de la puerta principal está dañada",
    category: "general",
    priority: "medium",
    status: "completed",
    location: "Apt 404 - Entrada",
    requestedBy: "Luis Hernández",
    requestDate: "2024-01-12T14:45:00",
    assignedTo: "Cerrajería Express",
    estimatedCost: 80000,
    images: ["/placeholder.svg?key=door1"],
  },
]

const priorityColors = {
  critical: "destructive",
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const

const statusColors = {
  open: "destructive",
  "in-progress": "default",
  scheduled: "secondary",
  completed: "outline",
} as const

const categoryIcons = {
  plumbing: "🔧",
  electrical: "⚡",
  hvac: "❄️",
  general: "🛠️",
}

export function MaintenanceRequests() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRequests = mockRequests.filter((request) => {
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  const handleAssignProvider = (requestId: string) => {
    console.log("Assigning provider to request:", requestId)
  }

  const handleUpdateStatus = (requestId: string, newStatus: string) => {
    console.log("Updating request status:", requestId, newStatus)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES")
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar solicitudes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Estados</SelectItem>
            <SelectItem value="open">Abiertas</SelectItem>
            <SelectItem value="in-progress">En Progreso</SelectItem>
            <SelectItem value="scheduled">Programadas</SelectItem>
            <SelectItem value="completed">Completadas</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
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
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityColors[request.priority]}>{request.priority.toUpperCase()}</Badge>
                    <Badge variant={statusColors[request.status]}>
                      {request.status === "open"
                        ? "ABIERTA"
                        : request.status === "in-progress"
                          ? "EN PROGRESO"
                          : request.status === "scheduled"
                            ? "PROGRAMADA"
                            : "COMPLETADA"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span>{categoryIcons[request.category]}</span>
                    {request.title}
                  </CardTitle>
                  <CardDescription>{request.description}</CardDescription>
                </div>
                <span className="text-sm font-mono text-muted-foreground">{request.id}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Ubicación:</p>
                      <p className="font-medium">{request.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Solicitado por:</p>
                      <p className="font-medium">{request.requestedBy}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Fecha:</p>
                      <p className="font-medium">{formatDate(request.requestDate)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Costo estimado:</p>
                    <p className="font-medium text-green-600">${request.estimatedCost.toLocaleString()}</p>
                  </div>
                </div>

                {request.assignedTo && (
                  <div className="text-sm">
                    <p className="text-muted-foreground">Asignado a:</p>
                    <p className="font-medium">{request.assignedTo}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {request.images.length > 0 && (
                      <Button variant="outline" size="sm">
                        Ver Fotos ({request.images.length})
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {!request.assignedTo && request.status === "open" && (
                      <Button size="sm" onClick={() => handleAssignProvider(request.id)}>
                        Asignar Proveedor
                      </Button>
                    )}
                    {request.status === "in-progress" && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(request.id, "completed")}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay solicitudes</h3>
            <p className="text-muted-foreground">No se encontraron solicitudes con los filtros seleccionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
