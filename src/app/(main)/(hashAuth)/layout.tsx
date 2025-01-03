import MenuBar from "@/components/MenuBar";
import VerifyEmailAuth from "@/components/verify-email-auth";
import { CopilotPopup } from "@copilotkit/react-ui";

export default function HasAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <VerifyEmailAuth />
      <MenuBar className="sticky hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
      {children}
      <CopilotPopup
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "Need any help?",
        }}
      />
    </>
  );
}
