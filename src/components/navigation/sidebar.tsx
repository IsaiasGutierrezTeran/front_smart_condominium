"use client"

import type React from "react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  DollarSign,
  MessageSquare,
  Calendar,
  Shield,
  AlertTriangle,
  Users,
  Wrench,
  Building,
  Gamepad2,
  FileText,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Logo } from "@/components/brand/logo"
import { useAppStore } from "@/store/app-store"
import { useAuth } from "@/features/auth/components/auth-provider"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: string[]
  badge?: string
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Finances",
    href: "/finances",
    icon: DollarSign,
  },
  {
    title: "Communication",
    href: "/communication",
    icon: MessageSquare,
  },
  {
    title: "Reservations",
    href: "/reservations",
    icon: Calendar,
  },
  {
    title: "Security",
    href: "/security",
    icon: Shield,
    roles: ["admin", "guard"],
  },
  {
    title: "Incidents",
    href: "/incidents",
    icon: AlertTriangle,
  },
  {
    title: "Visitors",
    href: "/visitors",
    icon: Users,
    roles: ["admin", "guard"],
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
    roles: ["admin"],
  },
  {
    title: "Residents",
    href: "/residents",
    icon: Building,
    roles: ["admin"],
  },
  {
    title: "Amenities",
    href: "/amenities",
    icon: Gamepad2,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function Sidebar() {
  const location = useLocation()
  const { user } = useAuth()
  const { sidebarCollapsed, toggleSidebar } = useAppStore()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = navigationItems.filter((item) => {
    // Filter by role
    if (item.roles && user && !item.roles.includes(user.role)) {
      return false
    }
    // Filter by search query
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!sidebarCollapsed && <Logo size="sm" />}
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-8 w-8 p-0">
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search navigation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-2">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10",
                      sidebarCollapsed && "justify-center px-2",
                      isActive && "bg-primary/10 text-primary hover:bg-primary/20",
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border p-4">
          {!sidebarCollapsed && (
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">Smart Condominium</p>
              <p>v1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
