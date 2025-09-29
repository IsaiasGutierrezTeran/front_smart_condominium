"use client"

import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/navigation/sidebar"
import { TopBar } from "@/components/navigation/top-bar"
import { useAppStore } from "@/store/app-store"
import { cn } from "@/lib/utils"

export function DashboardLayout() {
  const { sidebarCollapsed } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn("transition-all duration-300 ease-in-out", sidebarCollapsed ? "ml-16" : "ml-64")}>
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
