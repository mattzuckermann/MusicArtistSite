import React, { createContext } from 'react';

const defaultValues = {
  boolean: 'this works',
};

export const SiteContext = createContext(defaultValues);

export const SiteProvider = ({ children }) => {
  return (
    <SiteContext.Provider value={defaultValues}>
      {children}
    </SiteContext.Provider>
  );
};
