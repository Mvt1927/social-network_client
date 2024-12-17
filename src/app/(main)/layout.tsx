import SiteHeader from "@/components/site-header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 min-w-full">
          {children}
      </div>
    </>
  );
}
