"use client";

import { create } from "zustand";
import api from "@/utils/api";
import { DiaryState } from "@/types/diaryMain";

const useDiaryStore = create<DiaryState>((set, get) => ({
  diaryList: [],
  page: 0,
  hasMore: true,
  isLoading: false,

  getDiaryList: async (nextPage?: number) => {
    const { isLoading, page, hasMore } = get();
    if (isLoading || !hasMore) return;
    const fetchPage = nextPage ?? page;

    set({ isLoading: true });

    try {
      const response = await api.get("/article/list", {
        params: { page: fetchPage },
      });

      const newData = response.data;

      set((state) => ({
        diaryList: [...state.diaryList, ...newData],
        page: fetchPage + 1,
        hasMore: newData.length > 0,
        isLoading: false,
      }));
    } catch (error) {
      console.error("일기 목록 요청 중 오류:", error);
      alert("일기 데이터를 불러오는데 실패했어요. 나중에 다시 시도해주세요.");
      set({ isLoading: false, hasMore: false });
    }
  },
}));

export default useDiaryStore;
