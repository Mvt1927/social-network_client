import { getFollowerInfo } from "@/apis/user.api";
import { FollowerInfo } from "@/lib/types";
import { useAuthStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerInfo(
  userId: string,
  initialState: FollowerInfo,
) {
  const { access_token } = useAuthStore();

  const fetchFollowerInfo = async () => {
    const { response } = await getFollowerInfo(userId, access_token);
    console.log(response.data);
    return response.data;
  };

  const query = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () => fetchFollowerInfo(),
    initialData: initialState,
  });

  return query;
}
