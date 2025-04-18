const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCategories = async () => {
  try {
    const url = `${API_URL}/categories`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Re-throw to allow caller to handle if needed
  }
};

export default getCategories;