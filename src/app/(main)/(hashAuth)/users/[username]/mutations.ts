import { UpdateUserProfileValues } from "@/dtos";
import { useToast } from "@/hooks/use-toast";
import { PostsPage } from "@/lib/types";
import { useUploadThing } from "@/lib/uploadthing";
import { useAuthStore } from "@/stores";
import {
  InfiniteData,
  QueryFilters,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useUpdateProfileMutation() {
  const { toast } = useToast();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { startUpload: startAvatarUpload } = useUploadThing("avatar");

  const { fetchUpdateProfile } = useAuthStore();

  const updateUserProfile = async (values: UpdateUserProfileValues) => {
    const { user } = await fetchUpdateProfile(values);

    if (!user || !user.id) {
      throw new Error("Failed to update profile");
    }
    return user;
  };

  const mutation = useMutation({
    mutationFn: async ({
      values,
      avatar,
    }: {
      values: UpdateUserProfileValues;
      avatar?: File;
    }) => {
      if (avatar) {
        const uploadResult = await startAvatarUpload([avatar]);
        if (uploadResult) {
          values.avatarUrl = uploadResult[0].url;
        }
      }
      return {
        avatarUrl: values.avatarUrl,
        updatedUser: await updateUserProfile(values),
      };
    },
    onSuccess: async ({ avatarUrl, updatedUser }) => {
      const newAvatarUrl = avatarUrl ? avatarUrl : undefined;

      const queryFilter: QueryFilters<
        InfiniteData<PostsPage, string | null>,
        Error,
        InfiniteData<PostsPage, string | null>,
        QueryKey
      > = {
        queryKey: ["post-feed"],
      };

      queryClient.invalidateQueries({
        queryKey: ["user", updatedUser.username],
      });
      
      await queryClient.cancelQueries(queryFilter);


      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        oldData => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map(page => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map(post => {
                if (post.authorId === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      avatarUrl: newAvatarUrl || updatedUser.avatarUrl,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        },
      );

      router.refresh();

      toast({
        description: "Profile updated",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to update profile. Please try again.",
      });
    },
  });

  return mutation;
}
