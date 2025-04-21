import { QueryClient } from "@tanstack/react-query";
import { getAlbumList } from "@/api/discography";
import { useAlbumStore } from "@/store/albumStore";

export const prefetchAlbums = async (queryClient: QueryClient) => {
  try {
    const data = await queryClient.fetchQuery({
      queryKey: ["profile", "albums"],
      queryFn: getAlbumList,
      staleTime: 1000 * 60 * 5, // 5분 캐시
    }); // zustand에도 저장

    console.log("✅ prefetch된 앨범 데이터:", data);
    useAlbumStore.getState().setAlbums(data);

    const zustandAlbums = useAlbumStore.getState().albums;
    console.log("✅ zustand에 저장된 앨범 데이터:", zustandAlbums);

    return data;
  } catch (error) {
    console.error("preload 실패:", error);
  }
};
