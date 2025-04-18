import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data, count = 1) => {
        const currentItems = get().items;
        // Check if the item is out of stock
        if (data.quantity === 0) {
          toast.error('Item is out of stock.');
          return;
        }
       // Check if the item is already in the cart
        const existingItem = currentItems.find((item) => item.id === data.id);
      // Check if the quantity exceeds available stock
        if (existingItem) {
          toast.info('Item is already in cart. You can adjust quantity in the cart.');
          return;
        } else {
          const newCount = Math.min(count, data.quantity);
          set({ items: [...currentItems, { ...data, count: newCount }] });
          toast.success('Item added to cart.');
        }
      },

      updateItemCount: (id, newCount) => {
        const item = get().items.find((item) => item.id === id);
        if (item) {
          const updatedCount = Math.min(newCount, item.quantity);
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, count: updatedCount } : item
            ),
          });
          toast.success('Cart updated.');
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success('Item removed from the cart.');
      },

      removeAll: () => {
        set({ items: [] });
      },

      getItemCount: (id) => {
        const item = get().items.find((item) => item.id === id);
        return item ? item.count : 0;
      },

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.count, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.count, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;