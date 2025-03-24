import axios from "axios";
import {
  getAccessToken,
  getUserName,
  removeAccessToken,
  setAccessToken,
} from "./token";
import router from "next/router";

const api = axios.create({
  baseURL: "http://121.172.50.141:8080", // 백엔드 기본 URL
  withCredentials: true, // 세션 쿠키 포함
  headers: {
    "Content-Type": "application/json",
  },
});

// API 요청을 보낼 때마다 따로 헤더 설정할 필요 없음
api.interceptors.request.use(
  (config) => {
    // JWT 토큰을 자동으로 Authorization 헤더에 포함
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
      //401에러 발생하면? 토큰 갱신
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; //무한 루프 방지

        const username = getUserName();

        try {
          const { data } = await axios.post(
            "http://121.172.50.141:8080/refresh",
            { username },
            { withCredentials: true }
          );

          setAccessToken(data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.log("토큰 갱신 실패", refreshError);
          removeAccessToken();
          router.push("/login");
        }
      }

      if (error.response.status === 400) {
        removeAccessToken();
        router.push("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
