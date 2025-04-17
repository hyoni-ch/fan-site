import { useState, useEffect, useCallback, useRef } from "react";

function useFetchProfileData<T>(
  fetchFunction: () => Promise<T>,
  // 최소 로딩 시간 (ms)
  minLoadingTime: number = 0,
  // 타임아웃 시간 (ms), 기본값 10초
  timeout: number = 10000
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // 타이머 직접 설정
  const loadingTimer = useRef<NodeJS.Timeout | null>(null);
  const hasFetched = useRef(false); // 첫 데이터 로딩 완료 여부 추적
  const timeoutTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    hasFetched.current = false;

    // 시작 시간 받기
    const startTime = Date.now();

    // 타임아웃 설정하기
    timeoutTimer.current = setTimeout(() => {
      // 이미 데이터를 가져왔다면 에러 상태를 업데이트하지 않음
      if (!hasFetched.current) {
        setLoading(false);
        setError(new Error("요청 시간 초과되었습니다. 다시 시도해주세요."));
      }
      // 타임아웃 발생 시 hasFetched를 true로 설정하지 않음.
    }, timeout);

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
        setError(new Error("알 수 없는 오류가 발생했습니다."));
      }
      setLoading(false);
    } finally {
      if (loadingTimer.current) {
        clearTimeout(loadingTimer.current);
      }
      if (timeoutTimer.current) {
        clearTimeout(timeoutTimer.current);
      }
    }
  }, [fetchFunction, minLoadingTime, timeout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetchProfileData;
