"use client"

import type React from "react"

import {
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
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/features/auth/components/auth-provider"
import { useNavigate } from "react-router-dom"
import { formatCurrency } from "@/lib/utils"

interface QuickActionCard {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color: string
  roles?: string[]
  badge?: string
}

const quickActions: QuickActionCard[] = [
  {
    title: "Finances",
    description: "Payments, fees, and financial reports",
    icon: DollarSign,
    href: "/finances",
    color: "text-green-500",
    badge: "Due Soon",
  },
  {
    title: "Communication",
    description: "Community wall and announcements",
    icon: MessageSquare,
    href: "/communication",
    color: "text-blue-500",
    badge: "3 New",
  },
  {
    title: "Reservations",
    description: "Book common areas and amenities",
    icon: Calendar,
    href: "/reservations",
    color: "text-purple-500",
  },
  {
    title: "Security",
    description: "Access control and monitoring",
    icon: Shield,
    href: "/security",
    color: "text-red-500",
    roles: ["admin", "guard"],
  },
  {
    title: "Incidents",
    description: "Report and track issues",
    icon: AlertTriangle,
    href: "/incidents",
    color: "text-orange-500",
    badge: "2 Open",
  },
  {
    title: "Visitors",
    description: "Manage guest access",
    icon: Users,
    href: "/visitors",
    color: "text-cyan-500",
    roles: ["admin", "guard"],
  },
  {
    title: "Maintenance",
    description: "Service requests and providers",
    icon: Wrench,
    href: "/maintenance",
    color: "text-yellow-500",
    roles: ["admin"],
  },
  {
    title: "Residents",
    description: "Directory and unit management",
    icon: Building,
    href: "/residents",
    color: "text-indigo-500",
    roles: ["admin"],
  },
  {
    title: "Amenities",
    description: "Facilities and recreational areas",
    icon: Gamepad2,
    href: "/amenities",
    color: "text-pink-500",
  },
  {
    title: "Documents",
    description: "Important files and contracts",
    icon: FileText,
    href: "/documents",
    color: "text-gray-500",
  },
]

export function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const filteredActions = quickActions.filter((action) => !action.roles || (user && action.roles.includes(user.role)))

  const stats = [
    {
      title: "Monthly Fees",
      value: formatCurrency(1250),
      change: "+2.5%",
      trend: "up" as const,
      description: "Due in 5 days",
    },
    {
      title: "Open Incidents",
      value: "3",
      change: "-1",
      trend: "down" as const,
      description: "2 resolved this week",
    },
    {
      title: "Upcoming Reservations",
      value: "7",
      change: "+3",
      trend: "up" as const,
      description: "Next: Pool tomorrow",
    },
    {
      title: "Maintenance Tasks",
      value: "12",
      change: "85%",
      trend: "up" as const,
      description: "Completion rate",
    },
  ]

  const recentActivity = [
    {
      title: "Payment Received",
      description: "Monthly maintenance fee processed",
      time: "2 hours ago",
      type: "success",
    },
    {
      title: "New Announcement",
      description: "Pool maintenance scheduled for tomorrow",
      time: "4 hours ago",
      type: "info",
    },
    {
      title: "Incident Reported",
      description: "Elevator #2 maintenance required",
      time: "6 hours ago",
      type: "warning",
    },
    {
      title: "Visitor Registered",
      description: "Guest access approved for Unit 205",
      time: "1 day ago",
      type: "info",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Here's what's happening in your condominium today</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Access the most important features of your condominium management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {filteredActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={action.href}
                      variant="outline"
                      className="h-auto p-4 justify-start bg-transparent"
                      onClick={() => navigate(action.href)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <Icon className={`h-5 w-5 ${action.color} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{action.title}</p>
                            {action.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current status of building systems and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Elevators</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-muted-foreground">All operational</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Security System</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-muted-foreground">Fully active</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Internet</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <Progress value={95} className="h-2" />
              <p className="text-xs text-muted-foreground">95% uptime</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Water System</span>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">Maintenance scheduled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
