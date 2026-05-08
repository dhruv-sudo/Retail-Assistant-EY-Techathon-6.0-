"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2, ShoppingBag, Package, CreditCard, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useApp } from "@/contexts/app-context"
import { ChatMessage } from "./chat-message"
import { ProductCard } from "../products/product-card"

const quickActions = [
  { icon: ShoppingBag, label: "Recommend products", prompt: "Can you recommend some products for me?" },
  { icon: Package, label: "Track order", prompt: "I want to track my order" },
  { icon: CreditCard, label: "View promotions", prompt: "What promotions do you have?" },
  { icon: HelpCircle, label: "Help with returns", prompt: "How do I return an item?" },
]

export function ChatInterface() {
  const { chatHistory, sendMessage, session } = useApp()
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const message = input.trim()
    setInput("")
    setIsTyping(true)

    await sendMessage(message)
    setIsTyping(false)
    inputRef.current?.focus()
  }

  const handleQuickAction = async (prompt: string) => {
    if (isTyping) return
    setIsTyping(true)
    await sendMessage(prompt)
    setIsTyping(false)
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">AI</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">Shopping Assistant</h3>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {chatHistory.map((msg) => (
            <div key={msg.id} className="chat-message">
              <ChatMessage message={msg} />
              {msg.products && msg.products.length > 0 && (
                <div className="mt-3 ml-12">
                  <div className="grid grid-cols-2 gap-2">
                    {msg.products.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} variant="compact" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-semibold text-xs">AI</span>
              </div>
              <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="typing-dot w-2 h-2 bg-muted-foreground/50 rounded-full" />
                  <span className="typing-dot w-2 h-2 bg-muted-foreground/50 rounded-full" />
                  <span className="typing-dot w-2 h-2 bg-muted-foreground/50 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      {chatHistory.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="justify-start gap-2 h-auto py-2 text-left bg-transparent"
                onClick={() => handleQuickAction(action.prompt)}
              >
                <action.icon className="w-4 h-4 text-primary" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t bg-muted/30">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about our products..."
            className="flex-1 bg-card"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
