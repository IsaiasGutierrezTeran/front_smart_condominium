"use client"

import { useState } from "react"
import { Send, Search, MoreVertical, Phone, Video, Info, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/features/auth/components/auth-provider"
import { formatTime } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  isRead: boolean
}

interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    avatar?: string
    role: string
    isOnline: boolean
  }[]
  lastMessage: Message
  unreadCount: number
  isGroup: boolean
  groupName?: string
}

export function MessagingCenter() {
  const { user } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: "1",
      participants: [
        {
          id: "admin1",
          name: "Building Management",
          avatar: "/placeholder.svg?key=admin",
          role: "admin",
          isOnline: true,
        },
      ],
      lastMessage: {
        id: "1",
        senderId: "admin1",
        content: "Thank you for reporting the elevator issue. We'll have it checked today.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
      },
      unreadCount: 1,
      isGroup: false,
    },
    {
      id: "2",
      participants: [
        {
          id: "guard1",
          name: "Security Guard",
          avatar: "/placeholder.svg?key=guard",
          role: "guard",
          isOnline: true,
        },
      ],
      lastMessage: {
        id: "2",
        senderId: user?.id || "",
        content: "Thanks for the quick response!",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
      },
      unreadCount: 0,
      isGroup: false,
    },
    {
      id: "3",
      participants: [
        {
          id: "resident1",
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?key=sarah",
          role: "resident",
          isOnline: false,
        },
        {
          id: "resident2",
          name: "Mike Chen",
          avatar: "/placeholder.svg?key=mike",
          role: "resident",
          isOnline: true,
        },
        {
          id: "resident3",
          name: "Lisa Wong",
          avatar: "/placeholder.svg?key=lisa",
          role: "resident",
          isOnline: true,
        },
      ],
      lastMessage: {
        id: "3",
        senderId: "resident2",
        content: "Great idea! Let's organize it for next weekend.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isRead: true,
      },
      unreadCount: 0,
      isGroup: true,
      groupName: "Community Events Planning",
    },
  ]

  // Mock messages for selected conversation
  const messages: Message[] = [
    {
      id: "1",
      senderId: user?.id || "",
      content: "Hi, I wanted to report an issue with elevator #2. It's making strange noises.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "2",
      senderId: "admin1",
      content: "Thank you for reporting this. Can you describe the type of noise you're hearing?",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      isRead: true,
    },
    {
      id: "3",
      senderId: user?.id || "",
      content: "It sounds like a grinding noise when the elevator is moving between floors.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: "4",
      senderId: "admin1",
      content: "Thank you for reporting the elevator issue. We'll have it checked today.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
    },
  ]

  const selectedConv = conversations.find((conv) => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    // Handle sending message logic here
    setMessageInput("")
  }

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      conv.groupName?.toLowerCase().includes(searchLower) ||
      conv.participants.some((p) => p.name.toLowerCase().includes(searchLower)) ||
      conv.lastMessage.content.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="grid gap-6 lg:grid-cols-3 h-[600px]">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Your conversations with community members</CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="space-y-1 p-4">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                    selectedConversation === conversation.id && "bg-primary/10",
                  )}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    {conversation.isGroup ? (
                      <div className="flex -space-x-2">
                        {conversation.participants.slice(0, 2).map((participant, index) => (
                          <Avatar key={participant.id} className="h-10 w-10 border-2 border-background">
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback className="text-xs">
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    ) : (
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={conversation.participants[0].avatar || "/placeholder.svg"}
                          alt={conversation.participants[0].name}
                        />
                        <AvatarFallback>
                          {conversation.participants[0].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {!conversation.isGroup && conversation.participants[0].isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">
                        {conversation.isGroup ? conversation.groupName : conversation.participants[0].name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage.senderId === user?.id ? "You: " : ""}
                        {conversation.lastMessage.content}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                        >
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {selectedConv.isGroup ? (
                      <div className="flex -space-x-2">
                        {selectedConv.participants.slice(0, 2).map((participant) => (
                          <Avatar key={participant.id} className="h-10 w-10 border-2 border-background">
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback className="text-xs">
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    ) : (
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedConv.participants[0].avatar || "/placeholder.svg"}
                          alt={selectedConv.participants[0].name}
                        />
                        <AvatarFallback>
                          {selectedConv.participants[0].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {selectedConv.isGroup ? selectedConv.groupName : selectedConv.participants[0].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedConv.isGroup
                        ? `${selectedConv.participants.length} members`
                        : selectedConv.participants[0].isOnline
                          ? "Online"
                          : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="p-0">
              <ScrollArea className="h-[350px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex gap-3", message.senderId === user?.id ? "justify-end" : "justify-start")}
                    >
                      {message.senderId !== user?.id && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={selectedConv.participants[0].avatar || "/placeholder.svg"}
                            alt={selectedConv.participants[0].name}
                          />
                          <AvatarFallback className="text-xs">
                            {selectedConv.participants[0].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "max-w-[70%] rounded-lg px-3 py-2",
                          message.senderId === user?.id ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            message.senderId === user?.id ? "text-primary-foreground/70" : "text-muted-foreground",
                          )}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Send className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
