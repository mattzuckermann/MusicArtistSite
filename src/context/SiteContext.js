import React, { createContext } from 'react';

const defaultValues = {
  playerIsOpen: false,
};

export const SiteContext = createContext(defaultValues);

export const SiteProvider = ({ children }) => {
  return (
    <SiteContext.Provider value={defaultValues}>
      {children}
    </SiteContext.Provider>
  );
};
