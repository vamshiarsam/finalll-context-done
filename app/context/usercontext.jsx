"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export default function Provider({ children }) {
  const [name, setName] = useState("NIGAMAGAGAGAGAAAAAAAAAAAAAAAAA");
  return (
    <AppContext.Provider value={{ name, setName }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("use context not found");
  }
  return context;
}
