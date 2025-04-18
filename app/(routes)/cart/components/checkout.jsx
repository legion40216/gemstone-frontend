"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import useCart from "@/hooks/useCartStore";
import { processOrder } from '@/utils/orderProcessing';

import CustomerInfoStep from './checkout/customer-info-step';
import OrderSummaryStep from './checkout/order-summary-step';
import CheckoutReview from './checkout/checkout-review';
import OrderConfirmationStep from './checkout/order-confirmation-step';

export default function Checkout() {
  const [step, setStep] = useState('cart');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [confirmedOrderData, setConfirmedOrderData] = useState(null);
  const cart = useCart();

  useEffect(() => {
    if (cart.items.length === 0 && step !== 'cart' && !isOrderPlaced) {
      setStep('cart');
      toast.error("Your cart is empty. Please add items before checkout.");
    }
  }, [cart.items, step, isOrderPlaced]);

  const totalPrice = cart.items.reduce((total, item) => total + 
  Number(item.price) * item.count, 0);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === 'stripe') {
      processOrder.initiateStripeCheckout();
    } else {
      setStep('customer-info');
    }
  };

  const handleCustomerInfoSubmit = (data) => {
    setCustomerInfo(data);
    setStep('order-summary');
  };

  const handlePlaceOrder = async () => {
    if (!customerInfo.name) {
      toast.error("Customer information is missing. Please fill out the form.");
      setStep('customer-info');
      return;
    }

    const orderData = {
      customerInfo,
      items: cart.items.map(item => ({
        id: item.id,
        name: item.name,
        count: item.count,
        price: item.price,
      })),
      totalPrice,
      paymentMethod,
    };
    
    setIsOrderPlaced(true);

    try {
      await processOrder.placeOrder(orderData, paymentMethod);
      setConfirmedOrderData(orderData);
      cart.removeAll();
      setStep('order-confirmation');
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      setIsOrderPlaced(false);
    }
  };

  return (
    <div >
      <h1 className="text-2xl font-bold mb-2">Checkout</h1>
      {step === 'cart' && (
        <CheckoutReview
          cart={cart} 
          totalPrice={totalPrice} 
          onPaymentMethodSelect={handlePaymentMethodSelect}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      )}
      {step === 'customer-info' && (
        <CustomerInfoStep 
          onSubmit={handleCustomerInfoSubmit}
          customerInfo={customerInfo}
          onBack={() => setStep('cart')}
        />
      )}
      {step === 'order-summary' && (
        <OrderSummaryStep 
          cart={cart}
          customerInfo={customerInfo}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          onPlaceOrder={handlePlaceOrder}
          onBack={() => setStep('customer-info')}
        />
      )}
      {step === 'order-confirmation' && confirmedOrderData && (
        <OrderConfirmationStep 
          orderData={confirmedOrderData}
        />
      )}
    </div>
  );
}