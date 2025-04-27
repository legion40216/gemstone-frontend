import getCategory from '@/app/actions/get-category';
import getColors from '@/app/actions/get-colors';
import getSizes from '@/app/actions/get-sizes';
import getProducts from '@/app/actions/get-products';

import Billboard from '../../_components/billboard';
import Filter from './components/mobile-filter/filter';
import MobileFilters from './components/mobile-filters';
import ProductList from './components/product-list';

export default async function Page({ params, searchParams }) {
  const { products, maxPrice } = await getProducts({
    categoryId: params.categoryId, 
    colorId: searchParams.colorId, 
    sizeId: searchParams.sizeId, 
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });

  const sizes = await getSizes(); 
  const colors = await getColors(); 
  const category = await getCategory(params.categoryId);

  if (!category) {
    return null; // or a 404 component
  }

  return (
    <div className="space-y-4">
      <Billboard 
        imageUrl = {category.billboard.imageUrl} 
        label    = {category.billboard.label}
      />
      <div>
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          {/* Render Mobile Filters with setOpen */}
          <MobileFilters 
            sizes={sizes} 
            colors={colors} 
            maxPrice={maxPrice}  
          />
          {/* Render Desktop Filters without setOpen */}
          <div className="hidden lg:block">
            {/* Render Desktop Filters without setOpen */}
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
          </div>
          
          <div className="col-span-4">
            <ProductList initialData={products} />
          </div>
        </div>
      </div>
    </div>
  );
}