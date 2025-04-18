import React from 'react';

import getProducts from '../actions/get-products';
import getBillboard from '../actions/get-billboards';

import Billboard from './_components/billboard';
import ProductList from './_components/product-list';

export const revalidate = 0;

export default async function page() {
  const billboard    = await getBillboard("398c0d41-e1d2-400c-8509-ecfea3e79f7e");
  const { products } = await getProducts(); 

  const featuredProducts    = products.filter(product => product.isFeatured);
  const nonFeaturedProducts = products.filter(product => !product.isFeatured);
  return (
    <div className="space-y-16">
        <Billboard 
        imageUrl={billboard.imageUrl}
        label={billboard.label}
        />
        <ProductList 
        title="Featured products"
        items={featuredProducts}
        />
        <ProductList 
        title="Products"
        items={nonFeaturedProducts}
        />
    </div>
  );
}