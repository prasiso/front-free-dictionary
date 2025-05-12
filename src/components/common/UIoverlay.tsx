'use client'
import { useUI } from "@/context/UIContext";
import { Loading } from "./Loading";
export function UIOverlay() {
  const { loading } = useUI();
  return <>{loading && <Loading />}</>;
}
