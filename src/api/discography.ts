import api from "@/utils/api";

export const getAlbumList = async () => {
  try {
    const response = await api.get("/album/list");
    return response.data;
  } catch (error) {
    console.error("앨범 리스트 Error:", error);
    throw error;
  }
};
