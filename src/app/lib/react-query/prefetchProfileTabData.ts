// react-query + zustand 상태를 동기화하고 데이터를 사전 로딩하는 공통 유틸
// TODO prefetchProfileTabs -> 후 리팩토링
import { QueryClient } from "@tanstack/react-query";

// queryClient.fetchQuery로 해당 key에 대한 데이터를 캐시에 저장
// zustand 스토어에 데이터 저장(setZustand) 호출
export async function prefetchProfileTabData<T>(
  queryClient: QueryClient,
  queryKey: string[],
  fetchFn: () => Promise<T[]>,
  setZustand: (data: T[]) => void
) {
  try {
    const data = await queryClient.fetchQuery({
      queryKey,
      queryFn: fetchFn,
      staleTime: 1000 * 60 * 5,
    });

    setZustand(data);
    return data;
  } catch (error) {
    console.error("📦 prefetch 실패:", error);
  }
}
