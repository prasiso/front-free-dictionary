"use client";
import { useUI } from "@/context/UIContext";
import { Loading, Alert } from ".";
export function UIOverlay() {
  const { loading, alert, showAlert } = useUI();
  return (
    <>
      {loading && <Loading />}
      {alert && (
        <Alert
          type={alert.type ?? "info"}
          message={alert.message}
          onClose={() => showAlert({ message: "", type: null, duration: 0 })}
        />
      )}
    </>
  );
}
