"use client"

import PostEditor from "@/components/posts/editor/PostEditor";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { CopilotPopup } from "@copilotkit/react-ui";
import VerifyEmailAuth from "@/components/verify-email-uth";
import TrendsSidebar from "@/components/TrendsSidebar";
import MenuBar from "@/components/MenuBar";
import ForYouFeed from "@/components/ForYouFeed";
import FollowingFeed from "@/components/FollowingFeed";

function HasAuth() {

  return (
    <>
      <VerifyEmailAuth />
      <MenuBar className="sticky hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
      <main className="flex w-full min-w-0 gap-6 max-w-xl">
        <div className="container min-w-0 space-y-5">
          <PostEditor />
          <Tabs className="w-full" defaultValue="for-you">
            <TabsList className="w-full flex">
              <TabsTrigger className="w-full" value="for-you">For you</TabsTrigger>
              <TabsTrigger className="w-full" value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <ForYouFeed />
            </TabsContent>
            <TabsContent value="following">
              <FollowingFeed />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <TrendsSidebar />
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

export default HasAuth;