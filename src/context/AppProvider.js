import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function AppProvider({ children }) {
  const [searchData, setSearchData] = useState([]);
  const { fetchData, isLoading } = useFetch();

  const values = useMemo(() => ({
    fetchData,
    isLoading,
    searchData,
    setSearchData,
  }), [fetchData, isLoading, searchData, setSearchData]);

  return (
    <AppContext.Provider value={ values }>{ children }</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export const AppContext = createContext();
