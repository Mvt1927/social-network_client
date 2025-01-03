"use client";

import { useAuthStore } from '@/stores';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

function VerifyEmailAuth() {

  const { user, validateToken } = useAuthStore();
  const [clientLoaded, setClientLoaded] = React.useState(false);

  useEffect(() => {
    setClientLoaded(true);
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
  }, [user.id, clientLoaded,validateToken, user.isVerified])
  return (
    <>
    </>
  );
}
export default VerifyEmailAuth