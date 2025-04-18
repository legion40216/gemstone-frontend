import qs from 'query-string';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const getProducts = async (query = {}) => {
  const url = qs.stringifyUrl({
    url: `${API_URL}/products`,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      zodiacId: query.zodiacId,
      isArchived: false,
      ...query,
    },
  });

  const products = await fetcher(url);

  // Calculate the maximum price
  const maxPrice = Math.max(...products.map(product => product.price), 0);

  return { products, maxPrice }; // Return both products and maxPrice
};

export default getProducts;