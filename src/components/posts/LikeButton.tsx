// import { LikeInfo } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ReactionInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  postId: string;
  initialState: ReactionInfo;
}

export default function LikeButton({ postId, initialState }: LikeButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["like-info", postId];

  const { data } = useQuery({
    queryKey,
    // queryFn: () =>
    //   kyInstance.get(`/api/posts/${postId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    // mutationFn: () =>
    //   data.isLikedByUser
    //     ? kyInstance.delete(`/api/posts/${postId}/likes`)
    //     : kyInstance.post(`/api/posts/${postId}/likes`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<ReactionInfo>(queryKey);

      queryClient.setQueryData<ReactionInfo>(queryKey, () => ({
        reactions:
          (previousState?.reactions || 0) + (previousState?.isreactedByUser ? -1 : 1),
        isreactedByUser: !previousState?.isreactedByUser,
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
          data.isreactedByUser && "fill-red-500 text-red-500",
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {data.reactions} <span className="hidden sm:inline">likes</span>
      </span>
    </button>
  );
}
