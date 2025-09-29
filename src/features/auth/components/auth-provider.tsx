"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"

interface AuthContextType {
  isAuthenticated: boolean
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, isLoading, login, logout } = useAuthStore()

  useEffect(() => {
    // Redirect to login if not authenticated and not already on login page
    if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login", { replace: true })
    }

    // Redirect to dashboard if authenticated and on login page
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/", { replace: true })
    }
  }, [isAuthenticated, location.pathname, navigate])

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
