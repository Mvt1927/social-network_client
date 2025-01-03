"use client";

import { useAuthStore } from "@/stores";
import NoAuth from "./NoAuth";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

function WellcomPage() {

  const [clientLoaded, setClientLoaded] = useState(false);
  const user = useAuthStore((state) => state.user);
  // const user = useStore(useAuthStore, (state) => state.user);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  useEffect(() => {
    if (!clientLoaded) return;
    if (!!user.id) {
      if (user.isVerified === false) {
        redirect('/verify-email')
      } else
        redirect('/home')
    }
    
  }, [user.id, user.isVerified, clientLoaded]);

  return (
    <NoAuth />
  )

}

export default dynamic(() => Promise.resolve(WellcomPage), { ssr: false, loading: () => <Loading /> });