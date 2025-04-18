'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

const Slider = React.forwardRef(({ className, value, onValueChange, onValueCommit, step = 5, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    value={value}
    onValueChange={onValueChange}
    onValueCommit={onValueCommit} // Add onValueCommit here
    step={step} // Set the step here
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {value.map((_, index) => (
      <SliderPrimitive.Thumb key={index} className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = 'Slider';

export { Slider };

export function SliderDemo({ className, ...props }) {
  const [value, setValue] = React.useState([0, 100]); // Initialize state for multiple thumbs

  return (
    <Slider
      value={value}
      onValueChange={setValue} // Update the value state when slider changes
      step={5} // Ensure the step is set to 5
      className={cn('w-[60%]', className)}
      {...props}
    />
  );
}
