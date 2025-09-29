"use client"

import { useState } from "react"
import { Camera, Play, Pause, RotateCcw, Maximize, AlertCircle, Wifi, WifiOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockCameras = [
  {
    id: "1",
    name: "Entrada Principal",
    location: "Lobby",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastActivity: "2 min ago",
    image: "/security-camera-entrance-view.jpg",
  },
  {
    id: "2",
    name: "Parqueadero Nivel 1",
    location: "Sótano 1",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastActivity: "5 min ago",
    image: "/parking-garage-security-camera.jpg",
  },
  {
    id: "3",
    name: "Piscina",
    location: "Área Social",
    status: "offline",
    recording: false,
    aiEnabled: false,
    lastActivity: "1 hour ago",
    image: "/pool-area-security-camera.jpg",
  },
  {
    id: "4",
    name: "Salón de Eventos",
    location: "Piso 2",
    status: "online",
    recording: false,
    aiEnabled: true,
    lastActivity: "30 min ago",
    image: "/event-hall-security-camera.jpg",
  },
  {
    id: "5",
    name: "Gimnasio",
    location: "Piso 3",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastActivity: "1 min ago",
    image: "/gym-security-camera.jpg",
  },
  {
    id: "6",
    name: "Terraza",
    location: "Piso 10",
    status: "online",
    recording: true,
    aiEnabled: false,
    lastActivity: "15 min ago",
    image: "/terrace-security-camera.jpg",
  },
]

const aiDetections = [
  { camera: "1", type: "person", confidence: 95, time: "14:32" },
  { camera: "2", type: "vehicle", confidence: 88, time: "14:28" },
  { camera: "4", type: "motion", confidence: 76, time: "14:15" },
  { camera: "5", type: "person", confidence: 92, time: "14:10" },
]

export function CameraMonitoring() {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "single">("grid")
  const [isRecording, setIsRecording] = useState(false)

  const onlineCameras = mockCameras.filter((cam) => cam.status === "online").length
  const recordingCameras = mockCameras.filter((cam) => cam.recording).length

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cámaras Online</p>
                <p className="text-2xl font-bold text-green-600">{onlineCameras}</p>
              </div>
              <Wifi className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Grabando</p>
                <p className="text-2xl font-bold text-blue-600">{recordingCameras}</p>
              </div>
              <Camera className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">IA Activa</p>
                <p className="text-2xl font-bold text-purple-600">4</p>
              </div>
              <AlertCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Detecciones Hoy</p>
                <p className="text-2xl font-bold text-orange-600">23</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={(value: "grid" | "single") => setViewMode(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Vista en Cuadrícula</SelectItem>
              <SelectItem value="single">Vista Individual</SelectItem>
            </SelectContent>
          </Select>

          {viewMode === "single" && (
            <Select value={selectedCamera || ""} onValueChange={setSelectedCamera}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Seleccionar cámara" />
              </SelectTrigger>
              <SelectContent>
                {mockCameras.map((camera) => (
                  <SelectItem key={camera.id} value={camera.id}>
                    {camera.name} - {camera.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button variant="outline" size="sm">
            <Maximize className="w-4 h-4 mr-2" />
            Pantalla Completa
          </Button>
        </div>
      </div>

      {/* Camera Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCameras.map((camera) => (
            <Card key={camera.id} className="overflow-hidden">
              <div className="relative aspect-video bg-black">
                <img
                  src={camera.image || "/placeholder.svg"}
                  alt={camera.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge variant={camera.status === "online" ? "default" : "destructive"}>
                    {camera.status === "online" ? (
                      <Wifi className="w-3 h-3 mr-1" />
                    ) : (
                      <WifiOff className="w-3 h-3 mr-1" />
                    )}
                    {camera.status}
                  </Badge>
                  {camera.recording && (
                    <Badge variant="destructive" className="animate-pulse">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
                      REC
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-2 left-2">
                  <p className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">{camera.name}</p>
                </div>
                {camera.aiEnabled && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      IA
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{camera.location}</span>
                  <span className="text-muted-foreground">Última actividad: {camera.lastActivity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        selectedCamera && (
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black">
              <img
                src={mockCameras.find((c) => c.id === selectedCamera)?.image || "/placeholder.svg"}
                alt="Camera view"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Pause className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-white text-sm bg-black/50 px-3 py-1 rounded">
                  {mockCameras.find((c) => c.id === selectedCamera)?.name}
                </div>
              </div>
            </div>
          </Card>
        )
      )}

      {/* AI Detections */}
      <Card>
        <CardHeader>
          <CardTitle>Detecciones de IA Recientes</CardTitle>
          <CardDescription>Eventos detectados automáticamente por el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiDetections.map((detection, index) => {
              const camera = mockCameras.find((c) => c.id === detection.camera)
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">{camera?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Detectado: {detection.type} (Confianza: {detection.confidence}%)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{detection.time}</p>
                    <Button variant="outline" size="sm">
                      Ver Grabación
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
