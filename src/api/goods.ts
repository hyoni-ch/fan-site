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

export const createGoods = async (
  name: string,
  description: string,
  price: string,
  image: File
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("image", image);
  if (!name || !description || !price || !image) {
    throw new Error("모든 것을 채워주세요!");
    return false;
  }

  try {
    const result = await api.post("/goods/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // multipart/form-data를 명시적으로 지정
      },
    });
    console.log(result);

    return true;
  } catch (error) {
    console.error("굿즈 업로드 실패", error);
    throw error;
  }
};
