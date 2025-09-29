"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommunityWall } from "@/features/communication/components/community-wall"
import { AnnouncementBoard } from "@/features/communication/components/announcement-board"
import { MessagingCenter } from "@/features/communication/components/messaging-center"
import { useAuth } from "@/features/auth/components/auth-provider"

export function CommunicationPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("wall")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Community Communication</h1>
        <p className="text-muted-foreground">
          Stay connected with your community through announcements and discussions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wall">Community Wall</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="wall" className="space-y-6">
          <CommunityWall />
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <AnnouncementBoard />
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <MessagingCenter />
        </TabsContent>
      </Tabs>
    </div>
  )
}
