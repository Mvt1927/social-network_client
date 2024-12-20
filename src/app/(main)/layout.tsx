import SiteHeader from "@/components/site-header";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import MenuBar from "./MenuBar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const COPILOT_CLOUD_PUBLIC_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_KEY;
  return (
    <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_KEY}>
      <SiteHeader />
      <div className="container flex flex-row gap-6 flex-1 px-6 pt-6">
        <MenuBar className="sticky hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
        {children}
      </div>
      <CopilotPopup
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "Need any help?",
        }}
      />
    </CopilotKit>
  );
}
