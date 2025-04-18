"use client"
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import useCart from '@/hooks/useCartStore';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function ProductActions({ data }) {
  const { items, addItem, getItemCount, updateItemCount } = useCart();
  const [count, setCount] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const currentItemCount = getItemCount(data.id);
    setItemCount(currentItemCount);
    setAvailableQuantity(data.quantity - currentItemCount);
    setCount(currentItemCount > 0 ? currentItemCount : 1);
  }, [data, items, getItemCount]);

  const handleAddToCart = () => {
    if (itemCount > 0) {
      toast.info('Item is already in cart.');
    } else if (availableQuantity !== 0) {
      addItem(data, count);
    } else {
      toast.error(`Only ${data.quantity} items available.`);
    }
  };

  const handleCountChange = (newCount) => {
    if (newCount > data.quantity) {
      toast.error(`Only ${data.quantity} items available.`);
      return;
    }
    if (newCount < 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    setCount(newCount);
    updateItemCount(data.id, newCount);
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selection and Add to Cart */}
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center border rounded-md">
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

        <Button 
        className="p-2 py-5 rounded-full" 
        variant="outline"
        >
          <Heart className="w-6 h-6" />
        </Button>
      </div>

      {/* Add to Cart Button */}
      <div className="flex">
        <Button
          className="flex-1 py-3 px-4 rounded-full flex items-center justify-center"
          onClick={handleAddToCart}
          disabled={availableQuantity === 0}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>
      
      {/* Stock Status */}
      <div>
        {availableQuantity === 0 ? (
          <p className="text-red-500">This product is out of stock.</p>
        ) : (
          <p className="text-gray-500">{availableQuantity} items available</p>
        )}
      </div>
    </div>
  );
}