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
  isLoading: boolean;
  getDiaryList: (page: number) => Promise<void>;
  resetDiaryList: () => void;
}

const useDiaryStore = create<DiaryState>((set, get) => ({
  diaryList: [],
  page: 0,
  hasMore: true,
  isLoading: false,
  getDiaryList: async (page) => {
    if (get().isLoading) {
      // 이미 로딩 중이면 요청하지 않음
      console.log("이미 로딩 중입니다. 중복 요청을 방지합니다.");
      return;
    }
    set({ isLoading: true }); // 로딩 시작 상태로 변경
    console.log("API 요청 페이지:", page);
    try {
      const response = await api.get(`/article/list`, {
        params: { page },
      });
      const newData = response.data;
      console.log("다이어리 정보:", newData);
      set((state) => ({
        diaryList: [...state.diaryList, ...newData],
        page: page + 1,
        hasMore: newData.length > 0, // 데이터가 더 있는지 확인
        isLoading: false,
      }));
    } catch (error) {
      console.error("일기 목록을 불러오는 중 오류가 발생했습니다.", error);
      set({ isLoading: false });
    }
  },
  resetDiaryList: () =>
    set({ diaryList: [], page: 0, hasMore: true, isLoading: false }),
}));

export default useDiaryStore;
