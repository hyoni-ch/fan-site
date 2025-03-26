//* 인증 관련 유틸 함수 관리
import useAuthStore from "@/store/authStore";
import api from "@/utils/api";
import { AxiosError } from "axios";

// 로그인 처리 함수 //!에러 처리 필요
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/login", { username, password });

    if (response.data.accessToken) {
      useAuthStore.setState({
        username: response.data.username,
        accessToken: response.data.accessToken,
      });
      console.log("로그인 후 상태:", useAuthStore.getState());

      return { success: true, message: "로그인 성공" };
    } else {
      return { success: false, message: "로그인 실패" };
    }
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 488) {
      return { success: false, message: "이메일 인증이 완료되지 않았습니다." };
    }
    return { success: false, message: "로그인 요청 실패" };
  }
};

// 회원가입 처리 함수 //!에러 처리 필요
export const join = async ({
  username,
  password,
  nickname,
}: {
  username: string;
  password: string;
  nickname: string;
}) => {
  try {
    const response = await api.post("/member/join", {
      username,
      password,
      nickname,
    });
    if (response.data) {
      return { success: true, message: "회원가입 성공" };
    } else {
      return { success: false, message: "회원가입 실패" };
    }
  } catch (error) {
    console.error("회원가입 에러: ", error);
  }
};

export const logout = () => {
  useAuthStore.getState().logout();
  alert("로그아웃 완료");
};
