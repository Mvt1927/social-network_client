import { createPostSchema } from "@/dtos/post.dto";
import { z } from "zod";
import { AXIOS } from "./axiosClients";
import { BookmarkInfo, PostData, PostsPage } from "@/lib/types";

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

export const getPosts = async (
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

export const searchPosts = async (
  query: string,
  access_token: string,
  pageParams: string | null = null,
) => {
  try {
    return {
      response: await AXIOS.get<PostsPage>(`${subdirectory}/search`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          q: query,
          cursor: pageParams,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getPost = async (postId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.get<PostData>(`${subdirectory}/${postId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getPostsByUser = async (
  userId: string,
  access_token: string,
  pageParams: string | null = null,
) => {
  try {
    return {
      response: await AXIOS.get<PostsPage>(`/user/${userId}${subdirectory}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: pageParams
          ? {
              cursor: pageParams,
            }
          : undefined,
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getBookmarkInfo = async (postId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.get<BookmarkInfo>(`${subdirectory}/${postId}/bookmark`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const bookmarkPost = async (postId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.post<BookmarkInfo>(`${subdirectory}/${postId}/bookmark`, undefined, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const unbookmarkPost = async (postId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.delete<BookmarkInfo>(`${subdirectory}/${postId}/bookmark`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getTrendingTags = async (access_token: string) => {
  try {
    return {
      response: await AXIOS.get<{ hashtag: string; count: number }[]>(
        `${subdirectory}/trending`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
    };
  } catch (error: unknown) {
    throw error;
  }
}
