import VerifyEmailAuth from "@/components/verify-email-uth";

export default function HasAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <VerifyEmailAuth />
      {children}
    </>
  );
}
