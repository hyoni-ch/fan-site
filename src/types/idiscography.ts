// 앨범 리스트 인터페이스 및 목업데이터 정의
export interface AlbumInfo {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  tags: string;
  albumImages: AlbumImage[];
}

export interface AlbumImage {
  id: number;
  url: string;
}

// 앨범 디테일 인터페이스 및 목업 데이터
export interface AlbumDetailInfo {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  tags: string;
  albumImages: AlbumDetailImage[];
  tracks: Track[];
}

export interface AlbumDetailImage {
  id: number;
  url: string;
}

export interface Track {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
}
