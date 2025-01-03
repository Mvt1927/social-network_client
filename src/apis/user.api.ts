import { FollowerInfo, UserData } from "@/lib/types";
import { AXIOS } from "./axiosClients";

const subdirectory = "/user";

export const getProfile = async (username: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.get<UserData>(`${subdirectory}/${username}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getUserToFollow = async (access_token: string) => {
  try {
    return {
      response: await AXIOS.get<UserData[]>(`${subdirectory}/to-follow`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const followUser = async (userId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.post(
        `${subdirectory}/${userId}/follow`,
        {},
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
};

export const unfollowUser = async (userId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.delete(`${subdirectory}/${userId}/follow`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getFollowerInfo = async (userId: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.get<FollowerInfo>(
        `${subdirectory}/${userId}/follow`,
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
};

export interface FollowerPage {
  followers: UserData[];
  nextCursor: string | null;
}

export const getFollowers = async (
  access_token: string,
  pageParams: string | null,
) => {
  try {
    return {
      response: await AXIOS.get<FollowerPage>(`${subdirectory}/followers`, {
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
