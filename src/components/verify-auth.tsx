"use client";

import { useAuthStore } from '@/stores';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

function VerifyAuth() {

  const authStore = useAuthStore();

  useEffect(() => {
    const validate = async () => {
      if (await authStore.validateToken()) {
        //get path from url nextjs
        
        redirect("/")
      }
    }
    validate();
  }, [authStore.access_token, authStore.refresh_token])
  return (
    <>
    </>
  );
}
export default VerifyAuth