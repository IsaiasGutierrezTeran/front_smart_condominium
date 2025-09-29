"use client"

import { useState } from "react"
import { X, QrCode, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const visitorSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  idNumber: z.string().min(6, "Número de identificación requerido"),
  phone: z.string().min(10, "Teléfono debe tener al menos 10 dígitos"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  visitDate: z.string().min(1, "Fecha de visita requerida"),
  visitTime: z.string().min(1, "Hora de visita requerida"),
  duration: z.string().min(1, "Duración estimada requerida"),
  purpose: z.string().min(10, "Propósito debe tener al menos 10 caracteres"),
  vehiclePlate: z.string().optional(),
  parkingRequired: z.boolean(),
  sendNotification: z.boolean(),
})

type VisitorFormData = z.infer<typeof visitorSchema>

interface VisitorRegistrationProps {
  onClose: () => void
}

export function VisitorRegistration({ onClose }: VisitorRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generatedQR, setGeneratedQR] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      parkingRequired: false,
      sendNotification: true,
      visitDate: new Date().toISOString().split("T")[0],
    },
  })

  const parkingRequired = watch("parkingRequired")

  const onSubmit = async (data: VisitorFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate QR code data
      const qrData = {
        visitorId: Math.random().toString(36).substr(2, 9),
        name: data.name,
        date: data.visitDate,
        time: data.visitTime,
        unit: "Apt 301", // This would come from auth context
      }

      setGeneratedQR(JSON.stringify(qrData))
      console.log("Visitor registered:", data)
    } catch (error) {
      console.error("Error registering visitor:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (generatedQR) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-center">Visitante Registrado</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="w-48 h-48 mx-auto bg-white border-2 border-dashed border-gray-300 flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
            <p className="text-sm text-muted-foreground">
              Código QR generado exitosamente. El visitante puede usar este código para ingresar.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Send className="w-4 h-4 mr-2" />
                Enviar por SMS
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Send className="w-4 h-4 mr-2" />
                Enviar por Email
              </Button>
            </div>
            <Button onClick={onClose} className="w-full">
              Cerrar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registrar Visitante</CardTitle>
              <CardDescription>Complete la información del visitante</CardDescription>
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
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input id="name" placeholder="Ej: Juan Pérez" {...register("name")} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">Número de Identificación *</Label>
                <Input id="idNumber" placeholder="Ej: 12345678" {...register("idNumber")} />
                {errors.idNumber && <p className="text-sm text-destructive">{errors.idNumber.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input id="phone" placeholder="Ej: 3001234567" {...register("phone")} />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Opcional)</Label>
                <Input id="email" type="email" placeholder="Ej: juan@email.com" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitDate">Fecha de Visita *</Label>
                <Input
                  id="visitDate"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("visitDate")}
                />
                {errors.visitDate && <p className="text-sm text-destructive">{errors.visitDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitTime">Hora de Visita *</Label>
                <Input id="visitTime" type="time" {...register("visitTime")} />
                {errors.visitTime && <p className="text-sm text-destructive">{errors.visitTime.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración Estimada *</Label>
                <Select onValueChange={(value) => setValue("duration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hora</SelectItem>
                    <SelectItem value="2h">2 horas</SelectItem>
                    <SelectItem value="4h">4 horas</SelectItem>
                    <SelectItem value="8h">Todo el día</SelectItem>
                  </SelectContent>
                </Select>
                {errors.duration && <p className="text-sm text-destructive">{errors.duration.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Propósito de la Visita *</Label>
              <Textarea id="purpose" placeholder="Describe el motivo de la visita..." {...register("purpose")} />
              {errors.purpose && <p className="text-sm text-destructive">{errors.purpose.message}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="parkingRequired"
                  checked={parkingRequired}
                  onCheckedChange={(checked) => setValue("parkingRequired", checked as boolean)}
                />
                <Label htmlFor="parkingRequired">Requiere parqueadero</Label>
              </div>

              {parkingRequired && (
                <div className="space-y-2">
                  <Label htmlFor="vehiclePlate">Placa del Vehículo</Label>
                  <Input id="vehiclePlate" placeholder="Ej: ABC123" {...register("vehiclePlate")} />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendNotification"
                  checked={watch("sendNotification")}
                  onCheckedChange={(checked) => setValue("sendNotification", checked as boolean)}
                />
                <Label htmlFor="sendNotification">Enviar notificación al residente</Label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Registrando..." : "Registrar Visitante"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
