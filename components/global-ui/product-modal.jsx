"use client"
import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

import useModalStore from '@/hooks/useModalStore';
import useCart from '@/hooks/useCartStore';

import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function SP() {
    const { isOpen, data, closeModal } = useModalStore();
    const {addItem} = useCart()

    if (!isOpen || !data) {
      return null;
    }

    const handleAddToCart = () => {
      addItem({...data}); 
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="flex flex-col w-[80%] sm:w-[60%] sm:min-w-[600px] 
      max-w-none rounded-sm h-auto max-h-[80vh] sm:max-h-none overflow-hidden"
      >
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription>Product Details</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-2 overflow-y-auto 
        sm:overflow-hidden"
        >
          {/* Main Image */}
          <div>
            <img 
              src={data.images[0].url}
            />
          </div>
          
          <div className="w-full flex flex-col justify-between gap-6 sm:gap-2">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="font-semibold">Price:</p>
                <p>${data.price}</p>
              </div>
              <div>
                <p className="font-semibold">Category:</p>
                <p>{data.category.name}</p>
              </div>
              <div>
                <p className="font-semibold">Size:</p>
                <p>{data.size.name}</p>
              </div>
              <div>
                <p className="font-semibold">Color:</p>
                <p>{data.color.name}</p>
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <Button 
              className="w-full flex items-center justify-center"
              onClick={handleAddToCart}
              >
              <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
                
              <Button 
              className=" p-3 py-6 rounded-full"
              variant="outline"
              >
                <Heart className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    );
}