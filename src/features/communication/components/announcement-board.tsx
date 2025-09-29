"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Megaphone, Plus, Clock, AlertTriangle, Info, CheckCircle, Eye, Edit, Trash2, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/features/auth/components/auth-provider"
import { RoleGuard } from "@/features/auth/components/role-guard"
import { useToast } from "@/hooks/use-toast"
import { formatDate, formatTime } from "@/lib/utils"
import { cn } from "@/lib/utils"

const announcementSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  content: z.string().min(1, "Content is required").max(1000, "Content must be less than 1000 characters"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.string().min(1, "Category is required"),
  expiresAt: z.string().optional(),
})

type AnnouncementFormData = z.infer<typeof announcementSchema>

interface Announcement {
  id: string
  title: string
  content: string
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  author: {
    id: string
    name: string
    avatar?: string
    role: string
  }
  createdAt: Date
  expiresAt?: Date
  isPinned: boolean
  views: number
}

export function AnnouncementBoard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Pool Maintenance Complete",
      content:
        "The pool maintenance has been successfully completed. All systems are operational and the pool is now open for use. Please remember to follow the pool rules and regulations. Thank you for your patience during the maintenance period.",
      priority: "medium",
      category: "Maintenance",
      author: {
        id: "admin1",
        name: "Building Management",
        avatar: "/placeholder.svg?key=admin",
        role: "admin",
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: true,
      views: 45,
    },
    {
      id: "2",
      title: "Emergency Contact Information Update",
      content:
        "Please update your emergency contact information in the resident portal. This is crucial for building safety and emergency procedures. Contact the management office if you need assistance.",
      priority: "urgent",
      category: "Safety",
      author: {
        id: "admin1",
        name: "Building Management",
        avatar: "/placeholder.svg?key=admin",
        role: "admin",
      },
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isPinned: false,
      views: 23,
    },
    {
      id: "3",
      title: "Community BBQ Event - This Saturday",
      content:
        "Join us for our monthly community BBQ this Saturday from 12 PM to 4 PM at the rooftop terrace. Food and drinks will be provided. Please RSVP by Thursday. Looking forward to seeing everyone there!",
      priority: "low",
      category: "Events",
      author: {
        id: "admin1",
        name: "Building Management",
        avatar: "/placeholder.svg?key=admin",
        role: "admin",
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      isPinned: false,
      views: 67,
    },
  ])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
  })

  const onSubmit = (data: AnnouncementFormData) => {
    if (!user) return

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      priority: data.priority,
      category: data.category,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
      createdAt: new Date(),
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      isPinned: false,
      views: 0,
    }

    setAnnouncements([newAnnouncement, ...announcements])
    reset()
    setIsCreateDialogOpen(false)
    toast({
      title: "Announcement Created",
      description: "Your announcement has been posted to the community board.",
    })
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "medium":
        return <Info className="h-4 w-4 text-blue-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Megaphone className="h-6 w-6" />
            Community Announcements
          </h2>
          <p className="text-muted-foreground">Important updates and information from building management</p>
        </div>
        <RoleGuard allowedRoles={["admin"]}>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>Share important information with the community</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Announcement title"
                      {...register("title")}
                      className={cn(errors.title && "border-destructive")}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setValue("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                        <SelectItem value="Events">Events</SelectItem>
                        <SelectItem value="Policy">Policy</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select onValueChange={(value) => setValue("priority", value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.priority && <p className="text-sm text-destructive">{errors.priority.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiresAt">Expires At (Optional)</Label>
                    <Input id="expiresAt" type="datetime-local" {...register("expiresAt")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Announcement content..."
                    rows={6}
                    {...register("content")}
                    className={cn(errors.content && "border-destructive")}
                  />
                  {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Announcement</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </RoleGuard>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={cn("relative", announcement.isPinned && "border-primary")}>
            {announcement.isPinned && (
              <div className="absolute top-4 right-4">
                <Pin className="h-4 w-4 text-primary" />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(announcement.priority)}
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={getPriorityColor(announcement.priority)}>
                      {announcement.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{announcement.category}</Badge>
                    {announcement.expiresAt && (
                      <Badge variant="outline" className="text-orange-600">
                        <Clock className="h-3 w-3 mr-1" />
                        Expires {formatDate(announcement.expiresAt)}
                      </Badge>
                    )}
                  </div>
                </div>
                <RoleGuard allowedRoles={["admin"]}>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </RoleGuard>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{announcement.content}</p>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={announcement.author.avatar || "/placeholder.svg"}
                        alt={announcement.author.name}
                      />
                      <AvatarFallback className="text-xs">
                        {announcement.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{announcement.author.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(announcement.createdAt)} • {formatTime(announcement.createdAt)}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {announcement.views}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
