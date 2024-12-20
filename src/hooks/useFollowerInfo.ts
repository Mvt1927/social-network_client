import { FollowerInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerInfo(
  userId: string,
  initialState: FollowerInfo,
) {
  const query = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () => ({
      followers: 0,
      isFollowedByUser: false,
    }),
    initialData: initialState,
    staleTime: Infinity,
  });

  return query;
}
