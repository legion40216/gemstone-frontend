import axios from "axios";
import { toast } from "sonner";

export const processOrder = {
  // Add other payment methods here
  placeOrder: async (orderData={}, paymentMethod) => {
    if (paymentMethod === "stripe") {
      return processOrder.processStripeCheckout();
    } else {
      return processOrder.processCashOnDeliveryCheckout(orderData);
    }
  },

  // Stripe
  processStripeCheckout: async () => {
    console.log("Initiating Stripe checkout");
    toast.success(
      "You would now be redirected to Stripe to complete your payment."
    );
    return <div>Stripe</div>
  },

  // Cash on Delivery
  processCashOnDeliveryCheckout: async (orderData) => {
    const toastId = toast.loading(
      "Please be patient, your order is being processed"
    );
    try {
      const res =await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData);
      toast.success("Your order has been placed using Cash on Delivery.");
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  },
};
