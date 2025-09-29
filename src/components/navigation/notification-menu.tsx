"use client"

import { Bell, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useAppStore } from "@/store/app-store"
import { useNavigate } from "react-router-dom"
import { formatTime } from "@/lib/utils"
import { cn } from "@/lib/utils"

export function NotificationMenu() {
  const navigate = useNavigate()
  const { notifications, markNotificationAsRead, removeNotification } = useAppStore()

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅"
      case "warning":
        return "⚠️"
      case "error":
        return "❌"
      default:
        return "ℹ️"
    }
  }

  const handleNotificationClick = (notification: any) => {
    markNotificationAsRead(notification.id)
    if (notification.actionUrl) {
      navigate(notification.actionUrl)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount} new</Badge>}
        </div>
        <Separator />

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notifications</p>
          </div>
        ) : (
          <ScrollArea className="max-h-96">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors",
                    !notification.read && "bg-primary/5",
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="text-lg flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-none">{notification.title}</p>
                      <div className="flex items-center gap-1">
                        {notification.actionUrl && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(notification.createdAt)}</p>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate("/notifications")}>
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
