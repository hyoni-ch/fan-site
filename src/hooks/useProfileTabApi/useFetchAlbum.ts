// hooks/useProfileTabApi/useFetchAlbums.ts
import { useQuery } from "@tanstack/react-query";
import { getAlbumList } from "@/api/discography";
import { Album } from "@/types/iprofile";
import { useAlbumStore } from "@/store/albumStore";

const REQUEST_TIMEOUT = 5000;

function useFetchAlbums(minLoadingTime: number = 0) {
  // zustand와 동기화하기
  const setAlbums = useAlbumStore((state) => state.setAlbums);
  const albumStoreData = useAlbumStore((state) => state.albums);

  return useQuery<Album[]>({
    queryKey: ["profile", "albums"], // 캐시 키
    queryFn: async () => {
      const start = Date.now();
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => {
          reject(new Error("요청 시간이 초과되었습니다."));
        }, REQUEST_TIMEOUT)
      );
      const dataPromise = getAlbumList({ page: 0, size: 999 });

      const result = await Promise.race([dataPromise, timeoutPromise]);

      const elapsed = Date.now() - start;
      if (elapsed < minLoadingTime) {
        await new Promise((res) => setTimeout(res, minLoadingTime - elapsed));
      }

      // 💾 상태 저장
      setAlbums(result);
      return result;
    },
    initialData: albumStoreData ?? undefined,
    staleTime: 1000 * 60 * 5, // 5분 동안은 새로 요청 안 함
    retry: 0, // 실패 시 1회 자동 재시도
    // api 요청이 실패한 상태일 때, 탭을 다시 들어오거나 alt-tab-> 이후에 자동으로 refetch 중이었음
    refetchOnWindowFocus: false,
  });
}

export default useFetchAlbums;
