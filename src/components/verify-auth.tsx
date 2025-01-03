"use client";

import { useAuthStore } from '@/stores';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

function VerifyAuth() {

  const { validateToken } = useAuthStore();

  useEffect(() => {
    const validate = async () => {
      if (await validateToken()) {
        //get path from url nextjs
        redirect("/home")
      }
    }
    validate();
  }, [validateToken])
  return (
    <>
    </>
  );
}
export default VerifyAuth