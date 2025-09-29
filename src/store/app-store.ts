import { create } from "zustand"

interface AppState {
  sidebarCollapsed: boolean
  currentLanguage: "en" | "es"
  notifications: Notification[]
  toggleSidebar: () => void
  setLanguage: (lang: "en" | "es") => void
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void
  removeNotification: (id: string) => void
  markNotificationAsRead: (id: string) => void
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
  actionUrl?: string
}

export const useAppStore = create<AppState>((set, get) => ({
  sidebarCollapsed: false,
  currentLanguage: "en",
  notifications: [
    {
      id: "1",
      title: "Payment Due",
      message: "Your monthly maintenance fee is due in 3 days",
      type: "warning",
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: "/finances",
    },
    {
      id: "2",
      title: "New Announcement",
      message: "Pool maintenance scheduled for tomorrow",
      type: "info",
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: "/communication",
    },
  ],

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  setLanguage: (lang) => set({ currentLanguage: lang }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substring(2),
          createdAt: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
}))
