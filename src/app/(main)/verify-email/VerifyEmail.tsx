'use client'

import { OTPForm } from "@/components/otp-form";
import { useAuthStore } from "@/stores";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function VerifyEmail() {

  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    if (user.isVerified) {
      redirect("/home");
    }
  }, [user, user.isVerified]);

  return (
    <div className="w-full self-center">
      <OTPForm />
    </div>
  )
}

export default dynamic(() => Promise.resolve(VerifyEmail), { ssr: false, loading: () => <Loader2 className="animate-spin" /> });