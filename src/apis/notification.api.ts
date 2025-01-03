import { NotificationsPage } from "@/lib/types";
import { AXIOS } from "./axiosClients";

const subdirectory = "/notification";

export const getNotifications = async (
  access_token: string,
  pageParams: string | null = null,
) => {
  try {
    return {
      response: await AXIOS.get<NotificationsPage>(`${subdirectory}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: pageParams ? { cursor: pageParams } : undefined,
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const markNotificationsAsRead = async (access_token: string) => {
  try {
    return {
      response: await AXIOS.patch(`${subdirectory}/read`, undefined, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const getUnreadNotificationsCount = async (access_token: string) => {
  try {
    return {
      response: await AXIOS.get<{ unreadCount: number }>(
        `${subdirectory}/unread-count`,
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
