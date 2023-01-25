import PropTypes from 'prop-types';
import React, { createContext } from 'react';

export default function AppProvider({ children }) {
  return (
    <AppContext.Provider value="">{ children }</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export const AppContext = createContext();
