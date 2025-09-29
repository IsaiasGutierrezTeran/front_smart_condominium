"use client"

import React, { useState } from "react"
import { X, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const reservationSchema = z.object({
  area: z.string().min(1, "Selecciona un área"),
  date: z.string().min(1, "Selecciona una fecha"),
  startTime: z.string().min(1, "Selecciona hora de inicio"),
  endTime: z.string().min(1, "Selecciona hora de fin"),
  guests: z.number().min(1, "Mínimo 1 invitado").max(100, "Máximo 100 invitados"),
  purpose: z.string().min(10, "Describe el propósito (mínimo 10 caracteres)"),
  paymentMethod: z.string().min(1, "Selecciona método de pago"),
  acceptTerms: z.boolean().refine((val) => val === true, "Debes aceptar los términos"),
})

type ReservationFormData = z.infer<typeof reservationSchema>

interface ReservationFormProps {
  selectedAreaId?: string | null
  onClose: () => void
}

const commonAreas = [
  { id: "1", name: "Salón de Eventos", rate: 25000 },
  { id: "2", name: "Piscina", rate: 15000 },
  { id: "3", name: "Cancha de Tenis", rate: 20000 },
  { id: "4", name: "Gimnasio", rate: 12000 },
]

export function ReservationForm({ selectedAreaId, onClose }: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [estimatedCost, setEstimatedCost] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      area: selectedAreaId || "",
      guests: 1,
      acceptTerms: false,
    },
  })

  const watchedArea = watch("area")
  const watchedStartTime = watch("startTime")
  const watchedEndTime = watch("endTime")

  React.useEffect(() => {
    if (watchedArea && watchedStartTime && watchedEndTime) {
      const area = commonAreas.find((a) => a.id === watchedArea)
      if (area) {
        const start = new Date(`2000-01-01T${watchedStartTime}`)
        const end = new Date(`2000-01-01T${watchedEndTime}`)
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
        setEstimatedCost(hours * area.rate)
      }
    }
  }, [watchedArea, watchedStartTime, watchedEndTime])

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Reservation submitted:", data)
      onClose()
    } catch (error) {
      console.error("Error submitting reservation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Nueva Reserva</CardTitle>
              <CardDescription>Completa el formulario para reservar un área común</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area">Área Común *</Label>
                <Select value={watchedArea} onValueChange={(value) => setValue("area", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un área" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonAreas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.name} - ${area.rate.toLocaleString()}/hora
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.area && <p className="text-sm text-destructive">{errors.area.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input id="date" type="date" min={new Date().toISOString().split("T")[0]} {...register("date")} />
                {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Hora de Inicio *</Label>
                <Input id="startTime" type="time" {...register("startTime")} />
                {errors.startTime && <p className="text-sm text-destructive">{errors.startTime.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Hora de Fin *</Label>
                <Input id="endTime" type="time" {...register("endTime")} />
                {errors.endTime && <p className="text-sm text-destructive">{errors.endTime.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">Número de Invitados *</Label>
              <Input id="guests" type="number" min="1" max="100" {...register("guests", { valueAsNumber: true })} />
              {errors.guests && <p className="text-sm text-destructive">{errors.guests.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Propósito de la Reserva *</Label>
              <Textarea id="purpose" placeholder="Describe el evento o actividad..." {...register("purpose")} />
              {errors.purpose && <p className="text-sm text-destructive">{errors.purpose.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pago *</Label>
              <Select onValueChange={(value) => setValue("paymentMethod", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Tarjeta de Crédito/Débito</SelectItem>
                  <SelectItem value="transfer">Transferencia Bancaria</SelectItem>
                  <SelectItem value="cash">Efectivo (Administración)</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentMethod && <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>}
            </div>

            {estimatedCost > 0 && (
              <Alert>
                <CreditCard className="h-4 w-4" />
                <AlertDescription>
                  <strong>Costo estimado: ${estimatedCost.toLocaleString()}</strong>
                  <br />
                  Este monto será cobrado una vez confirmada la reserva.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={watch("acceptTerms")}
                onCheckedChange={(checked) => setValue("acceptTerms", checked as boolean)}
              />
              <Label htmlFor="acceptTerms" className="text-sm">
                Acepto los términos y condiciones del reglamento de áreas comunes *
              </Label>
            </div>
            {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>}

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
