import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

export default function AuthProvider({ children }) {
  const [btnDisabled, setBtnDisabled] = useState(true);

  const validateBtn = ({ email, password }) => {
    const MIN_PASSWD = 6;
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    const emailValid = emailRegex.test(email);
    const passwdValid = password.length > MIN_PASSWD;
    setBtnDisabled(!(emailValid && passwdValid));
  };

  const value = useMemo(() => ({
    btnDisabled,
    validateBtn,
  }), [btnDisabled]);

  return (
    <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export const AuthContext = createContext();
