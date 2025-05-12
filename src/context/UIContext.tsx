"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { UIContextProps } from "./interface/UIContextProps";
import { AlertData, AlertType } from "@/components";

const UIContext = createContext<UIContextProps | undefined>(undefined);
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Omit<AlertData, 'onClose'> | null>(null);
  const showAlert = ({ type, message, duration = 3000 }: {type: AlertType, message: string, duration?: number}) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), duration);
  };
  return (
    <UIContext.Provider value={{ loading, setLoading, alert, showAlert }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextProps => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
