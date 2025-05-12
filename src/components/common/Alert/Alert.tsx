"use client";
import { AlertData, AlertType } from "./AlertType";
export function Alert({ type = "info", message, onClose }: AlertData) {
  const baseStyle =
    "fixed top-4 right-4 px-4 py-2 rounded shadown z-50 transition";
  const typeStyle: Record<Exclude<AlertType, null>, string> = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };
  return (
    <div className={`${baseStyle} ${typeStyle[type]}`}>
      {message}
      <button onClick={onClose} className="ml-4 font-bold">
        X
      </button>
    </div>
  );
}
