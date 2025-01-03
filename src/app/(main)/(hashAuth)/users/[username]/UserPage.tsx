'use client'

import { useAuthStore } from "@/stores";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import UserPosts from "./UserPosts";
import { FollowerInfo, UserData } from "@/lib/types";
import UserAvatar from "@/components/UserAvatar";
import { formatDate } from "date-fns";
import { formatNumber } from "@/lib/utils";
import FollowerCount from "@/components/FollowerCount";
import EditProfileButton from "./EditProfileButton";
import FollowButton from "@/components/FollowButton";
import Linkify from "@/components/Linkify";
import useGetUser from "@/hooks/useGetUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Followers from "../../follower/Followers";

interface PageProps {
  username: string
}

function UserPage({ username }: PageProps) {

  const { user: loggedInUser } = useAuthStore();

  const { data: user, status } = useGetUser(username);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["user", username],
    });
  }, [loggedInUser.id, username, queryClient]);


  if (status === 'error') {
    return <p className="text-center text-destructive">An error occurred while loading user</p>
  }

  if (status === 'success' && !user) {
    return <p className="text-center text-destructive">User not found</p>
  }

  if (!user) {
    return <p className="text-center text-destructive">User not found</p>
  }

  return (
    <>
      <UserProfile user={user} loggedInUserId={loggedInUser.id} />
      <Tabs className="w-full" defaultValue="own-post">
        <TabsList className="w-full flex">
          <TabsTrigger className="w-full" value="own-post">Posts</TabsTrigger>
          {user.id === loggedInUser.id && (
            <>
              <TabsTrigger className="w-full" value="followers">Followers</TabsTrigger>
              <TabsTrigger className="w-full" value="following">Following</TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value="own-post">
          <UserPosts userId={user.id} />
        </TabsContent>
        {user.id === loggedInUser.id && (
          <>
            <TabsContent value="followers">
              <Followers />
            </TabsContent>
            <TabsContent value="following">
              {/* <FollowingFeed /> */}
            </TabsContent>
          </>
        )}

      </Tabs>
    </>
  );
}

export default dynamic(() => Promise.resolve(UserPage), { ssr: false, loading: () => <Loader2 className="mx-auto animate-spin" /> });

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    following: user._count.following,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId,
    ),
  };

  return (
    <Card className="">
      <CardHeader>
        <UserAvatar
          avatarUrl={user.avatarUrl}
          size={250}
          className="mx-auto size-full max-h-60 max-w-60 rounded-full"
        />
      </CardHeader>
      <CardContent>

        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
          <div className="me-auto space-y-3">
            <div>
              <h1 className="text-3xl font-bold">{user.fullname || user.username}</h1>
              <div className="text-muted-foreground">@{user.username}</div>
            </div>
            <div>Member since {formatDate(user.createAt, "MMM d, yyyy")}</div>
            <div className="flex items-center gap-3">
              <span>
                Posts:{" "}
                <span className="font-semibold">
                  {formatNumber(user._count.posts)}
                </span>
              </span>
              <FollowerCount userId={user.id} initialState={followerInfo} />
            </div>
          </div>
          {user.id === loggedInUserId ? (
            <div className="flex flex-col gap-2">
              <EditProfileButton user={user} />
              <Button variant={"outline"} asChild>
                <Link href={"/user/change-password"}>
                  Change Password
                </Link>
              </Button>
              <Button variant={"destructive"} >
                <Link href={"/user/logout"}>
                  Logout
                </Link>
              </Button>
            </div>
          ) : (
            <FollowButton userId={user.id} initialState={followerInfo} />
          )}
        </div>
        {user.bio && (
          <>
            <hr />
            <Linkify>
              <div className="overflow-hidden whitespace-pre-line break-words">
                {user.bio}
              </div>
            </Linkify>
          </>
        )}
      </CardContent>
    </Card>
  );
}