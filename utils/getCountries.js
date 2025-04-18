export const countries = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'ZW', name: 'Zimbabwe' },
  // Add more countries as needed
];

// Define a function to get the country name by code
export const getCountryName = (code) => {
  const country = countries.find((country) => country.code === code);
  return country ? country.name : 'Unknown Country'; // Fallback if code not found
};