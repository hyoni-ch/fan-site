import api from "@/utils/api";

export const writeDiary = async (
  title: string,
  content: string,
  imageFile: File | null
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    const response = await api.post("/article/write", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("작성 실패", error);
    throw error;
  }
};
