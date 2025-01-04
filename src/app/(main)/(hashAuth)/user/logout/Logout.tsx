'use client'

import { useAuthStore } from "@/stores";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Logout() {
  const { clearAuth } = useAuthStore();

  useEffect(() => {
    clearAuth();
    redirect('/');
  }, [clearAuth]);

  return <Loader2 className="animate-spin" />;
}

export default dynamic(() => Promise.resolve(Logout), { ssr: false, loading: () => <Loader2 className="animate-spin" /> });