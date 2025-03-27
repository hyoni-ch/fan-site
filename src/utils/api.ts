"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import useAuthStore, { getAccessToken, getUserName } from "@/store/authStore";

const api = axios.create({
  baseURL: "http://61.99.26.112:3001", // 서버 기본 URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      // 401 에러 발생 시 토큰 갱신
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 무한 루프 방지
        const username = getUserName();

        try {
          const { data } = await axios.post(
            "http://61.99.26.112:3001/refresh",
            { username },
            { withCredentials: true }
          );

          if (data.accessToken) {
            useAuthStore.getState().setAccessToken(data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          } else {
            useAuthStore.getState().logout();
            const router = useRouter();
            router.push("/login");
          }
        } catch (refreshError) {
          console.log("토큰 갱신 실패", refreshError);
          useAuthStore.getState().logout();
          const router = useRouter();
          router.push("/login");
        }
      }

      if (error.response.status === 400) {
        useAuthStore.getState().logout();
        const router = useRouter();
        router.push("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
