"use client"

import PostEditor from "@/components/posts/editor/PostEditor";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import VerifyEmailAuth from "@/components/verify-email-auth";
import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "@/components/ForYouFeed";
import FollowingFeed from "@/components/FollowingFeed";

function HasAuth() {

  return (
    <>
      <VerifyEmailAuth />
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
      
    </>
  );
}

export default HasAuth;