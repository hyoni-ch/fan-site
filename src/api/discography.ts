import api from "@/utils/api";

// 앨범 CREATE
export const createAlbum = async (
  title: string,
  description: string,
  releaseDate: Date,
  tags: string,
  image: File
) => {
  if (!title || !description || !releaseDate || !tags || !image) {
    throw new Error("모든 것을 채워주세요!");
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate.toISOString().split("T")[0]);
    formData.append("tags", tags);

    const result = await api.post("/album/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(result);

    return true;
  } catch (error) {
    console.error("앨범 업로드 실패", error);
    throw error;
  }
};

// 앨범 READ 페이징
export async function getAlbumListPage(params: { page: number; size: number }) {
  try {
    const response = await api.get("/album/list", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("앨범 리스트 Error:", error);
    throw error;
  }
}

// 앨범 READ 전체
export async function getAlbumList(params: { page: number; size: number }) {
  try {
    const response = await api.get("/album/list", {
      params,
    });
    return response.data.albumResponseDTOList;
  } catch (error) {
    console.error("앨범 리스트 Error:", error);
    throw error;
  }
}

// 앨범 디테일 READ
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

// 앨범 UPDATE

// 앨범 DELETE
export const deleteAlbum = async (id: number) => {
  try {
    const response = await api.delete(`/album/${id}`);
    return response.data;
  } catch (error) {
    console.error("굿즈 삭제 Error:", error);
    throw error;
  }
};

// 트랙 CREATE
export const createTrack = async (
  id: number,
  title: string,
  description: string,
  youtubeUrl: string
) => {
  if (!title || !youtubeUrl || !description) {
    throw new Error("모든 것을 채워주세요!");
    return false;
  }

  try {
    const result = await api.post(`/album/${id}/addtrack`, {
      title,
      description,
      youtubeUrl,
    });
    console.log(result);

    return true;
  } catch (error) {
    console.error("트랙 업로드 실패", error);
    throw error;
  }
};
