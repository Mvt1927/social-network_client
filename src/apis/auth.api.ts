import { z } from "zod";
import { AxiosError, AxiosResponse } from "axios";

import { AXIOS } from "@/apis";
import {
  AuthData,
  AxiosResponseErrorData,
  AxiosResponseSuccessData,
  loginFormSchema,
  registerFormSchema,
  updateUserProfileSchema,
  User,
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

export const verify = async (
  code: string,
  access_token: string,
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
      response: await AXIOS.post(
        `${subdirectory}/verify/${code}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
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

export const requestVerify = async (
  email: string,
  access_token: string,
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
      response: await AXIOS.post(
        `${subdirectory}/request-verify`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
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

export const verifyWithToken = async (token: string) => {
  try {
    return {
      respone: await AXIOS.post(
        `${subdirectory}/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
      error: undefined,
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const logout = async (refresh_token: string, access_token: string) => {
  try {
    return {
      response: await AXIOS.post(
        `${subdirectory}/logout`,
        {
          refresh_token,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
      error: undefined,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        error: error as AxiosError,
      };
    }
    throw error;
  }
};

export const updateProfile = async (
  data: z.infer<typeof updateUserProfileSchema>,
  access_token: string,
): Promise<
  | {
      error?: undefined;
      response: AxiosResponse<
        AxiosResponseSuccessData<{
          user: User;
        }>
      >;
    }
  | {
      error: AxiosError<AxiosResponseErrorData>;
      response?: undefined;
    }
> => {
  try {
    return {
      response: await AXIOS.patch(`${subdirectory}/profile`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
      error: undefined,
    };
  } catch (error: unknown) {
    throw error;
  }
};
