// src/ioc/DIContext.tsx
import React, { createContext, useContext } from "react";
import { container } from "./container";

const DIContext = createContext(container);

interface DIProviderProps {
  children: React.ReactNode;
}

export const DIProvider: React.FC<DIProviderProps> = ({ children }) => {
  return <DIContext.Provider value={container}>{children}</DIContext.Provider>;
};

export function useService<T>(identifier: string | symbol): T {
  const container = useContext(DIContext);
  return container.get<T>(identifier);
}
