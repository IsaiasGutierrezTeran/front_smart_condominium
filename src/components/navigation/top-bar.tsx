"use client"

import { Search, Settings, Moon, Sun, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/features/auth/components/user-menu"
import { NotificationMenu } from "@/components/navigation/notification-menu"
import { useTheme } from "@/components/theme-provider"
import { useAppStore } from "@/store/app-store"

export function TopBar() {
  const { theme, setTheme } = useTheme()
  const { currentLanguage, setLanguage } = useAppStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search anything..." className="pl-9 bg-muted/50" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4" />
              <span className="ml-1 text-xs uppercase">{currentLanguage}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLanguage("en")}>
              <span className="mr-2">🇺🇸</span>
              English
              {currentLanguage === "en" && (
                <Badge variant="secondary" className="ml-auto">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("es")}>
              <span className="mr-2">🇪🇸</span>
              Español
              {currentLanguage === "es" && (
                <Badge variant="secondary" className="ml-auto">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <NotificationMenu />

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  )
}
