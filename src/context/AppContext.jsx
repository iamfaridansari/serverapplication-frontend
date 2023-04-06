import React, { createContext, useRef, useState } from "react";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const navbar = useRef(null);

  return (
    <AppContext.Provider value={{ menu, setMenu, navbar }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
