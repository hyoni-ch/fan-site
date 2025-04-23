//TODO 2차 리팩토링 실제 사용될 부분 코드
import { useQuery } from "@tanstack/react-query";

interface UseProfileTabDataProps<T> {
  queryKey: string[];
  fetchFn: () => Promise<T[]>;
  setZustand: (data: T[]) => void;
  zustandData: T[] | null;
  minLoadingTime?: number;
  requestTimeout?: number;
}

export function useProfileTabData<T>({
  queryKey,
  fetchFn,
  setZustand,
  zustandData,
  minLoadingTime = 0,
  requestTimeout = 5000,
}: UseProfileTabDataProps<T>) {
  return useQuery<T[]>({
    queryKey,
    queryFn: async () => {
      const start = Date.now();

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("요청 시간이 초과되었습니다.")),
          requestTimeout
        )
      );
      const dataPromise = fetchFn();

      const result = await Promise.race([dataPromise, timeoutPromise]);

      const elapsed = Date.now() - start;
      if (elapsed < minLoadingTime) {
        await new Promise((res) => setTimeout(res, minLoadingTime - elapsed));
      }

      setZustand(result);
      return result;
    },
    initialData: zustandData ?? undefined,
    staleTime: 1000 * 60 * 5,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
