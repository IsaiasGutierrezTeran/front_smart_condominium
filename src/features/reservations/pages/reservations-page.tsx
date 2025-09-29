"use client"

import { useState } from "react"
import { Calendar, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReservationCalendar } from "../components/reservation-calendar"
import { ReservationForm } from "../components/reservation-form"
import { ReservationHistory } from "../components/reservation-history"
import { CommonAreaRules } from "../components/common-area-rules"

const commonAreas = [
  {
    id: "1",
    name: "Salón de Eventos",
    capacity: 50,
    hourlyRate: 25000,
    amenities: ["Cocina", "Sonido", "Proyector", "Aire Acondicionado"],
    image: "/elegant-event-hall.png",
    available: true,
  },
  {
    id: "2",
    name: "Piscina",
    capacity: 30,
    hourlyRate: 15000,
    amenities: ["Duchas", "Vestidores", "Sombrillas"],
    image: "/swimming-pool-area.jpg",
    available: true,
  },
  {
    id: "3",
    name: "Cancha de Tenis",
    capacity: 4,
    hourlyRate: 20000,
    amenities: ["Raquetas", "Pelotas", "Iluminación"],
    image: "/outdoor-tennis-court.png",
    available: false,
  },
  {
    id: "4",
    name: "Gimnasio",
    capacity: 15,
    hourlyRate: 12000,
    amenities: ["Equipos", "Aire Acondicionado", "Espejos"],
    image: "/modern-gym.png",
    available: true,
  },
]

export function ReservationsPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [showReservationForm, setShowReservationForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reservas de Áreas Comunes</h1>
          <p className="text-muted-foreground">Gestiona las reservas de espacios compartidos</p>
        </div>
        <Button onClick={() => setShowReservationForm(true)} className="bg-primary hover:bg-primary/90">
          <Calendar className="w-4 h-4 mr-2" />
          Nueva Reserva
        </Button>
      </div>

      <Tabs defaultValue="areas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="areas">Áreas Disponibles</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="history">Mis Reservas</TabsTrigger>
          <TabsTrigger value="rules">Reglamento</TabsTrigger>
        </TabsList>

        <TabsContent value="areas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonAreas.map((area) => (
              <Card key={area.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img src={area.image || "/placeholder.svg"} alt={area.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge variant={area.available ? "default" : "destructive"}>
                      {area.available ? "Disponible" : "No Disponible"}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {area.name}
                    <span className="text-sm font-normal text-muted-foreground">
                      ${area.hourlyRate.toLocaleString()}/hora
                    </span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Capacidad: {area.capacity} personas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Amenidades:</h4>
                      <div className="flex flex-wrap gap-1">
                        {area.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      disabled={!area.available}
                      onClick={() => {
                        setSelectedArea(area.id)
                        setShowReservationForm(true)
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Reservar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <ReservationCalendar />
        </TabsContent>

        <TabsContent value="history">
          <ReservationHistory />
        </TabsContent>

        <TabsContent value="rules">
          <CommonAreaRules />
        </TabsContent>
      </Tabs>

      {showReservationForm && (
        <ReservationForm
          selectedAreaId={selectedArea}
          onClose={() => {
            setShowReservationForm(false)
            setSelectedArea(null)
          }}
        />
      )}
    </div>
  )
}
