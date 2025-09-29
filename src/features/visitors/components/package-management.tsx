"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle, Clock, AlertCircle, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockPackages = [
  {
    id: "PKG001",
    recipient: "María González",
    unit: "Apt 301",
    sender: "Amazon",
    description: "Paquete mediano - Electrónicos",
    arrivalDate: "2024-01-15T10:30:00",
    deliveryDate: null,
    status: "pending",
    trackingNumber: "AMZ123456789",
    size: "medium",
    requiresSignature: true,
  },
  {
    id: "PKG002",
    recipient: "Carlos Rodríguez",
    unit: "Apt 205",
    sender: "MercadoLibre",
    description: "Sobre - Documentos",
    arrivalDate: "2024-01-15T14:20:00",
    deliveryDate: "2024-01-15T18:45:00",
    status: "delivered",
    trackingNumber: "ML987654321",
    size: "small",
    requiresSignature: false,
  },
  {
    id: "PKG003",
    recipient: "Ana Martínez",
    unit: "Apt 102",
    sender: "Falabella",
    description: "Paquete grande - Ropa",
    arrivalDate: "2024-01-14T16:15:00",
    deliveryDate: null,
    status: "pending",
    trackingNumber: "FAL456789123",
    size: "large",
    requiresSignature: true,
  },
  {
    id: "PKG004",
    recipient: "Luis Hernández",
    unit: "Apt 404",
    sender: "Rappi",
    description: "Comida - Pedido urgente",
    arrivalDate: "2024-01-15T19:30:00",
    deliveryDate: null,
    status: "urgent",
    trackingNumber: "RPP789123456",
    size: "small",
    requiresSignature: false,
  },
]

const statusColors = {
  pending: "default",
  delivered: "secondary",
  urgent: "destructive",
} as const

const sizeColors = {
  small: "outline",
  medium: "default",
  large: "secondary",
} as const

export function PackageManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const filteredPackages = mockPackages.filter((pkg) => {
    const matchesSearch =
      pkg.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDeliverPackage = (packageId: string) => {
    console.log("Delivering package:", packageId)
    // Update package status logic here
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES")
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por destinatario, unidad o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="urgent">Urgentes</SelectItem>
            <SelectItem value="delivered">Entregados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Package Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Hoy</p>
                <p className="text-2xl font-bold">{mockPackages.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockPackages.filter((p) => p.status === "pending").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Urgentes</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockPackages.filter((p) => p.status === "urgent").length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Entregados</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockPackages.filter((p) => p.status === "delivered").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Packages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusColors[pkg.status]}>
                      {pkg.status === "pending" ? "PENDIENTE" : pkg.status === "urgent" ? "URGENTE" : "ENTREGADO"}
                    </Badge>
                    <Badge variant={sizeColors[pkg.size]}>{pkg.size.toUpperCase()}</Badge>
                    {pkg.requiresSignature && <Badge variant="outline">FIRMA REQ.</Badge>}
                  </div>
                  <CardTitle className="text-lg">ID: {pkg.id}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </div>
                <Package className="w-6 h-6 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Destinatario:</p>
                    <p className="font-medium">{pkg.recipient}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Unidad:</p>
                    <p className="font-medium">{pkg.unit}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Remitente:</p>
                    <p className="font-medium">{pkg.sender}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tracking:</p>
                    <p className="font-medium text-xs">{pkg.trackingNumber}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">Llegada:</p>
                  <p className="font-medium">{formatDate(pkg.arrivalDate)}</p>
                </div>

                {pkg.deliveryDate && (
                  <div className="text-sm">
                    <p className="text-muted-foreground">Entregado:</p>
                    <p className="font-medium text-green-600">{formatDate(pkg.deliveryDate)}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Truck className="w-4 h-4 mr-1" />
                    Rastrear
                  </Button>

                  {pkg.status !== "delivered" && (
                    <Button size="sm" onClick={() => handleDeliverPackage(pkg.id)}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Entregar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay paquetes</h3>
            <p className="text-muted-foreground">No se encontraron paquetes con los filtros seleccionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
