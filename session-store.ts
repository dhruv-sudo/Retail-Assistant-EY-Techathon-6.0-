import type { SessionData, CartItem, ChatMessage } from "./types"

// In-memory session store (simulates backend session storage)
const sessions: Map<string, SessionData> = new Map()

export function createSession(customerId: string, channel: SessionData["channel"] = "web"): SessionData {
  const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const session: SessionData = {
    id: sessionId,
    customerId,
    channel,
    cart: [],
    chatHistory: [],
    createdAt: new Date(),
  }
  sessions.set(sessionId, session)
  return session
}

export function getSession(sessionId: string): SessionData | undefined {
  return sessions.get(sessionId)
}

export function updateSessionChannel(sessionId: string, channel: SessionData["channel"]): SessionData | undefined {
  const session = sessions.get(sessionId)
  if (session) {
    session.channel = channel
    sessions.set(sessionId, session)
  }
  return session
}

export function addToCart(sessionId: string, item: CartItem): SessionData | undefined {
  const session = sessions.get(sessionId)
  if (session) {
    const existingIndex = session.cart.findIndex(
      (i) => i.productId === item.productId && i.size === item.size && i.color === item.color,
    )
    if (existingIndex >= 0) {
      session.cart[existingIndex].quantity += item.quantity
    } else {
      session.cart.push(item)
    }
    sessions.set(sessionId, session)
  }
  return session
}

export function removeFromCart(sessionId: string, productId: string): SessionData | undefined {
  const session = sessions.get(sessionId)
  if (session) {
    session.cart = session.cart.filter((item) => item.productId !== productId)
    sessions.set(sessionId, session)
  }
  return session
}

export function clearCart(sessionId: string): SessionData | undefined {
  const session = sessions.get(sessionId)
  if (session) {
    session.cart = []
    sessions.set(sessionId, session)
  }
  return session
}

export function addChatMessage(sessionId: string, message: ChatMessage): SessionData | undefined {
  const session = sessions.get(sessionId)
  if (session) {
    session.chatHistory.push(message)
    sessions.set(sessionId, session)
  }
  return session
}

export function getChatHistory(sessionId: string): ChatMessage[] {
  const session = sessions.get(sessionId)
  return session?.chatHistory || []
}
