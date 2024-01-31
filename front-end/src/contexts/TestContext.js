import { createContext, useContext, useState } from "react";

const TestContext = createContext({});


export const TestProvider = ({children}) => {
  const [con,setCon] = useState(null);

  return (
    <TestContext.Provider value={{con,setCon}}>
      {children}
    </TestContext.Provider>
  );
}

export default function useTestContext() {
  return useContext(TestContext);
}