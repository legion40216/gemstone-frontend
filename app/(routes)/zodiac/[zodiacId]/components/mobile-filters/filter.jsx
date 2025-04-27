"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const Filter = ({ data, name, valueKey, maxPrice }) => {
  const searchParams = useSearchParams();
  const selectedValue = searchParams.get(valueKey);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  // Handle filter changes
  const onFilterChange = (newValue) => {
    const params = new URLSearchParams(searchParams);

    if (newValue === "all") {
      params.delete(valueKey);
    } else {
      params.set(valueKey, newValue);
    }

    window.history.pushState(null, "", `?${params.toString()}`);

  };

  // Handle price range slider changes
  const onPriceRangeChange = (newValues) => {
    setPriceRange(newValues); // Update state while sliding
  };

  // Commit price range filter when the user releases the slider
  const onPriceRangeCommit = (newValues) => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", newValues[0]);
    params.set("maxPrice", newValues[1]);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      {name === "Price Range" ? (
        <div className="space-y-4">
          <Slider
            value={priceRange}
            max={maxPrice}
            step={5} // Ensure the step is set to 5
            onValueChange={onPriceRangeChange} // Update price range while sliding
            onValueCommit={onPriceRangeCommit} // Commit price range on release
          />
          <div className="flex justify-between">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])
              }
              className="w-20"
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange([priceRange[0], parseInt(e.target.value) || maxPrice])
              }
              className="w-20"
            />
          </div>
        </div>
      ) : (
        <RadioGroup onValueChange={onFilterChange} value={selectedValue || "all"}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All {name}</Label>
          </div>
          {data.map((filter) => (
            <div key={filter.id} className="flex items-center space-x-2">
              <RadioGroupItem value={filter.id} id={filter.id} />
              <Label htmlFor={filter.id}>{filter.name}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default Filter;
