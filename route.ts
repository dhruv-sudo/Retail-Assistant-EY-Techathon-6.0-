import { NextResponse } from "next/server"
import { createSession } from "@/lib/session-store"

export async function POST(request: Request) {
  const body = await request.json()
  const { email } = body

  // Mock authentication - in production, verify credentials
  if (email) {
    const session = createSession("customer-001", "web")

    // Create a mock JWT token
    const token = Buffer.from(
      JSON.stringify({
        sessionId: session.id,
        customerId: session.customerId,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    ).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      sessionId: session.id,
      customer: {
        id: "customer-001",
        name: "John Doe",
        email: email,
      },
    })
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
