export interface Product {
  id: string
  sku: string
  name: string
  category: string
  brand: string
  price: number
  originalPrice: number
  description: string
  image: string
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
}

export interface InventoryItem {
  online: number
  storeA: number
  storeB: number
  storeAName: string
  storeBName: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

export interface Customer {
  id: string
  name: string
  email: string
  loyaltyPoints: number
  tier: string
  preferences: {
    categories: string[]
    brands: string[]
    sizes: {
      shoes: string
      clothing: string
    }
  }
  purchaseHistory: string[]
}

export interface Promotion {
  id: string
  code: string
  type: "percentage" | "fixed" | "shipping"
  value: number
  description: string
  minPurchase: number
  expiresAt: string
}

export interface OrderTimeline {
  status: string
  date: string
  description: string
}

export interface Order {
  id: string
  customerId: string
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  status: string
  paymentMethod: string
  deliveryType: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
  }
  timeline: OrderTimeline[]
  trackingNumber: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  products?: Product[]
  actions?: ChatAction[]
}

export interface ChatAction {
  type: "add_to_cart" | "view_product" | "check_inventory" | "apply_coupon" | "track_order"
  label: string
  data?: Record<string, unknown>
}

export interface SessionData {
  id: string
  customerId: string
  channel: "web" | "mobile" | "kiosk" | "whatsapp"
  cart: CartItem[]
  chatHistory: ChatMessage[]
  createdAt: Date
}
