import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Truck, Home, CreditCard } from 'lucide-react';

const OrderConfirmationStep = ({ orderData }) => {
  const router = useRouter();

  useEffect(() => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    confetti({
      particleCount: 100,
      origin: { x: 0.5, y: 0.5 },
      ...defaults,
    });
  }, []);

  const { customerInfo, items, totalPrice, paymentMethod } = orderData;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="mb-8 bg-green-50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-green-700">Order Confirmed!</CardTitle>
          <CheckCircle className="h-8 w-8 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-green-700">Thank you for your purchase. Your order has been successfully placed.</p>
        </CardContent>
      </Card>

      {/* <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Order Number:</span>
            <span>{orderId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card> */}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Items Ordered</CardTitle>
        </CardHeader>
        <CardContent>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.count}</span>
              <span>${(item.price * item.count).toFixed(2)}</span>
            </div>
          ))}
          <Separator className="my-4" />
          <div className="flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start mb-2">
            <Home className="mr-2 h-5 w-5" />
            <div>
              <p>{customerInfo.name}</p>
              <p>{customerInfo.address}</p>
              <p>{customerInfo.city}, {customerInfo.postalCode}</p>
              <p>{customerInfo.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          <span className="capitalize">{paymentMethod}</span>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button onClick={() => {
          router.push('/')
        }} 
        variant="outline"
        >
          Continue Shopping
        </Button>
        <Button onClick={() => {/* Implement order tracking logic */}}>
          Track Order
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationStep;