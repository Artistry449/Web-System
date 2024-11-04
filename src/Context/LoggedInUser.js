import { createContext, useState } from "react";

const LoggedInUserContext = createContext();

export function LoggedInUserUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
}

export default LoggedInUserContext;
