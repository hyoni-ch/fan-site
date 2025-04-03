import api from "@/utils/api";

// 아티스트의 참여 작품 목록 조회
export const getDramaList = async () => {
  try {
    const response = await api.get("/career/list");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 참여 콘서트 목록 조회
export const getConcertList = async () => {
  try {
    const response = await api.get("/concert/list");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
