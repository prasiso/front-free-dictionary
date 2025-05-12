"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { UIContextProps } from "./interface/UIContextProps";
import { AlertData, AlertType } from "@/components";

const UIContext = createContext<UIContextProps | undefined>(undefined);
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Omit<AlertData, "onClose"> | null>(null);
  const showAlert = ({
    type,
    message,
    duration = 5000,
  }: {
    type: AlertType;
    message: string;
    duration?: number;
  }) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), duration);
  };
  async function showLoading(operation: () => Promise<T>): Promise<T> {
    setLoading(true);
    const MIN_DURATION = 3000;
    const startTime = Date.now();
      try {
      const result = await operation();
      return result;
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_DURATION - elapsed;
      if (remaining > 0) await new Promise(res => setTimeout(res, remaining));
      setLoading(false)
    }
  }

  return (
    <UIContext.Provider value={{ loading, showLoading, alert, setLoading, showAlert }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextProps => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
