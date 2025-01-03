// import { LikeInfo } from "@/lib/types";
import { createReaction as createReactionApi, deleteReaction as deleteReactionApi, getReactions } from "@/apis/reaction.api";
import { useToast } from "@/hooks/use-toast";
import { ReactionInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores";
import { ReactionType } from "@prisma/client";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface ReactionButtonProps {
  postId: string;
  initialState: ReactionInfo;
}

export default function ReactionButton({ postId, initialState }: ReactionButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["reaction-info", postId];

  const { access_token } = useAuthStore();

  const getReactionInfo = async () => {
    const { response } = await getReactions(postId, access_token);
    return response.data;
  }

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      getReactionInfo(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const deleteReaction = async () => {
    await deleteReactionApi(postId, access_token);
    return undefined;
  }

  const createReaction = async () => {
    await createReactionApi(postId, access_token, {
      type: ReactionType.LIKE,
    });

    return undefined;
  }

  const { mutate } = useMutation({
    mutationFn: () =>
      data.userReactionType !== null
        ? deleteReaction()
        : createReaction(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<ReactionInfo>(queryKey);

      queryClient.setQueryData<ReactionInfo>(queryKey, () => ({
        reaction:
          (previousState?.reaction || 0) + (previousState?.userReactionType !== null ? -1 : 1),
        userReactionType: previousState?.userReactionType === null ? ReactionType.LIKE : null,
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

  return (
    <button onClick={() => mutate()} className="flex items-center gap-2">
      <Heart
        className={cn(
          "size-5",
          (data.userReactionType === ReactionType.LIKE) && "fill-red-500 text-red-500",
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {data.reaction} <span className="hidden sm:inline">likes</span>
      </span>
    </button>
  );
}
