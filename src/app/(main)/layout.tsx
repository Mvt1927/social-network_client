import SiteHeader from "@/components/site-header";
import { CopilotKit } from "@copilotkit/react-core";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const COPILOT_CLOUD_PUBLIC_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_KEY;
  return (
    <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_KEY}>
      <SiteHeader />
      <div className="container flex flex-row justify-between gap-6 flex-1 px-6 pt-6">
        {children}
      </div>
    </CopilotKit>
  );
}
