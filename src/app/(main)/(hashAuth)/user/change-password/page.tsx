import { Metadata } from "next";
import PasswordChangeRequest from "./RequestChangePassword";
import ChangePasswordForm from "./ChangePassword";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export const metadata: Metadata = {
  title: "Change Password",
}

export default async function Page({ searchParams }: PageProps) {

  const { token } = await searchParams;

  return (
    <>
      {!token ? <PasswordChangeRequest /> : <ChangePasswordForm token={token} />}
    </>
  );
}
