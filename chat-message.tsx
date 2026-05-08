"use client"

import type { ChatMessage as ChatMessageType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      {isUser ? (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-semibold text-xs">AI</span>
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] px-4 py-2 rounded-2xl",
          isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-card-foreground rounded-tl-sm",
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
