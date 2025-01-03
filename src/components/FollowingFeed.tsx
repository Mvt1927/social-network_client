"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores";
import { getPosts } from "@/apis";
import Post from "@/components/posts/Post";
import dynamic from "next/dynamic";
import { useCopilotReadable } from "@copilotkit/react-core";

function FollowingFeed() {

  const { access_token } = useAuthStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "following"],
    queryFn: async ({ pageParam }) => {

      const { response } = await getPosts({
        value: "FOLLOWING"
      }, access_token, pageParam
      )
      console.log(response)
      return response.data
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  useCopilotReadable({
    description: "The list of posts in the following feed.",
    value: posts,
  });

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No posts found. Start following people to see their posts here.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
export default dynamic(() => Promise.resolve(FollowingFeed), { ssr: false, loading: () => <PostsLoadingSkeleton /> });