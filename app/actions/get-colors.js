const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getColors = async () => {
  try {
    const url = `${API_URL}/colors`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching colorId:', error);
    throw error; 
  }
};

export default getColors;

