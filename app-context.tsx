"use client"

import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from "react"
import type { SessionData, CartItem, ChatMessage } from "@/lib/types"

interface AppContextType {
  session: SessionData | null
  isLoading: boolean
  initSession: (channel?: SessionData["channel"]) => Promise<void>
  switchChannel: (channel: SessionData["channel"]) => Promise<void>
  addToCart: (item: CartItem) => Promise<void>
  removeFromCart: (productId: string) => void
  clearCart: () => void
  sendMessage: (message: string, context?: Record<string, unknown>) => Promise<ChatMessage>
  chatHistory: ChatMessage[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

  const initSession = useCallback(async (channel: SessionData["channel"] = "web") => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", channel }),
      })
      const data = await res.json()
      setSession(data)

      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content:
          "Hi there! I'm your personal shopping assistant. How can I help you today? I can recommend products, check inventory, help with sizing, or assist with your order.",
        timestamp: new Date(),
      }
      setChatHistory([welcomeMessage])
    } catch (error) {
      console.error("Failed to init session:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const switchChannel = useCallback(
    async (channel: SessionData["channel"]) => {
      if (!session) return
      try {
        const res = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "updateChannel", sessionId: session.id, channel }),
        })
        const data = await res.json()
        setSession(data)
      } catch (error) {
        console.error("Failed to switch channel:", error)
      }
    },
    [session],
  )

  const addToCart = useCallback(
    async (item: CartItem) => {
      if (!session) return
      try {
        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: session.id, item }),
        })
        const data = await res.json()
        setSession((prev) => (prev ? { ...prev, cart: data.cart } : null))
      } catch (error) {
        console.error("Failed to add to cart:", error)
      }
    },
    [session],
  )

  const removeFromCart = useCallback((productId: string) => {
    setSession((prev) => {
      if (!prev) return null
      return {
        ...prev,
        cart: prev.cart.filter((item) => item.productId !== productId),
      }
    })
  }, [])

  const clearCart = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, cart: [] } : null))
  }, [])

  const sendMessage = useCallback(
    async (message: string, context?: Record<string, unknown>): Promise<ChatMessage> => {
      // Add user message to history
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: message,
        timestamp: new Date(),
      }
      setChatHistory((prev) => [...prev, userMessage])

      try {
        const res = await fetch("/api/ai/sales-agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: session?.id,
            message,
            context,
          }),
        })
        const data = await res.json()
        setChatHistory((prev) => [...prev, data])
        return data
      } catch (error) {
        console.error("Failed to send message:", error)
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I encountered an issue. Please try again.",
          timestamp: new Date(),
        }
        setChatHistory((prev) => [...prev, errorMessage])
        return errorMessage
      }
    },
    [session],
  )

  // Initialize session on mount
  useEffect(() => {
    initSession()
  }, [initSession])

  return (
    <AppContext.Provider
      value={{
        session,
        isLoading,
        initSession,
        switchChannel,
        addToCart,
        removeFromCart,
        clearCart,
        sendMessage,
        chatHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
