//* 인증 관련 유틸 함수 관리
import api from "./api";
import {
  removeAccessToken,
  removeUserName,
  setAccessToken,
  setUserName,
} from "./token";

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/login", { username, password });

    console.log(response);
    if (response.data.accessToken) {
      setUserName(response.data.username);
      setAccessToken(response.data.accessToken);
      return { success: true, message: "로그인 성공" };
    } else {
      return { success: false, message: "로그인 실패" };
    }
  } catch (error) {
    console.error("로그인 오류: ", error);
    return { success: false, message: "로그인 요청 실패" };
  }
};

export const logout = () => {
  removeAccessToken();
  removeUserName();
  alert("로그아웃 완료");
};
