import React, { createContext } from 'react';
import { ContentfulClient, ContentfulProvider } from 'react-contentful';

// space: process.env.SPACE,
// accessToken: process.env.ACCESS_TOKEN,

const contentfulClient = new ContentfulClient({
  space: "Josh's Website Content",
  accessToken: 'rf82jp4px8qn',
});

const defaultValues = {
  boolean: `this works`,
};

export const SiteContext = createContext(defaultValues);

export const SiteProvider = ({ children }) => {
  return (
    <ContentfulProvider client={contentfulClient}>
      <SiteContext.Provider value={defaultValues}>
        {children}
      </SiteContext.Provider>
    </ContentfulProvider>
  );
};
