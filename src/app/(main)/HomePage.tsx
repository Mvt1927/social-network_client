"use client";

import { useAuthStore } from "@/stores";
import HasAuth from "./HasAuth";
import NoAuth from "./NoAuth";
import dynamic from "next/dynamic";
import Loading from "./loading";

function HomePage() {

  const user = useAuthStore((state) => state.user);
  // const user = useStore(useAuthStore, (state) => state.user);

  return (
    <>
      {
        !user?.id
          ? <NoAuth />
          : <HasAuth />
      }
    </>
  )

}

// export default HomePage;

export default dynamic(() => Promise.resolve(HomePage), { ssr: false, loading: () => <Loading /> });