//* 인증 관련 유틸 함수 관리
import useAuthStore from "@/store/authStore";
import { ErrorAlertProps } from "@/types/ialertProp";
import api from "@/utils/api";
import { AxiosError, AxiosResponse } from "axios";

// 로그인 처리 함수 //!에러 처리 필요
export const login = async (
  username: string,
  password: string
): Promise<ErrorAlertProps> => {
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
    console.log(error);
    const axiosError = error as AxiosError<ErrorAlertProps>;

    if (axiosError.response?.status === 488) {
      return { success: false, message: "이메일 인증이 완료되지 않았습니다." };
    } else if (axiosError.response?.status === 400) {
      return {
        success: false,
        message: "잘못된 유저 정보입니다. 다시 입력해주세요.",
      };
    }
    return { success: false, message: "로그인 요청 실패" };
  }
};

// 회원가입 처리 함수
export const join = async ({
  username,
  password,
  nickname,
}: {
  username: string;
  password: string;
  nickname: string;
}): Promise<ErrorAlertProps> => {
  try {
    const response = await api.post<ErrorAlertProps>("/member/join", {
      username,
      password,
      nickname,
    });
    return { success: true, message: response.data.message || "회원가입 성공" };
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ErrorAlertProps>;

    if (axiosError.response?.status === 409) {
      return {
        success: false,
        message:
          axiosError.response.data?.message ||
          "중복된 이메일 혹은 닉네임 입니다.",
      };
    } else if (axiosError.response?.status === 400) {
      return {
        success: false,
        message:
          axiosError.response.data?.message ||
          "비밀번호는 7자 이상으로 설정해주세요.",
      };
    }
    return { success: false, message: "회원가입 요청 실패" };
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

export const verifyEmail = async (token: string): Promise<ErrorAlertProps> => {
  try {
    const response: AxiosResponse<void> = await api.post(
      `/member/verify-email?token=${token}`
    );
    console.log("이메일 인증 성공:", response.status);
    return { success: true, message: "이메일 인증이 완료되었습니다." };
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError<ErrorAlertProps>;

    if (axiosError.response?.status === 404) {
      return {
        success: false,
        message:
          axiosError.response.data?.message || "유효하지 않은 인증 링크입니다.",
      };
    } else if (axiosError.response?.status === 400) {
      return {
        success: false,
        message:
          axiosError.response.data?.message ||
          "요청 시간이 만료되었습니다. 다시 시도해주세요.",
      };
    }
    return {
      success: false,
      message: "예기치 못한 오류가 발생하였습니다. 관리자에게 문의해주세요.",
    };
  }
};
