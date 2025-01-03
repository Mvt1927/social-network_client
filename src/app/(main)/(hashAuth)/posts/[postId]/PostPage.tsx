'use client'

import { useAuthStore } from "@/stores";
import { Suspense, useEffect, useState } from "react";
import { LoadingStatus } from "@/utils/base.util";
import { Loader2 } from "lucide-react";
import { getPost } from "@/apis";
import { PostData, UserData } from "@/lib/types";
import Post from "@/components/posts/Post";
import UserTooltip from "@/components/UserTooltip";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import Linkify from "@/components/Linkify";
import FollowButton from "@/components/FollowButton";
import dynamic from "next/dynamic";

function PostPage({ postId }: { postId: string }) {

  const { user, access_token } = useAuthStore();

  const [loading, setLoading] = useState<LoadingStatus>(LoadingStatus.Loading)

  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    if (!user.id) {
      return;
    }
    async function fetchPost() {
      try {
        const { response } = await getPost(postId, access_token);
        if (response.data) {
          setPost(response.data);
          setLoading(LoadingStatus.Success);
        } else setLoading(LoadingStatus.Error);
      } catch (error) {
        console.error("Failed to fetch post", error);
        setLoading(LoadingStatus.Error);
      }
    }

    fetchPost();

  }, [user.id, postId, access_token]);

  if (loading === LoadingStatus.Loading || !post) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!user || loading === LoadingStatus.Error) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Post post={post} />
      </div>
      <div className="sticky top-[5.25rem] hidden h-fit w-80 flex-none lg:block">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <UserInfoSidebar user={post.author} />
        </Suspense>
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(PostPage), { ssr: false, loading: () => <Loader2 className="mx-auto animate-spin" /> });

interface UserInfoSidebarProps {
  user: UserData;
}

function UserInfoSidebar({ user }: UserInfoSidebarProps) {

  const loggedInUser = useAuthStore((state) => state.user)

  if (!loggedInUser.id) return null;

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">About this user</div>
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
      <Linkify>
        <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground">
          {user.bio}
        </div>
      </Linkify>
      {user.id !== loggedInUser.id && (
        <FollowButton
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            following: user._count.following,
            isFollowedByUser: user.followers.some(
              ({ followerId }) => followerId === loggedInUser.id,
            ),
          }}
        />
      )}
    </div>
  );
}
