const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getProduct = async (id) => {
  try {
    const url = `${API_URL}/products/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        // Product not found
        return null;
      }
      // Handle other non-OK statuses
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch product.');
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching productId:', error);
    throw error; // Re-throw to allow caller to handle if needed
  }
};

export default getProduct;
