import { useState } from 'react';

export default function useFetch() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (pageName, radioOption, input) => {
    setIsLoading(true);
    let url;
    const urlType = `https://www.the${pageName}db.com/api/json/v1/1/`;

    switch (radioOption) {
    case 'ingredient':
      url = `${urlType}filter.php?i=${input}`;
      break;
    case 'name':
      url = `${urlType}search.php?s=${input}`;
      break;
    case 'first-letter':
      url = `${urlType}search.php?f=${input}`;
      break;
    default:
      url = '';
    }

    const response = await fetch(url);
    const json = await response.json();
    setIsLoading(false);
    return json;
  };

  const fetchCategories = () => {

  };

  return {
    fetchData,
    fetchCategories,
    isLoading,
  };
}
