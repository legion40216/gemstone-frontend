"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import useCart from "@/hooks/useCartStore";
import CheckoutReview from './checkout/checkout-review';
import CheckoutForm from './checkout/checkout-form';
import CheckoutSummary from './checkout/checkout-summary';
import CheckoutConfirmation from './checkout/checkout-confirmation';
import { processOrder } from '../utils/orderProcessing';

export default function Checkout() {
  const [step, setStep] = useState("checkout-review");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [confirmedOrderData, setConfirmedOrderData] = useState();
  const cart = useCart();

  const totalPrice = cart.items.reduce(
    (total, item) => total + Number(item.price) * item.count,
    0
  );

  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  // Check if the cart is empty
  useEffect(() => {
    if (cart.items.length === 0 && step !== "cart" && !isOrderPlaced) {
      setStep("checkout-review");
      toast.error("Your cart is empty. Please add items before checkout.");
    }
  }, [cart.items, step, isOrderPlaced]);

 
  // Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === "stripe") {
      const stripeStep = processOrder.placeOrder(paymentMethod);
      return stripeStep;
    } else {
      setStep("checkout-form");
    }
  };

  // Handle customer information form submission
  const handleCustomerInfoSubmit = (data) => {
    setCustomerInfo(data);
    setStep("checkout-summary");
  };

  // Handle order placement
   const onSubmit = async () => {
    // Prepare order data
    const orderData = {
      ...customerInfo, 
      items: cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        count: item.count,
        price: item.price,
      })),
      totalPrice,
      paymentMethod,
    };

    // Process the order
    try {
      setIsOrderPlaced(true);
      const res = await processOrder.placeOrder(orderData, paymentMethod);
    
      // Transform the order data
      const transformedOrder = {
        customerName: res.customerName,
        email: res.email,
        phone: res.phone,
        address: res.address,
        city: res.city,
        country: res.country,
        postalCode: res.postalCode,
        items: res.orderItems.map((item) => ({
          productId: item.productId,
          name: item.product.name,
          count: item.count,
          price: parseFloat(item.price),
        })),
        totalPrice: parseFloat(res.totalPrice),
        paymentMethod: res.paymentMethod,
      };
      
      setConfirmedOrderData(transformedOrder);
      cart.removeAll();
      setStep("checkout-confirmation");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      setIsOrderPlaced(false);
    }    
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Checkout</h1>
      {step === "checkout-review" && (
        <CheckoutReview
          cart={cart}
          totalPrice={totalPrice}
          onPaymentMethodSelect={handlePaymentMethodSelect}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      )}

      {step === "checkout-form" && (
        <CheckoutForm
          onSubmit={handleCustomerInfoSubmit}
          customerInfo={customerInfo}
          onBack={() => setStep("checkout-review")}
        />
      )}

      {step === "checkout-summary" && (
        <CheckoutSummary
          cart={cart}
          customerInfo={customerInfo}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          onPlaceOrder={onSubmit}
          onBack={() => setStep("checkout-form")}
        />
      )}

      {step === "checkout-confirmation" && confirmedOrderData && (
        <CheckoutConfirmation 
        confirmedOrderData={confirmedOrderData} 
        />
      )}
    </div>
  );
}

