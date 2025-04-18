"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function NavCategories({data}) {
    const pathName = usePathname()
    
    const routes = data.map((route) => ({
      href: `/category/${route.id}`,
      label: route.name,
      active: pathName === `/category/${route.id}` 
    }))
    
  return (
    <DropdownMenu >
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        Categories <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent 
    className="max-h-[300px] overflow-y-auto" 
    align="start"
    >
      {routes.map((route, index) => (
        <DropdownMenuItem 
          key={index} 
          asChild
        >
          <Link
            href={route.href}
            className={cn(
              "w-full text-sm font-medium transition-colors",
              route.active 
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {route.label}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
