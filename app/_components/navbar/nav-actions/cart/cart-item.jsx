"use client";
import React from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { toast } from 'sonner';
import { X, Plus, Minus } from "lucide-react";

import useCart from '@/hooks/useCartStore';

import { Button } from "@/components/ui/button";
import Currency from '@/components/global-ui/currency';

export default function CartItem({ item, setOpen }) {
    const { removeItem, updateItemCount } = useCart();
    const [count, setCount] = useState(item.count);

    const handleRemove = () => {
        removeItem(item.id);
    };

    const handleCountChange = (newCount) => {
        if (newCount > item.quantity) {
            toast.error(`Only ${item.quantity} items available.`);
            return;
        }
        if (newCount < 1) {
            toast.error("Quantity cannot be less than 1.");
            return;
        }
        setCount(newCount);
        updateItemCount(item.id, newCount);
    };

    return (
        <div className="flex py-4 border-b">
            <div className="h-28 w-28 rounded-md overflow-hidden relative">
                <img 
                    src={item.images[0].url}
                    alt={item.name} 
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <Link 
                        className="font-medium hover:underline"
                        href={`/products/${item.id}`}
                        onClick={() => setOpen(false)} // Close the cart
                    >
                        {item.name}
                    </Link>
                    <Currency value={item.price * count} />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                    {item.color.name}, {item.size.name}
                </p>
                <div className="flex items-center mt-2">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCountChange(count - 1)}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-3">{count}</span>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCountChange(count + 1)}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <Button 
                variant="ghost" 
                onClick={handleRemove} 
                className="ml-2 px-2"
            >
                <X size={15} />
            </Button>
        </div>
    );
}