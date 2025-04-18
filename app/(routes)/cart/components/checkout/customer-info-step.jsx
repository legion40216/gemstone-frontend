import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define the schema as before
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  country: z.string().min(2, { message: 'Please enter a valid country.' }),
  postalCode: z.string().min(5, { message: 'Please enter a valid postal code.' }),
});

export default function CustomerInfoStep({ onSubmit, customerInfo, onBack }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: customerInfo, // Use customerInfo for default values
  });

  const handleSubmit = (data) => {
    onSubmit(data); // Pass form data to parent
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Form Fields... (same as before) */}
          {/* Example: */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="john@example.com" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="phone"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <Input placeholder="+1234567890" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="address"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl>
          <Input placeholder="123 Main St" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="city"
    render={({ field }) => (
      <FormItem>
        <FormLabel>City</FormLabel>
        <FormControl>
          <Input placeholder="New York" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="country"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Country</FormLabel>
        <FormControl>
          <Input placeholder="United States" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="postalCode"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Postal Code</FormLabel>
        <FormControl>
          <Input placeholder="12345" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
          )}
        />
        <Button type="submit">Continue to Order Summary</Button>
      </form>
    </Form>
    <Button 
    type="button"
    variant="outline" 
    onClick={() => onBack('cart')} 
    className="mt-4"
    >
      Back to Cart
    </Button>
  </div>
  );
}