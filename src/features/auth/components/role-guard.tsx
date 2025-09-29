"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/features/auth/components/auth-provider"
import type { UserRole } from "@/store/auth-store"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: UserRole[]
  fallback?: ReactNode
}

export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return null
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access this section. Required roles: {allowedRoles.join(", ")}
          </AlertDescription>
        </Alert>
      )
    )
  }

  return <>{children}</>
}
