'use client'
import React, { useState, useEffect } from 'react'
import { ShoppingBag } from "lucide-react"
import { useRouter } from 'next/navigation'

import useCart from '@/hooks/useCartStore'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Currency from '@/components/global-ui/currency'
import CartItem from './cart/cart-item'

export default function Cart() {
  const { items, getTotalCount, getTotalPrice } = useCart()
  const [totalCount, setTotalCount] = useState(0)
  const [open ,setOpen] = useState(false) 
  const router = useRouter()

  useEffect(() => {
    setTotalCount(getTotalCount())
  }, [getTotalCount, items])

  const handleCheckout = () => {
    router.push('/checkout')
    setOpen(false)
  }

  return (
    <DropdownMenu 
    modal={false} 
    open={open} 
    onOpenChange={setOpen}
    >
      <DropdownMenuTrigger  asChild>
        <Button 
        variant="outline" 
        size="icon" 
        className="relative"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full 
          bg-primary text-primary-foreground text-xs flex items-center 
          justify-center"
          >
            {totalCount}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="end">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
        </div>

        <ScrollArea className="max-h-[300px] overflow-y-auto">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem 
              key={item.id} 
              item={item} 
              setOpen={setOpen}
              />
            ))
          ) : (
            <div className="p-4 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto" />
            <h2 className="mt-4 text-lg font-semibold">
                Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-gray-500">
                Add some items to your cart to get started.
            </p>
          </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center text-base 
            font-medium mb-4"
            >
              <p>Subtotal</p>
              <Currency value={getTotalPrice()} />
            </div>
            <Button className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}