'use client';
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import FollowButton from "./FollowButton";
import UserAvatar from "./UserAvatar";
import UserTooltip from "./UserTooltip";
import { useAuthStore } from "@/stores";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "./ui/card";
// import { TrendingTopics } from "./TrendingTopic";

const TrendingTopics = dynamic(() => import("./TrendingTopic").then((mod) => mod.TrendingTopics));

export default function TrendsSidebar() {
  return (
    <div className="sticky top-20 hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

function WhoToFollow() {
  const { user } = useAuthStore();

  if (!user) return null;

  const testUser = {
    ...user,
    createAt: new Date(user.createAt),
    _count: {
      followers: 10,
      posts: 10,
    },
    followers: [],
  }

  const usersToFollow = [
    { ...testUser, id: "1" }, { ...testUser, id: "1123123123" }, { ...testUser, id: "1123123" }, { ...testUser, id: "1123" }
  ]

  return (
    <Card className="">
      <CardHeader className="font-bold">Who to follow</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {usersToFollow.map((user) => (
          <div key={user.id} className="flex items-center justify-between gap-2">
            <UserTooltip user={user}>
              <Link
                href={`/users/${user.username}`}
                className="flex items-center gap-3"
              >
                <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
                <div>
                  <p className="line-clamp-1 break-all font-semibold hover:underline">
                    {user.fullname}
                  </p>
                  <p className="line-clamp-1 break-all text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </Link>
            </UserTooltip>
            <FollowButton
              userId={user.id}
              initialState={{
                followers: user._count.followers,
                isFollowedByUser: user.followers.some(
                  ({ followerId }) => followerId === user.id,
                ),
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

