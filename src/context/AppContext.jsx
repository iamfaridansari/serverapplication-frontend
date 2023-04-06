import React, { createContext, useRef, useState } from "react";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const navbar = useRef(null);
  const backendAPI = "https://server-application.onrender.com";
  return (
    <AppContext.Provider value={{ menu, setMenu, navbar, backendAPI }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
