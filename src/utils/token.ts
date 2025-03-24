// 토큰 관련 로직

export const getAccessToken = () => localStorage.getItem("accessToken");

export const getUserName = () => localStorage.getItem("username");

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const setUserName = (userId: string) => {
  localStorage.setItem("username", userId);
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const removeUserName = () => {
  localStorage.removeItem("username");
};
