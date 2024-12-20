import SiteHeaderAuth from "@/components/site-header-auth";
import VerifyAuth from "@/components/verify-auth";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeaderAuth />
      <VerifyAuth />
      <section className="container flex flex-col gap-6 flex-1 justify-center px-6">
        {children}
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <Link href="/terms-of-service">Terms of Service</Link>{" "}
          and <Link href="/privacy-policy">Privacy Policy</Link>.
        </div>
      </section>
    </>
  );
}
