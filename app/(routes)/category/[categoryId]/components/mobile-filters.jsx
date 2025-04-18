"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Filter from "./mobile-filter/filter"
import { Plus } from "lucide-react"

const MobileFilters = ({ sizes, colors, maxPrice }) => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden mb-4 mr-3">
          Filters
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Filter
          valueKey="sizeId"
          name="Sizes"
          data={sizes}
 
        />
        <Filter
          valueKey="colorId"
          name="Colors"
          data={colors}
 
        />
        <Filter
          valueKey="priceRange"
          name="Price Range"
          maxPrice={maxPrice}
        />
      </SheetContent>
    </Sheet>
  );
};
export default MobileFilters