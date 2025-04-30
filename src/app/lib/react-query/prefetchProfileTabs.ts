import { QueryClient } from "@tanstack/react-query";
import { getAlbumList } from "@/api/discography";
import { getConcertList, getDramaList } from "@/api/profile";
import { useAlbumStore } from "@/store/profile/albumStore";
import { useDramaStore } from "@/store/profile/dramaStore";
import { useConcertStore } from "@/store/profile/concertStore";
import { prefetchProfileTabData } from "./prefetchProfileTabData";
// CSR 초기 진입 시 모든 프로필 탭에 필요한 데이터를 미리 불러오는 역할
// queryClient를 이용 react-query 캐시에 데이터를 미리 저장
// 동시에 그 데이터를 zustand 전역 상태에 저장(prefetch 기능)
export async function prefetchAllProfileTabs(queryClient: QueryClient) {
  try {
    await Promise.all([
      prefetchProfileTabData(
        queryClient,
        ["profile", "albums"],
        // getAlbumList,
        () => getAlbumList({ page: 0, size: 999 }),
        useAlbumStore.getState().setAlbums
      ),
      prefetchProfileTabData(
        queryClient,
        ["profile", "dramas"],
        getDramaList,
        useDramaStore.getState().setDramas
      ),
      prefetchProfileTabData(
        queryClient,
        ["profile", "concerts"],
        getConcertList,
        useConcertStore.getState().setConcerts
      ),
    ]);
    const albums = useAlbumStore.getState().albums;
    const dramas = useDramaStore.getState().dramas;
    const concerts = useConcertStore.getState().concerts;
    console.log({ albums, dramas, concerts });
    console.log("✅ profile tab prefetch 완료");
  } catch (error) {
    console.error("❌ profile tab prefetch 실패:", error);
  }
}
