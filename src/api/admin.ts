import { User } from "@/types/iadmin";
import api from "@/utils/api";

// 회원 정보 all get 요청!
export const getUserInfo = async (): Promise<User[]> => {
  try {
    const response = await api.get("/admin/userlist");
    console.log("유저 정보", response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 관리자 페이지 역할 부여 요청 API
export const postAddRole = async (nickname: string, roles: string[]) => {
  try {
    const response = await api.post("/admin/addrole", { nickname, roles });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
