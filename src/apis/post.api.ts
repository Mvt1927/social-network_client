import { createPostSchema } from "@/dtos/post.dto";
import { z } from "zod";
import { AXIOS } from "./axiosClients";
import { PostData, PostsPage } from "@/lib/types";

const subdirectory = "/post";

export const createPost = async (
  data: z.infer<typeof createPostSchema>,
  access_token: string,
) => {
  try {
    return {
      response: await AXIOS.post<PostData>(`${subdirectory}`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getPost = async (
  data: {
    value: string;
  } = {
    value: "",
  },
  access_token: string,
  pageParams: string | null = null,
) => {
  try {
    return {
      response: await AXIOS.get<PostsPage>(
        `${subdirectory}${data.value ? "?postType=" + data.value : ""}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: pageParams
            ? {
                cursor: pageParams,
              }
            : undefined,
        },
      ),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const deletePost = async (postId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.delete<PostData>(`${subdirectory}/${postId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const updatePost = async (
  postId: string,
  data: z.infer<typeof createPostSchema>,
  access_token: string,
) => {
  try {
    return {
      response: await AXIOS.put<PostData>(`${subdirectory}/${postId}`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};
