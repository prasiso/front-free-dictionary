'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/helper";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = getUser();
    if (user) router.replace("/dashboard");
    router.replace("/signin");
  }, [router]);
  return null;
}
