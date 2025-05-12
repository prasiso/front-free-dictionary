'use client'
import { createContext, ReactNode, useContext, useState } from "react";
import { UIContextProps } from "./interface/UIContextProps";

const UIContext = createContext<UIContextProps | undefined>(undefined);
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  return (
    <UIContext.Provider value={{ loading, setLoading }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextProps => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
