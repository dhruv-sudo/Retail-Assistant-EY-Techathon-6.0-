"use client"

import Link from "next/link"
import { ArrowRight, MessageSquare, ShoppingBag, Truck, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AppProvider } from "@/contexts/app-context"
import { Header } from "@/components/layout/header"
import { ChatInterface } from "@/components/chat/chat-interface"

const features = [
  {
    icon: MessageSquare,
    title: "AI-Powered Assistance",
    description: "Get personalized recommendations from our intelligent shopping assistant",
  },
  {
    icon: ShoppingBag,
    title: "Seamless Shopping",
    description: "Browse, compare, and purchase products with ease across all channels",
  },
  {
    icon: Truck,
    title: "Flexible Fulfillment",
    description: "Choose delivery or free in-store pickup at your convenience",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Multiple payment options with bank-grade security protection",
  },
]

export default function HomePage() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container mx-auto px-4 py-16 md:py-24">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    AI-Powered Shopping Experience
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                    Your Personal <span className="text-primary">AI Shopping</span> Assistant
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-xl text-pretty">
                    Experience the future of retail. Get personalized recommendations, check inventory in real-time, and
                    enjoy seamless checkout across all channels.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" asChild>
                      <Link href="/chat">
                        Start Shopping
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                </div>

                {/* Chat Preview */}
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                    <div className="relative h-[500px]">
                      <ChatInterface />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything You Need</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                  Our omnichannel platform brings together the best of online and in-store shopping with AI-powered
                  personalization.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                  <Card key={feature.title} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-card-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to Transform Your Shopping?
              </h2>
              <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
                Join thousands of happy customers who have discovered a better way to shop.
              </p>
              <Button size="lg" variant="secondary" className="mt-8" asChild>
                <Link href="/chat">
                  Chat with AI Assistant
                  <MessageSquare className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-foreground">ShopAI</span>
              </div>
              <p className="text-sm text-muted-foreground">© 2025 ShopAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  )
}
