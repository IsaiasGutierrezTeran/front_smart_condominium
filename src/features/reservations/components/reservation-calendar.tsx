"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const mockReservations = [
  {
    id: "1",
    area: "Salón de Eventos",
    resident: "María González",
    unit: "Apt 301",
    date: "2024-01-15",
    time: "18:00 - 22:00",
    status: "confirmed",
  },
  {
    id: "2",
    area: "Piscina",
    resident: "Carlos Rodríguez",
    unit: "Apt 205",
    date: "2024-01-16",
    time: "14:00 - 17:00",
    status: "pending",
  },
  {
    id: "3",
    area: "Gimnasio",
    resident: "Ana Martínez",
    unit: "Apt 102",
    date: "2024-01-17",
    time: "07:00 - 09:00",
    status: "confirmed",
  },
]

export function ReservationCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReservationsForDate = (date: string) => {
    return mockReservations.filter((res) => res.date === date)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {emptyDays.map((day) => (
                <div key={`empty-${day}`} className="p-2 h-20"></div>
              ))}
              {days.map((day) => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const reservations = getReservationsForDate(dateStr)
                const isSelected = selectedDate?.getDate() === day

                return (
                  <div
                    key={day}
                    className={`p-1 h-20 border rounded cursor-pointer transition-colors ${
                      isSelected ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  >
                    <div className="text-sm font-medium">{day}</div>
                    <div className="space-y-1 mt-1">
                      {reservations.slice(0, 2).map((res) => (
                        <div key={res.id} className="text-xs p-1 rounded bg-primary/20 text-primary truncate">
                          {res.area}
                        </div>
                      ))}
                      {reservations.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{reservations.length - 2} más</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>{selectedDate ? formatDate(selectedDate) : "Selecciona una fecha"}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {getReservationsForDate(selectedDate.toISOString().split("T")[0]).map((reservation) => (
                  <div key={reservation.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{reservation.area}</h4>
                      <Badge variant={reservation.status === "confirmed" ? "default" : "secondary"}>
                        {reservation.status === "confirmed" ? "Confirmada" : "Pendiente"}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {reservation.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {reservation.resident} - {reservation.unit}
                      </div>
                    </div>
                  </div>
                ))}
                {getReservationsForDate(selectedDate.toISOString().split("T")[0]).length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No hay reservas para esta fecha</p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">Haz clic en una fecha para ver las reservas</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
