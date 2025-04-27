import React from 'react';

import getProduct from '@/app/actions/get-product';
import getProducts from '@/app/actions/get-products';

import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';

import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableCell, 
  TableBody 
} from '@/components/ui/table';

import { Separator } from '@/components/ui/separator';
import ProductDetails from './components/product-details';
import ProductGallery from './components/product-gallery';
import ProductList from '../../_components/product-list';

export const revalidate = 60;

export default async function Page({ params }) {
  // Fetch the product details using the productId from the URL params
  // and check if the product exists, if not, return a 404 page or a custom message
  const product = await getProduct(params.productId);
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">
          Product not found.
        </p>
      </div>
    );
  }

  // Get related products based on the categoryId of the fetched product.
  const suggestedProducts = await getProducts({
    categoryId: product.categoryId,
    excludeProductId: product.id, // Exclude the current product from suggestions
  });
  
  return (
    <div className="space-y-6">
      {/* Product Gallery and Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ProductGallery images={product.images} />
          <ProductDetails data={product} />
      </div>

      {/* Data Sheet Accordion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Empty first column */}
        <div></div>

        {/* Data Sheet in the second column */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="data-sheet">
            <AccordionTrigger>Data Sheet</AccordionTrigger>
            <AccordionContent>
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableCell className="font-medium">Attribute</TableCell>
                    <TableCell className="font-medium">Details</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Dynamically render additional product details */}
                  {Object.entries({
                    Weight:        product.weight,
                    Shape:         product.shape?.name || 'N/A',
                    Clarity:       product.clarity?.grade || 'N/A',
                    Cut:           product.cut?.grade || 'N/A',
                    Luster:        product.luster?.type || 'N/A',
                    Treatment:     product.treatment || 'N/A',
                    Certification: product.certification || 'N/A',
                    Origin:        product.origin || 'N/A',
                    Rarity:        product.rarityFactor || 'N/A',
                    Inclusions:    product.inclusions || 'N/A',
                    Fluorescence:  product.fluorescence || 'N/A',
                    Zodiac:        product.zodiac?.name || 'N/A',
                  }).map(([attribute, detail]) => (
                    <TableRow key={attribute}>
                      <TableCell className="font-medium">{attribute}</TableCell>
                      <TableCell>{detail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator />

      {/* Related Products */}
      <ProductList 
      title="Related Items" 
      items={suggestedProducts}
      />
    </div>
  );
}
