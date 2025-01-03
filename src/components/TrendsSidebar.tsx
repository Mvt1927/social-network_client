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
import { useQuery } from "@tanstack/react-query";
import { UserData } from "@/lib/types";
import { getUserToFollow } from "@/apis/user.api";
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

export function useGetUserToFollow() {
  const { access_token } = useAuthStore();
  const fetchUserToFollow = async () => {
    const { response } = await getUserToFollow(access_token);
    return response.data;
  }

  const query = useQuery<UserData[]>({
    queryKey: ['user', 'user-to-follow'],
    queryFn: () => fetchUserToFollow(),
    initialData: [],
    enabled: !!access_token,
  })

  return query;
};

function WhoToFollow() {
  const { data: usersToFollow, status } = useGetUserToFollow();

  return (
    <Card className="">
      <CardHeader className="font-bold">Who to follow</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {status === 'success' ? usersToFollow.map((user) => (
          <User key={user.id} user={user} />
        )) : status === 'error' ?
          <div className="text-center text-muted-foreground">Failed to fetch users to follow</div>
          : <Loader2 className="mx-auto animate-spin" />}
      </CardContent>
    </Card>
  );
}
export function User({ user }: { user: UserData }) {

  return (
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
          following: user._count.following,
          isFollowedByUser: user.followers.some(
            ({ followerId }) => followerId === user.id,
          ),
        }}
      />
    </div>
  )
}