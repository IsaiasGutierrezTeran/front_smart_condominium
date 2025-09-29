"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  MessageSquare,
  Share2,
  MoreHorizontal,
  ImageIcon,
  Send,
  Pin,
  Flag,
  Trash2,
  Edit,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/features/auth/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { formatDate, formatTime } from "@/lib/utils"
import { cn } from "@/lib/utils"

const postSchema = z.object({
  content: z.string().min(1, "Post content is required").max(500, "Post must be less than 500 characters"),
})

type PostFormData = z.infer<typeof postSchema>

interface Post {
  id: string
  author: {
    id: string
    name: string
    avatar?: string
    role: string
    unitNumber?: string
  }
  content: string
  createdAt: Date
  updatedAt?: Date
  likes: number
  dislikes: number
  comments: number
  isPinned: boolean
  isEdited: boolean
  userReaction?: "like" | "dislike"
  images?: string[]
}

export function CommunityWall() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        id: "admin1",
        name: "Building Management",
        avatar: "/placeholder.svg?key=admin",
        role: "admin",
      },
      content:
        "🏊‍♂️ Pool maintenance has been completed! The pool is now open for use. Please remember to follow the pool rules and enjoy responsibly. Thank you for your patience during the maintenance period.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      dislikes: 0,
      comments: 3,
      isPinned: true,
      isEdited: false,
    },
    {
      id: "2",
      author: {
        id: "resident1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?key=sarah",
        role: "resident",
        unitNumber: "205",
      },
      content:
        "Has anyone else noticed the elevator making strange noises? It seems to be coming from elevator #2. Should we report this to maintenance?",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 8,
      dislikes: 0,
      comments: 5,
      isPinned: false,
      isEdited: false,
      userReaction: "like",
    },
    {
      id: "3",
      author: {
        id: "resident2",
        name: "Mike Chen",
        avatar: "/placeholder.svg?key=mike",
        role: "resident",
        unitNumber: "101",
      },
      content:
        "Great community BBQ last weekend! Thanks to everyone who organized it. Looking forward to the next one. The kids had a blast! 🎉",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      likes: 15,
      dislikes: 0,
      comments: 8,
      isPinned: false,
      isEdited: false,
    },
  ])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  })

  const onSubmit = (data: PostFormData) => {
    if (!user) return

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        unitNumber: user.unitNumber,
      },
      content: data.content,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      comments: 0,
      isPinned: false,
      isEdited: false,
    }

    setPosts([newPost, ...posts])
    reset()
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community.",
    })
  }

  const handleReaction = (postId: string, reaction: "like" | "dislike") => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const currentReaction = post.userReaction
          let newLikes = post.likes
          let newDislikes = post.dislikes
          let newReaction: "like" | "dislike" | undefined = reaction

          // Remove previous reaction
          if (currentReaction === "like") newLikes--
          if (currentReaction === "dislike") newDislikes--

          // Add new reaction if different from current
          if (currentReaction === reaction) {
            newReaction = undefined // Remove reaction if same
          } else {
            if (reaction === "like") newLikes++
            if (reaction === "dislike") newDislikes++
          }

          return {
            ...post,
            likes: newLikes,
            dislikes: newDislikes,
            userReaction: newReaction,
          }
        }
        return post
      }),
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "guard":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "resident":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Share with Community
          </CardTitle>
          <CardDescription>Post updates, questions, or announcements for your neighbors</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="What's happening in the community?"
                  {...register("content")}
                  className={cn("min-h-20 resize-none", errors.content && "border-destructive")}
                />
                {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Photo
                    </Button>
                  </div>
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-1" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <Card key={post.id} className={cn("relative", post.isPinned && "border-primary")}>
            {post.isPinned && (
              <div className="absolute top-3 right-3">
                <Pin className="h-4 w-4 text-primary" />
              </div>
            )}
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{post.author.name}</p>
                        <Badge variant="outline" className={getRoleColor(post.author.role)}>
                          {post.author.role}
                        </Badge>
                        {post.author.unitNumber && (
                          <Badge variant="outline" className="text-xs">
                            Unit {post.author.unitNumber}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span>{formatTime(post.createdAt)}</span>
                        {post.isEdited && (
                          <>
                            <span>•</span>
                            <span>Edited</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user?.role === "admin" && (
                        <>
                          <DropdownMenuItem>
                            <Pin className="mr-2 h-4 w-4" />
                            {post.isPinned ? "Unpin Post" : "Pin Post"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      {user?.id === post.author.id && (
                        <>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Post
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Post
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Post
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        Report Post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Post Content */}
                <div className="text-sm leading-relaxed">{post.content}</div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("gap-1", post.userReaction === "like" && "text-blue-500")}
                      onClick={() => handleReaction(post.id, "like")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("gap-1", post.userReaction === "dislike" && "text-red-500")}
                      onClick={() => handleReaction(post.id, "dislike")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      {post.dislikes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {post.comments}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
