//앨범 인터페이스 정의
export interface Album {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  albumImages: AlbumImage[];
}
export interface AlbumImage {
  id: number;
  url: string;
}
// 드라마 인터페이스 정의
export interface DramaList {
  id: number;
  careerName: string;
  description: string;
  url: string;
  releaseDate: number;
  careerImages: DramaImage[];
}
export interface DramaImage {
  id: number;
  url: string;
}
//콘서트 인터페이스 정의
export interface ConcertList {
  id: number;
  concertName: string;
  concertDate: string;
  place: string;
}
