import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ doctors }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
