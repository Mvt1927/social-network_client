"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import {
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores";
import dynamic from "next/dynamic";
import Loading from "../../loading";
import { Follower } from "./Follower";
import { getFollowers } from "@/apis/user.api";

function Followers() {

  const { access_token } = useAuthStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["user", "followers"],
    queryFn: async ({ pageParam }) => {
      const { response } = await getFollowers(access_token, pageParam);
      return response.data;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });


  const followers = data?.pages.flatMap((page) => page.followers) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !followers.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        You don&apos;t have any followers yet.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading followers.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {followers.map((follower) => (
        <Follower key={follower.id} follower={follower} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );

}
export default dynamic(() => Promise.resolve(Followers), { ssr: false, loading: () => <Loading /> });