import api from "@/utils/api";

// 굿즈 CREATE
export const createGoods = async (
  name: string,
  description: string,
  price: string,
  image: File
) => {
  if (!name || !description || !price || !image) {
    throw new Error("모든 것을 채워주세요!");
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    const result = await api.post("/goods/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(result);

    return true;
  } catch (error) {
    console.error("굿즈 업로드 실패", error);
    throw error;
  }
};

// 굿즈 리스트 READ
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

// 굿즈 디테일 READ
export const getGoodsDetail = async (id: number) => {
  try {
    const response = await api.get(`/goods/${id}`);
    return response.data;
  } catch (error) {
    console.error("굿즈 디테일 Error:", error);
    throw error;
  }
};

// 굿즈 수정 UPDATE
export const updateGoods = async (
  id: number,
  name: string,
  description: string,
  price: string,
  image: File | null
) => {
  if (!name || !description || !price) {
    throw new Error("모든 것을 채워주세요!");
    return false;
  }
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    const result = await api.post(`/goods/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(result);

    return true;
  } catch (error) {
    console.error("굿즈 업데이트 Error:", error);
    throw error;
  }
};

// 굿즈 DELETE
export const deleteGoods = async (id: number) => {
  try {
    const response = await api.delete(`/goods/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error("굿즈 삭제 Error:", error);
    throw error;
  }
};
