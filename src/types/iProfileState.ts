import { Album, ConcertList, DramaList } from "./iprofile";

// 전역 상태 데이터 및 액션(상태 변경 함수)
// 프로필 앨범 리스트 타입
export interface AlbumState {
  albums: Album[] | null;
  setAlbums: (data: Album[]) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (id: number) => void;
}
// 프로필 콘서트 리스트 타입
export interface ConcertState {
  concerts: ConcertList[] | null;
  setConcerts: (data: ConcertList[]) => void;
  addConcert: (Concert: ConcertList) => void;
  removeConcert: (id: number) => void;
}
// 프로필 드라마 리스트 타입
export interface DramaState {
  dramas: DramaList[] | null;
  setDramas: (data: DramaList[]) => void;
  addDrama: (Drama: DramaList) => void;
  removeDrama: (id: number) => void;
}
