"use client"
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Plus, 
  Minus,
  X 
} from 'lucide-react';
import useCart from '@/hooks/useCartStore';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function ProductActions({ data }) {
  const { 
    items, 
    addItem, 
    getItemCount, 
    updateItemCount, 
    removeItem 
  } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [remainingStock, setRemainingStock] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  // useEffect to synchronize remainingStock state with the cart and product data
  useEffect(() => {
    // Get the current count of this product in the cart
    const currentCartQuantity = getItemCount(data.id);

    // Update the state with the current item count
    setCartQuantity(currentCartQuantity);

    // Calculate and update the available stock
    setRemainingStock(data.quantity - currentCartQuantity);

    // Set the initial count to the current item count if it exists, otherwise default to 1
    setSelectedQuantity(currentCartQuantity > 0 ? currentCartQuantity : 1);
  }, [data, items, getItemCount]);

  // Handler for adding or removing the product from the cart
  const handleCartAction = () => {
    if (cartQuantity > 0) {
      removeItem(data.id);
      toast.info('Item removed from cart.');
    } else if (remainingStock !== 0) {
      addItem(data, selectedQuantity);
    } else {
      toast.error(`Only ${data.quantity} items available.`);
    }
  };

  // Handler for changing the quantity of the product
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > data.quantity) {
      toast.error(`Only ${data.quantity} items available.`);
      return;
    }
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    setSelectedQuantity(newQuantity);
    updateItemCount(data.id, newQuantity);
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selection */}
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center border rounded-md">
          <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleQuantityChange(selectedQuantity - 1)}
          >
            <Minus className="w-4 h-4" />
          </Button>

          <span className="px-3">{selectedQuantity}</span>

          <Button 
          variant="ghost" 
          size="sm"  
          onClick={() => handleQuantityChange(selectedQuantity + 1)}
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
          onClick={handleCartAction}
          disabled={remainingStock === 0}
          variant={cartQuantity > 0  ? "destructive" : "default"}
        >
          {
            cartQuantity > 0 
            ? ( 
              <>
              <X className="w-5 h-5 mr-2" />
              Remove from cart
              </>
             ) 
            :
            (
              <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
              </>
            ) 
          }
        </Button>
      </div>
      
      {/* Stock Status */}
      <div>
        {remainingStock === 0 ? (
          <p className="text-red-500">This product is out of stock.</p>
        ) : (
          <p className="text-gray-500">{remainingStock} items available</p>
        )}
      </div>
    </div>
  );
}