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

// export const mockAlbumsList: AlbumInfo[] = [
//   {
//     id: 1,
//     title: "앨범 1",
//     description: "앨범 1 설명",
//     releaseDate: "2023-01-01",
//     tags: "Regular",
//     albumImages: [{ id: 1, url: "/images/diary1.png" }],
//   },
//   {
//     id: 2,
//     title: "앨범 2",
//     description: "앨범 2 설명",
//     releaseDate: "2023-02-01",
//     tags: "Single",
//     albumImages: [{ id: 2, url: "/images/diary1.png" }],
//   },
//   {
//     id: 3,
//     title: "앨범 3",
//     description: "앨범 3 설명",
//     releaseDate: "2023-03-01",
//     tags: "Ost",
//     albumImages: [{ id: 3, url: "/images/diary1.png" }],
//   },
//   {
//     id: 4,
//     title: "앨범 3",
//     description: "앨범 3 설명",
//     releaseDate: "2023-03-01",
//     tags: "Mini",
//     albumImages: [{ id: 4, url: "/images/diary1.png" }],
//   },
//   {
//     id: 5,
//     title: "앨범 3",
//     description: "앨범 3 설명",
//     releaseDate: "2023-03-01",
//     tags: "Mini",
//     albumImages: [{ id: 5, url: "/images/diary1.png" }],
//   },
//   {
//     id: 6,
//     title: "앨범 3",
//     description: "앨범 3 설명",
//     releaseDate: "2023-03-01",
//     tags: "Mini",
//     albumImages: [{ id: 6, url: "/images/diary1.png" }],
//   },
//   {
//     id: 7,
//     title: "앨범 3",
//     description: "앨범 3 설명",
//     releaseDate: "2023-03-01",
//     tags: "Mini",
//     albumImages: [{ id: 7, url: "/images/diary1.png" }],
//   },
// ];

// 앨범 디테일 인터페이스 및 목업 데이터
export interface AlbumDetailInfo {
  id: number;
  title: string;
  description: string;
  intro: string;
  releaseDate: string;
  tags: string;
  albumImages: AlbumImage[];
  tracks: Track[];
}

export interface Track {
  id: number;
  title: string;
  description: string;
  youtubeLink: string;
}

// export const mockAlbumDetails: AlbumDetailInfo[] = [
//   {
//     id: 1,
//     title: "Glassy",
//     description: "싱글 1집",
//     intro:
//       "조유리의 첫 싱글 앨범명이자 동명의 타이틀곡 ‘GLASSY’는 GLASS(유리)에 접미사 Y를 더해 어디서든 빛을 내는 ‘유리스러운‘ 매력을 보여주겠다는 의미이며 이를 바탕으로 아티스트 조유리이자 인간 조유리의 있는 그대로의 모습을 자신 있게 표현했다. 이를 바탕으로 조유리의 ‘어른 아이’적인 면모를 ‘유리스럽게’ 담기 위해 동화 속 오브제인 ‘유리구두’를 차용하여 재해석한 MV, 컨셉 포토 등 전반적인 비주얼 스토리텔링이 눈여겨볼 만하다.",
//     releaseDate: "2023-01-01",
//     tags: "Regular",
//     albumImages: [{ id: 1, url: "/images/diary1.png" }],
//     tracks: [
//       {
//         id: 1,
//         title: "Express Moon",
//         description: "싱글 1집",
//         youtubeLink: "https://www.youtube.com/watch?v=8rd_E4cmcBg",
//       },
//       {
//         id: 2,
//         title: "Express Moon",
//         description: "싱글 1집",
//         youtubeLink: "https://www.youtube.com/watch?v=8rd_E4cmcBg",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "YUUUURI!",
//     description: "미니 1집",
//     intro:
//       "조유리의 첫 싱글 앨범명이자 동명의 타이틀곡 ‘GLASSY’는 GLASS(유리)에 접미사 Y를 더해 어디서든 빛을 내는 ‘유리스러운‘ 매력을 보여주겠다는 의미이며 이를 바탕으로 아티스트 조유리이자 인간 조유리의 있는 그대로의 모습을 자신 있게 표현했다. 이를 바탕으로 조유리의 ‘어른 아이’적인 면모를 ‘유리스럽게’ 담기 위해 동화 속 오브제인 ‘유리구두’를 차용하여 재해석한 MV, 컨셉 포토 등 전반적인 비주얼 스토리텔링이 눈여겨볼 만하다.",
//     releaseDate: "2023-02-01",
//     tags: "Single",
//     albumImages: [{ id: 2, url: "/images/diary1.png" }],
//     tracks: [
//       {
//         id: 3,
//         title: "Express Moon",
//         description: "싱글 1집",
//         youtubeLink: "https://www.youtube.com/watch?v=8rd_E4cmcBg",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "LOVE ALL",
//     description: "미니 2집",
//     intro:
//       "조유리의 첫 싱글 앨범명이자 동명의 타이틀곡 ‘GLASSY’는 GLASS(유리)에 접미사 Y를 더해 어디서든 빛을 내는 ‘유리스러운‘ 매력을 보여주겠다는 의미이며 이를 바탕으로 아티스트 조유리이자 인간 조유리의 있는 그대로의 모습을 자신 있게 표현했다. 이를 바탕으로 조유리의 ‘어른 아이’적인 면모를 ‘유리스럽게’ 담기 위해 동화 속 오브제인 ‘유리구두’를 차용하여 재해석한 MV, 컨셉 포토 등 전반적인 비주얼 스토리텔링이 눈여겨볼 만하다.",
//     releaseDate: "2023-03-01",
//     tags: "Mini",
//     albumImages: [{ id: 3, url: "/images/diary1.png" }],
//     tracks: [
//       {
//         id: 4,
//         title: "Express Moon",
//         description: "Mini",
//         youtubeLink: "https://www.youtube.com/watch?v=8rd_E4cmcBg",
//       },
//       {
//         id: 5,
//         title: "Express Moon",
//         description: "Single",
//         youtubeLink: "https://www.youtube.com/watch?v=8rd_E4cmcBg",
//       },
//       {
//         id: 6,
//         title: "Express Moon",
//         description: "Single",
//         youtubeLink: "https://www.youtube.com/watch?v=8rd_E4cmcBg",
//       },
//     ],
//   },
// ];
