import { z } from "zod";
import { AxiosError, AxiosResponse } from "axios";

import { AXIOS } from "@/apis";
import {
  AuthData,
  AxiosResponseErrorData,
  AxiosResponseSuccessData,
  loginFormSchema,
  registerFormSchema,
} from "@/dtos";

const subdirectory = "/auth";

export const login = async (
  data: z.infer<typeof loginFormSchema>,
): Promise<
  | {
      error?: undefined;
      response: AxiosResponse<AxiosResponseSuccessData<AuthData>>;
    }
  | {
      error: AxiosError<AxiosResponseErrorData>;
      response?: undefined;
    }
> => {
  try {
    return {
      response: await AXIOS.post(`${subdirectory}/signin`, data),
      error: undefined,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        error: error as AxiosError<AxiosResponseErrorData>,
      };
    }
    throw error;
  }
};

export const register = async (
  data: z.infer<typeof registerFormSchema>,
): Promise<
  | {
      error?: undefined;
      response: AxiosResponse<AxiosResponseSuccessData<AuthData>>;
    }
  | {
      error: AxiosError<AxiosResponseErrorData>;
      response?: undefined;
    }
> => {
  try {
    delete data.confirmPassword;
    return {
      response: await AXIOS.post(`${subdirectory}/signup`, data),
      error: undefined,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        error: error as AxiosError<AxiosResponseErrorData>,
      };
    }
    throw error;
  }
};

export const refresh = async (
  refresh_token: string,
): Promise<
  | {
      error?: undefined;
      response: AxiosResponse<AxiosResponseSuccessData<AuthData>>;
    }
  | {
      error: AxiosError<AxiosResponseErrorData>;
      response?: undefined;
    }
> => {
  try {
    return {
      response: await AXIOS.get(`${subdirectory}/signin/refresh`, {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }),
      error: undefined,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        error: error as AxiosError<AxiosResponseErrorData>,
      };
    }
    throw error;
  }
};
