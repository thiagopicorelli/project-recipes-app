import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState, useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import useFilterRecipes from '../hooks/useFilterRecipes';

export default function AppProvider({ children }) {
  const [searchData, setSearchData] = useState([]);
  const { fetchData, fetchCategories, isLoading } = useFetch();

  const { filterRecipes } = useFilterRecipes();
  const [doneRecipes, setDoneRecipes] = useState(filterRecipes('all'));

  const handleDoneRecipesFilter = useCallback(({ target: { name } }) => {
    setDoneRecipes(filterRecipes(name));
  }, [filterRecipes]);

  const values = useMemo(() => ({
    fetchData,
    fetchCategories,
    isLoading,
    searchData,
    setSearchData,
    doneRecipes,
    handleDoneRecipesFilter,
  }), [
    fetchData,
    fetchCategories,
    isLoading,
    searchData,
    setSearchData,
    doneRecipes,
    handleDoneRecipesFilter,
  ]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export const AppContext = createContext();
