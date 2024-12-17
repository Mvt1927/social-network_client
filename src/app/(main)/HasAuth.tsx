"use client"

import { Button } from "@/components/ui/button";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores";
import { Tabs } from "@radix-ui/react-tabs";

function HasAuth() {

  const authStore = useAuthStore();

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        {/* <PostEditor /> */}
        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">For you</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            {/* <ForYouFeed /> */}
            <div>
              For you feed
            </div>
          </TabsContent>
          <TabsContent value="following">
            {/* <FollowingFeed /> */}
            <div>
              Following feed
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* <TrendsSidebar /> */}
    </main>
  );
}

export default HasAuth;