import { UIProvider } from "@/context";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      {children}
    </UIProvider>
  );
}
