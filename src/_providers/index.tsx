import React from 'react';

export const AriakeComponentsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};
