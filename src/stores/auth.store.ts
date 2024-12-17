'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";

import { login, refresh, register } from "@/apis";
import {
  AxiosResponseErrorData,
  loginFormSchema,
  registerFormSchema,
  User,
} from "@/dtos";
import { getExp } from "@/lib/jwt";

export interface IAuthStore {
  access_token: string;
  access_token_expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  user: User;

  setAccessToken: (access_token: string) => void;
  setAccessTokenExpiresIn: (access_token_expires_in: number) => void;
  setRefreshToken: (refresh_token: string) => void;
  setRefreshTokenExpiresIn: (refresh_token_expires_in: number) => void;

  fetchLogin(
    data: z.infer<typeof loginFormSchema>,
  ): Promise<{ error: AxiosResponseErrorData | undefined }>;

  fetchRegister(
    data: z.infer<typeof registerFormSchema>,
  ): Promise<{ error: AxiosResponseErrorData | undefined }>;

  validateToken: () => Promise<boolean>;
  fethRefreshToken: () => Promise<boolean>;

  clearAuth: () => void;
  clearUser: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      isRealdy: false,
      access_token: "",
      access_token_expires_in: 0,
      refresh_token: "",
      refresh_token_expires_in: 0,
      user: {
        id: "",
        username: "",
        email: "",
        fullname: "",
        avatarUrl: "",
        bio: "",
        isVerified: false,
        roles: [],
        createAt: "",
        updateAt: "",
      },

      setAccessToken: access_token => {
        const exp = getExp(access_token);

        if (exp) {
          set({ access_token: access_token });
          get().setAccessTokenExpiresIn(exp);
        } else {
          get().clearAuth();
        }
      },

      setAccessTokenExpiresIn: access_token_expires_in => {
        if (Date.now() >= access_token_expires_in * 1000) {
          get().clearAuth();
        } else set({ access_token_expires_in });
      },

      setRefreshToken: refresh_token => {
        const exp = getExp(refresh_token);
        if (exp) {
          set({ refresh_token: refresh_token });
          get().setRefreshTokenExpiresIn(exp);
        } else {
          get().clearAuth();
        }
      },

      setRefreshTokenExpiresIn: refresh_token_expires_in => {
        if (Date.now() >= refresh_token_expires_in * 1000) {
          get().clearAuth();
        } else set({ refresh_token_expires_in });
      },

      fetchLogin: async data => {
        const { error, response } = await login(data);

        if (error) {
          const { response } = error;
          return { error: response?.data };
        }

        const { token, refreshToken, user } = response.data?.data;

        get().setAccessToken(token);
        get().setRefreshToken(refreshToken);
        set({
          user,
        });
        return { error: error };
      },

      fetchRegister: async data => {
        const { error, response } = await register(data);

        if (error) {
          const { response } = error;
          return { error: response?.data };
        }

        const { token, refreshToken, user } = response.data?.data;

        get().setAccessToken(token);
        get().setRefreshToken(refreshToken);
        set({
          user,
        });
        return { error: error };
      },

      validateToken: async () => {
        if (
          (get().access_token &&
            Date.now() < get().access_token_expires_in * 1000) ||
          (get().refresh_token &&
            Date.now() < get().refresh_token_expires_in * 1000 &&
            (await get().fethRefreshToken()))
        ) {
          return true;
        }

        get().clearAuth();
        return false;
      },

      fethRefreshToken: async () => {
        const { error, response } = await refresh(get().refresh_token);

        if (error) {
          return false;
        }

        const { token, refreshToken, user } = response.data?.data;

        get().setAccessToken(token);
        get().setRefreshToken(refreshToken);
        set({ user });

        return true;
      },

      clearUser: () => {
        set({
          user: {
            id: "",
            username: "",
            email: "",
            fullname: "",
            avatarUrl: "",
            bio: "",
            isVerified: false,
            roles: [],
            createAt: "",
            updateAt: "",
          },
        });
      },

      clearAuth: () => {
        set({
          access_token: "",
          access_token_expires_in: 0,
          refresh_token: "",
          refresh_token_expires_in: 0,
        });
        get().clearUser();
      },
    }),
    {
      name: "auth",
      onRehydrateStorage: () => (state) => ({
        ...state,
      })
      
    },
  ),
);
