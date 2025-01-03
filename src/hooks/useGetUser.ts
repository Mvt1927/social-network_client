"use client";

import { getProfile } from "@/apis/user.api";
import { UserData } from "@/lib/types";
import { useAuthStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(username: string) {
  const { access_token } = useAuthStore();
  const fetchProfile = async () => {
    const { response } = await getProfile(username, access_token);
    return response.data;
  };

  const query = useQuery<UserData | null>({
    queryKey: ["user", username],
    queryFn: () => fetchProfile(),
    initialData: null,
    enabled: !!access_token,
    staleTime: Infinity,
  });

  return query;
}
