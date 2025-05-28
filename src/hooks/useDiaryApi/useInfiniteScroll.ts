"use client";

import { useCallback, useEffect } from "react";
import useDiaryStore from "@/store/diaryStore";

export const useDiaryInfiniteScroll = () => {
  const { diaryList, page, hasMore, isLoading, getDiaryList } = useDiaryStore();

  // 초기 로드
  useEffect(() => {
    if (diaryList.length === 0 && !isLoading) {
      getDiaryList(page);
    }
  }, [diaryList.length, isLoading, page, getDiaryList]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const isBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;

    if (isBottom && hasMore && !isLoading) {
      getDiaryList();
    }
  }, [hasMore, isLoading, getDiaryList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};
