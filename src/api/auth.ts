//* 인증 관련 유틸 함수 관리
import useAuthStore from "@/store/authStore";
import api from "@/utils/api";
import { AxiosError, AxiosResponse } from "axios";

// 로그인 처리 함수 //!에러 처리 필요
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/login", { username, password });

    if (response.data.accessToken) {
      useAuthStore.setState({
        username: response.data.username,
        accessToken: response.data.accessToken,
        userNickname: response.data.nickname,
        roles: response.data.roles,
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

// 현재 로그인한 회원 정보 get 요청!
export const getUser = () => {
  try {
    const response = api.get("/home");
    return response;
  } catch (error) {
    console.error("회원정보를 가지고 오는데 실패했습니다!", error);
  }
};

// 회원가입 메일 인증 요청
interface ErrorResponse {
  message?: string;
  code?: string | number;
}

export const verifyEmail = async (
  token: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response: AxiosResponse<void> = await api.post(
      `/member/verify-email?token=${token}`
    );
    console.log("이메일 인증 성공:", response.status);
    return { success: true, message: "이메일 인증이 완료되었습니다." };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error("이메일 인증 실패:", axiosError.response?.status, axiosError);

    let errorMessage = "이메일 인증에 실패했습니다.";

    if (axiosError.response?.status === 404) {
      errorMessage = "유효하지 않은 인증 링크입니다.";
    } else if (axiosError.response?.status === 400) {
      errorMessage = "잘못된 요청입니다. 다시 시도해주세요.";
    } else if (axiosError.message === "Network Error") {
      errorMessage = "네트워크 연결에 실패했습니다. 잠시 후 다시 시도해주세요.";
    } else if (axiosError.response?.data?.message) {
      errorMessage = axiosError.response.data.message;
    } else if (axiosError.response?.data?.code) {
      errorMessage = `오류 코드: ${axiosError.response.data.code}. 관리자에게 문의해주세요.`;
    }

    return { success: false, message: errorMessage };
  }
};
