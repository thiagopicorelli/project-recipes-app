import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState, useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import useFilterRecipes from '../hooks/useFilterRecipes';

export default function AppProvider({ children }) {
  const [searchData, setSearchData] = useState([]);
  const { fetchData, fetchCategories, isLoading } = useFetch();

  const { filterRecipes } = useFilterRecipes();
  const [doneRecipes, setDoneRecipes] = useState(filterRecipes('all', 'done'));
  const [favRecipes, setFavRecipes] = useState(filterRecipes('all', 'fav'));

  const handleDoneRecipesFilter = useCallback(({ target: { name } }) => {
    setDoneRecipes(filterRecipes(name, 'done'));
  }, [filterRecipes]);

  const handleFavRecipesFilter = useCallback(({ target: { name } }) => {
    setFavRecipes(filterRecipes(name, 'fav'));
  }, [filterRecipes]);

  const values = useMemo(() => ({
    fetchData,
    fetchCategories,
    isLoading,
    searchData,
    setSearchData,
    doneRecipes,
    handleDoneRecipesFilter,
    handleFavRecipesFilter,
    favRecipes,
  }), [
    fetchData,
    fetchCategories,
    isLoading,
    searchData,
    setSearchData,
    doneRecipes,
    favRecipes,
    handleDoneRecipesFilter,
    handleFavRecipesFilter,
  ]);

  return (
    <AppContext.Provider value={ values }>{ children }</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export const AppContext = createContext();
