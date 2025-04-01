import api from "@/utils/api";

export async function getAlbumList() {
  try {
    const response = await api.get("/album/list");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("앨범 리스트 Error:", error);
    throw error;
  }
}

export const getAlbumDetail = async (id: number) => {
  try {
    const response = await api.get(`/album/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
