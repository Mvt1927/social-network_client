"use client";

import { useAuthStore } from '@/stores';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

function VerifyEmailAuth() {

  const { user, validateToken } = useAuthStore();
  const [clientLoaded, setClienLoaded] = React.useState(false);

  useEffect(() => {
    setClienLoaded(true);
  }, []
  )

  useEffect(() => {
    if (!clientLoaded) return;
    const validate = async () => {
      await validateToken()
      if (user.id && !user.isVerified) {
        redirect("/verify-email")
      }
    }
    validate();
  }, [user.id, clientLoaded])
  return (
    <>
    </>
  );
}
export default VerifyEmailAuth