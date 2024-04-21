// CombinedProviders.js
//ADD any other context providers here to maybe combine them

import React from "react";
import { AuthProvider } from "./AuthContext";
import { UnreadNumberProvider } from "./UnreadNumberContext";
// import { ThemeProvider } from "./ThemeContext";

export const ContextProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UnreadNumberProvider>{children}</UnreadNumberProvider>
    </AuthProvider>
  );
};
