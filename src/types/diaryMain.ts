// 다이어리 메인페이지 인터페이스
export interface DiaryImageProps {
  id: number;
  src: string;
  alt: string;
  diaryTitle: string;
  createDate: string;
  selected: number | null;
  index: number;
  onClick: (index: number) => void;
  onHover: (index: number) => void;
  onMouseLeave: () => void;
  hoveredImageIndex: number | null;
}

// 다이어리 메인페이지 최상위 바디 인터페이스
export interface GridContainerProps {
  selected: number | null;
  index: number;
}
