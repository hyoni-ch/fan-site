"use client";

import { create } from "zustand";
import api from "@/utils/api"; // API 요청 함수를 import 합니다.

interface ArticleImage {
  id: number;
  url: string;
}

interface Article {
  id: number;
  title: string;
  createDate: string;
  articleImageList: ArticleImage[];
  content: string;
}

interface DiaryState {
  diaryList: Article[];
  page: number;
  hasMore: boolean;
  getDiaryList: (page: number) => Promise<void>;
  resetDiaryList: () => void;
}

const useDiaryStore = create<DiaryState>((set) => ({
  diaryList: [],
  page: 1,
  hasMore: true,
  getDiaryList: async (page) => {
    console.log("API 요청 페이지:", page);
    try {
      const response = await api.get(`/article/list`, {
        params: { page },
      });
      const newData = response.data;
      console.log(newData);
      set((state) => ({
        diaryList: [...state.diaryList, ...newData],
        page: page + 1,
        hasMore: newData.length > 0, // 데이터가 더 있는지 확인
      }));
    } catch (error) {
      console.error("일기 목록을 불러오는 중 오류가 발생했습니다.", error);
    }
  },
  resetDiaryList: () => set({ diaryList: [], page: 1, hasMore: true }),
}));

export default useDiaryStore;
