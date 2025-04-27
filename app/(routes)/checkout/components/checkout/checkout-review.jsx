"use client"
import React from 'react';
import OrderSummary from './checkout-review/order-summary';
import CheckoutItem from './checkout-review/checkout-Item';

export default function CheckoutReview({ 
  cart, 
  totalPrice, 
  onPaymentMethodSelect, 
  setPaymentMethod, 
  paymentMethod 
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold space-y-3">Review Your Order</h2>
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {cart.items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <ul className="space-y-6">
              {cart.items.map((item) => (
                <CheckoutItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
        <div className="lg:col-span-4">
          <OrderSummary
            totalPrice={totalPrice}
            onPaymentMethodSelect={onPaymentMethodSelect}
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
          />
        </div>
      </div>
    </div>
  );
}