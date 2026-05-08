import { NextResponse } from "next/server"
import { createSession, getSession, updateSessionChannel } from "@/lib/session-store"
import type { SessionData } from "@/lib/types"

export async function POST(request: Request) {
  const body = await request.json()
  const { action, sessionId, channel } = body

  if (action === "create") {
    const session = createSession("customer-001", channel || "web")
    return NextResponse.json(session)
  }

  if (action === "get" && sessionId) {
    const session = getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }
    return NextResponse.json(session)
  }

  if (action === "updateChannel" && sessionId && channel) {
    const session = updateSessionChannel(sessionId, channel as SessionData["channel"])
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }
    return NextResponse.json(session)
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
