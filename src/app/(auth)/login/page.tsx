import { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
// import { Suspense } from "react";
// import Loading from "./loading";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {

  return (
      <LoginForm />
  )
}
