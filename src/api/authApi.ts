import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/service/apiClient";
import { JwtPayload, jwtDecode } from "jwt-decode";
import {
  AUTH_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  getCookie,
  setCookie,
} from "@/lib/universalCookie";
import { forceLogout } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { User, UserEnum } from "@/interfaces/User";

// const queryClient = useQueryClient();

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api().post("/auth/login", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logoutApi = async () => {
  try {
    const response = await api().post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const refreshTokenApi = async () => {
  try {
    const response = await api().post("/auth/token/refresh", {
      refreshToken: getCookie(REFRESH_TOKEN_NAME),
    });
    if (response.data?.token) {
      const newToken = response.data?.token;
      setCookie(AUTH_TOKEN_NAME, newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    } else {
      forceLogout();
    }
  } catch (error) {
    forceLogout();
  }
};

export const signupApi = async (payload: {
  name: string;
  email: string;
  phone: string;
  address: string;
  category: UserEnum;
  password: string;
}) => {
  try {
    const response = await api().post("/user/create", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (data.success && data.token) {
        setCookie(AUTH_TOKEN_NAME, data.token);
        setCookie(REFRESH_TOKEN_NAME, data.refreshToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate("/dashboard");
      }
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
    onSettled() {
      forceLogout();
    },
  });
};

export const getUserFromToken = () => {
  const authToken = getCookie(AUTH_TOKEN_NAME);
  if (!authToken) return null;

  try {
    const decoded: any = jwtDecode(authToken);
    return decoded;
  } catch (error) {
    console.log("Error decoding token", error);
    return null;
  }
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupApi,
    onSuccess(data) {
      if (data.success) {
        navigate("/");
      }
    },
    onError(error) {
      console.log(error);
    },
  });
};
