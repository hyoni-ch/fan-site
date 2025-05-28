import api from "@/utils/api";
import { AxiosError } from "axios";

// 다이어리 삭제 api 함수
export const deleteDiary = async (id: number) => {
  try {
    const response = await api.delete(`/article/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw new Error("게시글 정보를 찾을 수 없습니다.");
    }
    throw error;
  }
};

// 다이어리 수정 api 함수
export const updateDiary = async (
  id: number,
  updatedDiary: { title: string; content: string; imageFile?: File | null }
) => {
  try {
    const formData = new FormData();
    formData.append("title", updatedDiary.title);
    formData.append("content", updatedDiary.content);
    if (updatedDiary.imageFile) {
      formData.append("image", updatedDiary.imageFile);
    }

    const response = await api.put(`/article/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw new Error("게시글 정보를 찾을 수 없습니다.");
    }
    throw error;
  }
};
