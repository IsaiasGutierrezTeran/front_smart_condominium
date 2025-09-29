"use client"

import { useState } from "react"
import { Users, Star, Phone, Mail, MapPin, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mockProviders = [
  {
    id: "PRV001",
    name: "ElectroServicios Ltda",
    category: "electrical",
    rating: 4.8,
    phone: "+57 300 123 4567",
    email: "contacto@electroservicios.com",
    address: "Calle 123 #45-67, Bogotá",
    specialties: ["Instalaciones eléctricas", "Reparaciones", "Mantenimiento"],
    activeContracts: 3,
    completedJobs: 45,
    averageResponseTime: "2 horas",
    hourlyRate: 50000,
    availability: "available",
    lastJob: "2024-01-14",
    avatar: "/placeholder.svg?key=provider1",
  },
  {
    id: "PRV002",
    name: "ClimaTotal S.A.S",
    category: "hvac",
    rating: 4.6,
    phone: "+57 301 234 5678",
    email: "info@climatotal.com",
    address: "Carrera 45 #67-89, Bogotá",
    specialties: ["Aire acondicionado", "Ventilación", "Refrigeración"],
    activeContracts: 2,
    completedJobs: 32,
    averageResponseTime: "4 horas",
    hourlyRate: 60000,
    availability: "busy",
    lastJob: "2024-01-13",
    avatar: "/placeholder.svg?key=provider2",
  },
  {
    id: "PRV003",
    name: "PlomeroExpress",
    category: "plumbing",
    rating: 4.9,
    phone: "+57 302 345 6789",
    email: "servicios@plomeroexpress.com",
    address: "Avenida 67 #89-12, Bogotá",
    specialties: ["Plomería residencial", "Destapado de tuberías", "Instalaciones"],
    activeContracts: 5,
    completedJobs: 78,
    averageResponseTime: "1 hora",
    hourlyRate: 45000,
    availability: "available",
    lastJob: "2024-01-15",
    avatar: "/placeholder.svg?key=provider3",
  },
  {
    id: "PRV004",
    name: "Cerrajería Express",
    category: "general",
    rating: 4.4,
    phone: "+57 303 456 7890",
    email: "contacto@cerrajeriaexpress.com",
    address: "Calle 89 #12-34, Bogotá",
    specialties: ["Cerrajería", "Seguridad", "Duplicado de llaves"],
    activeContracts: 1,
    completedJobs: 23,
    averageResponseTime: "3 horas",
    hourlyRate: 40000,
    availability: "available",
    lastJob: "2024-01-12",
    avatar: "/placeholder.svg?key=provider4",
  },
]

const availabilityColors = {
  available: "default",
  busy: "secondary",
  unavailable: "destructive",
} as const

const categoryIcons = {
  electrical: "⚡",
  hvac: "❄️",
  plumbing: "🔧",
  general: "🛠️",
}

export function ProviderManagement() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  const handleContactProvider = (providerId: string) => {
    console.log("Contacting provider:", providerId)
  }

  const handleAssignJob = (providerId: string) => {
    console.log("Assigning job to provider:", providerId)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Provider Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Proveedores</p>
                <p className="text-2xl font-bold">{mockProviders.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disponibles</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockProviders.filter((p) => p.availability === "available").length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contratos Activos</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockProviders.reduce((sum, p) => sum + p.activeContracts, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trabajos Completados</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockProviders.reduce((sum, p) => sum + p.completedJobs, 0)}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProviders.map((provider) => (
          <Card key={provider.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
                    <AvatarFallback>
                      {provider.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span>{categoryIcons[provider.category]}</span>
                      {provider.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">{renderStars(provider.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {provider.rating} ({provider.completedJobs} trabajos)
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={availabilityColors[provider.availability]}>
                  {provider.availability === "available"
                    ? "Disponible"
                    : provider.availability === "busy"
                      ? "Ocupado"
                      : "No Disponible"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{provider.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{provider.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span>{provider.address}</span>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {provider.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Contratos Activos:</p>
                    <p className="font-medium">{provider.activeContracts}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tiempo Respuesta:</p>
                    <p className="font-medium">{provider.averageResponseTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tarifa/Hora:</p>
                    <p className="font-medium">${provider.hourlyRate.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleContactProvider(provider.id)}>
                    <Phone className="w-4 h-4 mr-1" />
                    Contactar
                  </Button>

                  <Button
                    size="sm"
                    disabled={provider.availability !== "available"}
                    onClick={() => handleAssignJob(provider.id)}
                  >
                    Asignar Trabajo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
