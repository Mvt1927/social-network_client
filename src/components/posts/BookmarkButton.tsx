import { bookmarkPost, getBookmarkInfo, unbookmarkPost } from "@/apis";
import { useToast } from "@/hooks/use-toast";
import { BookmarkInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  postId: string;
  initialState: BookmarkInfo;
}

export default function BookmarkButton({
  postId,
  initialState,
}: BookmarkButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["bookmark-info", postId];

  const { access_token } = useAuthStore();

  const fetchBookmarkInfo = async () => {
    const { response } = await getBookmarkInfo(postId, access_token);
    return response.data;
  }

  const fetchBookmarkPost = async () => {
    await bookmarkPost(postId, access_token);
    return undefined
  }

  const fetchUnbookmarkPost = async () => {
    await unbookmarkPost(postId, access_token);
    return undefined
  }

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      fetchBookmarkInfo(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isBookmarkedByUser
        ? fetchUnbookmarkPost()
        : fetchBookmarkPost(),
    onMutate: async () => {
      toast({
        description: `Post ${data.isBookmarkedByUser ? "un" : ""}bookmarked`,
      });

      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);

      queryClient.setQueryData<BookmarkInfo>(queryKey, () => ({
        isBookmarkedByUser: !previousState?.isBookmarkedByUser,
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
    description: "postId của bài đăng này",
    value: postId,
  });

  useCopilotReadable({
    description: "thông tin bookmark của bài đăng này",
    value: data,
  });

  useCopilotAction({
    name: "bookmarkAction",
    description: "Bookmark this post, nếu đã bookmark thì unbookmark",
    handler: mutate,
  });

  return (
    <button onClick={() => mutate()} className="flex items-center gap-2">
      <Bookmark
        className={cn(
          "size-5",
          data.isBookmarkedByUser && "fill-primary text-primary",
        )}
      />
    </button>
  );
}
