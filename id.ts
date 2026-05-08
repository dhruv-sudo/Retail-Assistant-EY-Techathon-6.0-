import { NextResponse } from "next/server"
import { getOrderStatus } from "@/lib/agents/post-purchase-agent"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getOrderStatus(id)

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  return NextResponse.json(order)
}
