import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

export default function OrderSummaryStep({ 
  cart, 
  customerInfo,
  totalPrice, 
  paymentMethod, 
  onPlaceOrder, 
  onBack 
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="font-medium mb-2">Customer Details:</h3>
        {Object.entries(customerInfo).map(([key, value]) => (
            <p key={key} className="text-sm">
              <span className="font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </span> 
              {value}
            </p>
          ))}
      </div>
      <h3 className="font-medium mb-2">Order Items:</h3>
      <ul className="space-y-2 mb-4">
        {cart.items.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.name}</span>

            <div className="flex gap-1 items-center">
              <span>${item.price}</span>
              <X className="h-2 w-2"/>
              <span>{item.count}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center font-bold text-lg mb-4">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <Button onClick={onPlaceOrder} className="w-full mb-4">
        Place Order ({paymentMethod === 'stripe' ? 'Pay with Stripe' : 'Cash on Delivery'})
      </Button>
      <Button variant="outline" onClick={onBack} className="w-full">
        Back to Customer Information
      </Button>
    </div>
  );
}