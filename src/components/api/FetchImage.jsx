const BASE_URL = 'https://pixabay.com/api/';

const API = '32213066-8c27353e21dcb9ee734ab239c';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
// `${BASE_URL}?${params}`
export const fetchImages = async (searchQuery, page) => {
  const params = new URLSearchParams({
    q: searchQuery,
    page,
    key: API,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Can't find searching images ((( ");
  }
  const resposeList = response.json();
  return resposeList;
};
