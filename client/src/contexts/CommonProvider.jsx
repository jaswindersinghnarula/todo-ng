import { createContext, useState } from "react";

const CommonContext = createContext({});

export function CommonProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <CommonContext.Provider value={{ loading, setLoading }}>
      {children}
    </CommonContext.Provider>
  );
}

export default CommonContext;
