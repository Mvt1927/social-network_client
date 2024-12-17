import SiteHeaderAuth from "@/components/site-header-auth";
import VerifyAuth from "@/components/verify-auth";

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
          By clicking continue, you agree to our <a href="/terms-of-service">Terms of Service</a>{" "}
          and <a href="/privacy-policy">Privacy Policy</a>.
        </div>
      </section>
    </>
  );
}
