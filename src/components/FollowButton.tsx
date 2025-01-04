"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { followUser, unfollowUser } from "@/apis/user.api";
import { useAuthStore } from "@/stores";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data } = useFollowerInfo(userId, initialState);

  const queryKey: QueryKey = ["follower-info", userId];

  const { access_token } = useAuthStore();

  const fetchFollow = async (userId: string) => {
    if (!data.isFollowedByUser) {
      await followUser(userId, access_token);
    } else {
      await unfollowUser(userId, access_token);
    }
  }



  const { mutate } = useMutation({
    mutationFn: ({ userId }: { userId: string }) => fetchFollow(userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        following: previousState?.following || 0,
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  useCopilotReadable({
    description: "FollowerInfo of a user.",
    value: data,
  });

  useCopilotAction({
    name: "followAction",
    description: "Follow or unfollow a user.",
    parameters: [
      {
        name: "userId",
        type: "string",
        description: "The id of the user you want to follow or unfollow.",
        required: true,
        value: userId,
      },
    ],
    handler: ({ userId }) => {
      mutate({ userId });
    },
  });

  return (
    <Button
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate({ userId })}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
