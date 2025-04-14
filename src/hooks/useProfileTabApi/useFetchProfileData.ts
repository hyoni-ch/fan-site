import { useState, useEffect, useCallback, useRef } from "react";

function useFetchProfileData<T>(
  fetchFunction: () => Promise<T>,
  // 최소 로딩 시간 (ms)
  minLoadingTime: number = 0
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // 타이머 직접 설정
  const loadingTimer = useRef<NodeJS.Timeout | null>(null);
  const hasFetched = useRef(false); // 첫 데이터 로딩 완료 여부 추적

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // 시작 시간 받기
    const startTime = Date.now();

    try {
      const response = await fetchFunction();
      setData(response);
      // 데이터 로딩 성공
      hasFetched.current = true;

      const endTime = Date.now();
      const elapsedTime = endTime - startTime;

      if (elapsedTime < minLoadingTime) {
        //최소 로딩 시간보다 짧게 걸리면, 남은 시간만큼 딜레이 후 로딩 상태 해제
        await new Promise(
          (resolve) =>
            (loadingTimer.current = setTimeout(
              resolve,
              minLoadingTime - elapsedTime
            ))
        );
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error occurred"));
      }
    } finally {
      if (loadingTimer.current) {
        clearTimeout(loadingTimer.current);
      }
      if (!hasFetched.current) {
        setLoading(false);
      }
    }
  }, [fetchFunction, minLoadingTime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetchProfileData;
