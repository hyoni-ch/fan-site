// axios 인스턴스 + interceptor 리팩토링
"use client";

import axios from "axios";
import useAuthStore from "@/store/authStore";
import { logout } from "@/api/auth";

const api = axios.create({
  baseURL: "/api", // 서버 기본 URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    // const token = getAccessToken();
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
        const username = useAuthStore.getState().username;
        const token = useAuthStore.getState().accessToken;

        if (!username || !token) {
          // logout(); // or 그냥 return Promise.reject(error);
          // return;
          return Promise.reject(error);
        }
        originalRequest._retry = true; // 무한 루프 방지

        try {
          const { data } = await api.post(`/refresh`, {
            username,
            token,
          });

          if (data.accessToken) {
            useAuthStore.getState().setAccessToken(data.accessToken);
            // 해당 부분은 만약 POST 요청이나 파일 업로드 같은 api 요청 과정에서 에러가 발생했다면? 백업 복제 유틸
            const cloneRequest = {
              ...originalRequest,
              headers: { ...originalRequest.headers },
            };
            return api(cloneRequest);
            // originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            // return api(originalRequest);
          } else {
            logout();
          }
        } catch (refreshError) {
          console.log("토큰 갱신 실패", refreshError);
          logout();
        }
      }

      if (error.response.status === 499) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        // useAuthStore.getState().clearAuthData();
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
