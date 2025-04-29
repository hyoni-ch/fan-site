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
  resetDiaryList: () => void;
}

// // 다이어리 메인페이지 인터페이스
// export interface DiaryImageProps {
//   id: number;
//   src: string;
//   alt: string;
//   diaryTitle: string;
//   createDate: string;
//   selected: number | null;
//   index: number;
//   onClick: (index: number) => void;
//   onHover: (index: number) => void;
//   onMouseLeave: () => void;
//   hoveredImageIndex: number | null;
// }

// // 다이어리 메인페이지 최상위 바디 인터페이스
// export interface GridContainerProps {
//   selected: number | null;
//   index: number;
// }

// // 메인 페이지 hover시 보여주는 요소 인터페이스
// export interface HoverOverlayProps {
//   id: number;
//   diaryTitle: string;
//   createDate: string;
//   selected: number | null;
//   index: number;
//   hovered: boolean;
//   onDiaryClick: () => void;
// }
