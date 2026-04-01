// UnreadNumberContext.js
import React, { createContext, useState } from "react";

export const UnreadNumberContext = createContext();

export const UnreadNumberProvider = ({ children }) => {
  const [unreadNewNumber, setNewUnreadNumber] = useState(0);

  return (
    <UnreadNumberContext.Provider value={{ unreadNewNumber, setNewUnreadNumber }}>
      {children}
    </UnreadNumberContext.Provider>
  );
};
