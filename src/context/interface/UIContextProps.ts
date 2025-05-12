import { AlertData, AlertType } from "@/components"

export interface UIContextProps {
    loading: boolean;
    setLoading: (value: boolean) => void;
    alert: Omit<AlertData, 'onClose'> | null;
    showAlert: ({ type, message, duration }: { type: AlertType, message: string, duration?: number }) => void
}