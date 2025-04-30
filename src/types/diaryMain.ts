// 다이어리 인터페이스 정의
export interface ArticleImage {
  id: number;
  url: string;
}

export interface Article {
  id: number;
  title: string;
  createDate: string;
  articleImageList: ArticleImage[];
  content: string;
}

// 다이어리 리스트 Store State 인터페이스
export interface DiaryState {
  diaryList: Article[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  getDiaryList: (nextPage?: number) => Promise<void>;
}
