import api from "@/utils/api";

export const getGoodsList = async (params: {
  sort: string;
  name: string;
  page: number;
  size: number;
}) => {
  try {
    const response = await api.get("/goods/list", { params });
    return response.data;
  } catch (error) {
    console.error("굿즈 리스트 Error:", error);
    throw error;
  }
};

export const getGoodsDetail = async (id: number) => {
  try {
    const response = await api.get(`/goods/${id}`);
    return response.data;
  } catch (error) {
    console.error("굿즈 디테일 Error:", error);
    throw error;
  }
};
