import { createComment, deleteComment } from "@/apis";
import { createCommentSchema } from "@/dtos/comment.dto";
import { useToast } from "@/hooks/use-toast";
import { CommentsPage } from "@/lib/types";
import { useAuthStore } from "@/stores";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";

export function useSubmitCommentMutation(postId: string) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { access_token } = useAuthStore();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof createCommentSchema>) => {
      const { response } = await createComment(postId, data, access_token);
      return response.data;
    },
    onSuccess: async newComment => {
      const queryKey: QueryKey = ["comments", postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        oldData => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  previousCursor: firstPage.previousCursor,
                  comments: [...firstPage.comments, newComment],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Comment created",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to submit comment. Please try again.",
      });
    },
  });

  return mutation;
}

export function useDeleteCommentMutation(commentId: string) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { access_token } = useAuthStore();

  const mutation = useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      const { response } = await deleteComment(postId, commentId, access_token);
      return response.data;
    },
    onSuccess: async deletedComment => {
      const queryKey: QueryKey = ["comments", deletedComment.postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        oldData => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map(page => ({
              previousCursor: page.previousCursor,
              comments: page.comments.filter(c => c.id !== deletedComment.id),
            })),
          };
        },
      );

      toast({
        description: "Comment deleted",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete comment. Please try again.",
      });
    },
  });

  return mutation;
}
