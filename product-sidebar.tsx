"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Star, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/lib/types"

export function ProductSidebar() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const trendingProducts = products.slice(0, 3)
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3)
  const onSale = products.filter((p) => p.price < p.originalPrice).slice(0, 3)

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Discover Products</CardTitle>
      </CardHeader>
      <Tabs defaultValue="trending" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-4 grid grid-cols-3">
          <TabsTrigger value="trending" className="text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="rated" className="text-xs">
            <Star className="w-3 h-3 mr-1" />
            Top Rated
          </TabsTrigger>
          <TabsTrigger value="sale" className="text-xs">
            <Tag className="w-3 h-3 mr-1" />
            On Sale
          </TabsTrigger>
        </TabsList>
        <CardContent className="flex-1 overflow-auto pt-4">
          <TabsContent value="trending" className="mt-0 space-y-3">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="compact" />
            ))}
          </TabsContent>
          <TabsContent value="rated" className="mt-0 space-y-3">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} variant="compact" />
            ))}
          </TabsContent>
          <TabsContent value="sale" className="mt-0 space-y-3">
            {onSale.map((product) => (
              <div key={product.id} className="relative">
                <Badge className="absolute top-1 right-1 z-10 bg-destructive text-destructive-foreground text-[10px]">
                  Sale
                </Badge>
                <ProductCard product={product} variant="compact" />
              </div>
            ))}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
