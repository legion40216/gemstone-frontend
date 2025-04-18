import axios from 'axios';
import { toast } from 'sonner';

export const processOrder = {
  initiateStripeCheckout: async (orderData) => {
    console.log('Initiating Stripe checkout for:', orderData);
    toast.success("You would now be redirected to Stripe to complete your payment.");
    // Implement Stripe checkout logic here
  },

  processCashOnDeliveryOrder: async (orderData) => {
    const toastId = toast.loading("Please be patient, your order is being processed");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData);
      toast.success("Your order has been placed using Cash on Delivery.");
      return orderData;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Server Error: Unable to process the request");
      }
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  },

  placeOrder: async (orderData, paymentMethod) => {
    if (paymentMethod === 'stripe') {
      return processOrder.initiateStripeCheckout(orderData);
    } else {
      return processOrder.processCashOnDeliveryOrder(orderData);
    }
  }
};