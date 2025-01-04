'use client'

import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";
import { useAuthStore } from "@/stores";
import { getTrendingTags } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { useCopilotReadable } from "@copilotkit/react-core";

export function useGetTrendingTopics() {

  const { access_token } = useAuthStore();

  const fetchTrendingTags = async () => {
    const { response } = await getTrendingTags(access_token);
    console.log("fetchTrendingTags", response);
    return response.data;
  }

  const query = useQuery({
    queryKey: ["trending-tags"],
    queryFn: () => fetchTrendingTags(),
    initialData: [],
    enabled: !!access_token,
  });

  return query

}

export function TrendingTopics() {
  const { data: trendingTopics, status } = useGetTrendingTopics();

  useCopilotReadable({
    description: "The list of trending hashtag.",
    value: trendingTopics,
  });

  if (status === "error" || trendingTopics.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="font-bold">Trending topics</CardHeader>
      <CardContent className="space-y-2">
        {trendingTopics.map(({ hashtag, count }) => {
          const title = hashtag.split("#")[1];
          return (
            <Link key={title} href={`/hashtag/${title}`} className={`block group`}>
              <p
                className="line-clamp-1 break-all font-semibold group-hover:underline"
                title={hashtag}
              >
                {hashtag}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatNumber(count)} {count === 1 ? "post" : "posts"}
              </p>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
