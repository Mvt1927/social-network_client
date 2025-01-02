"use client";

import { useAuthStore } from "@/stores";
import NoAuth from "./NoAuth";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { useEffect } from "react";
import { redirect } from "next/navigation";

function WellcomPage() {

  const user = useAuthStore((state) => state.user);
  // const user = useStore(useAuthStore, (state) => state.user);

  useEffect(() => {

    console.log('user', user);
    if (!!user.id) {
      if (user.isVerified === false) {
        redirect('/verify-email')
      } else
        redirect('/home')
    }
    
  }, [user.id, user.isVerified]);

  return (
    <NoAuth />
  )

}

// export default HomePage;

export default dynamic(() => Promise.resolve(WellcomPage), { ssr: false, loading: () => <Loading /> });