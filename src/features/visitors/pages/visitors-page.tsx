"use client"

import { useState } from "react"
import { Users, QrCode, Package, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VisitorRegistration } from "../components/visitor-registration"
import { VisitorHistory } from "../components/visitor-history"
import { PackageManagement } from "../components/package-management"
import { QRCodeGenerator } from "../components/qr-code-generator"

export function VisitorsPage() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [showQRGenerator, setShowQRGenerator] = useState(false)

  const todayStats = {
    expectedVisitors: 12,
    checkedIn: 8,
    pendingPackages: 5,
    deliveredPackages: 23,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Visitantes</h1>
          <p className="text-muted-foreground">Control de acceso y paquetería</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowQRGenerator(true)} variant="outline">
            <QrCode className="w-4 h-4 mr-2" />
            Generar QR
          </Button>
          <Button onClick={() => setShowRegistration(true)}>
            <Users className="w-4 h-4 mr-2" />
            Registrar Visitante
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Visitantes Esperados</p>
                <p className="text-2xl font-bold text-blue-600">{todayStats.expectedVisitors}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ingresaron Hoy</p>
                <p className="text-2xl font-bold text-green-600">{todayStats.checkedIn}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paquetes Pendientes</p>
                <p className="text-2xl font-bold text-orange-600">{todayStats.pendingPackages}</p>
              </div>
              <Package className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paquetes Entregados</p>
                <p className="text-2xl font-bold text-purple-600">{todayStats.deliveredPackages}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visitors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visitors">Visitantes</TabsTrigger>
          <TabsTrigger value="packages">Paquetes</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="visitors">
          <VisitorHistory />
        </TabsContent>

        <TabsContent value="packages">
          <PackageManagement />
        </TabsContent>

        <TabsContent value="history">
          <VisitorHistory showAll={true} />
        </TabsContent>
      </Tabs>

      {showRegistration && <VisitorRegistration onClose={() => setShowRegistration(false)} />}

      {showQRGenerator && <QRCodeGenerator onClose={() => setShowQRGenerator(false)} />}
    </div>
  )
}
