import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "admin" | "guard" | "resident"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  unitNumber?: string
  avatar?: string
  phone?: string
  createdAt: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Mock authentication - replace with real API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock user data based on email
        const mockUser: User = {
          id: "1",
          email,
          name:
            email === "admin@smartcondo.com"
              ? "Admin User"
              : email === "guard@smartcondo.com"
                ? "Security Guard"
                : "John Resident",
          role: email === "admin@smartcondo.com" ? "admin" : email === "guard@smartcondo.com" ? "guard" : "resident",
          unitNumber: email === "resident@smartcondo.com" ? "101A" : undefined,
          avatar: "/diverse-user-avatars.png",
          phone: "+1 (555) 123-4567",
          createdAt: new Date().toISOString(),
        }

        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      updateProfile: (data: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({
            user: { ...user, ...data },
          })
        }
      },
    }),
    {
      name: "smart-condominium-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
