"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Loading from "../app/(main)/loading";
import { getPosts } from "@/apis";
import { useAuthStore } from "@/stores";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "./posts/PostsLoadingSkeleton";
import dynamic from "next/dynamic";

function ForYouFeed() {

  const { access_token } = useAuthStore();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: async ({ pageParam }) => {

      const { response } = await getPosts({
        value: "FOR_YOU"
      }, access_token, pageParam
      )
      return response.data
    },

    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];


  if (status === "pending") {
    return <Loading />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  if (status === "error") {

    // if(error.name === "UnauthorizedError") {
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
export default dynamic(() => Promise.resolve(ForYouFeed), { ssr: false, loading: () => <PostsLoadingSkeleton /> });