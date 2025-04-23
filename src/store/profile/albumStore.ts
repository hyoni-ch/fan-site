//TODO 기존에 album에만 zustand 연동했을 때 legacy
// import { create } from "zustand";
// import { Album } from "@/types/iprofile";

// interface AlbumState {
//   albums: Album[] | null;
//   setAlbums: (albums: Album[]) => void;
// }

// export const useAlbumStore = create<AlbumState>((set) => ({
//   albums: null,
//   setAlbums: (albums) => set({ albums }),
// }));

//TODO 1차 리팩토링 과정에서 탭 공통 스토어 만들고 사용한 부분
//? 이 부분은 생각보다 추후 확장 가능성을 고려해봤을 때 너무 빈약하다고 생각이 듬
// import { Album } from "@/types/iprofile";
// import { createProfileTabStore } from "./profileTabStore";

// export const useAlbumStore = createProfileTabStore<Album>();

//TODO 2차 리팩토링 과정: 그럼 차라리 탭별로 Zustand store를 분리해서 확장 가능성을 높이자.
import { AlbumState } from "@/types/iProfileState";
import { create } from "zustand";

export const useAlbumStore = create<AlbumState>((set, get) => ({
  albums: null,
  setAlbums: (albums) => set({ albums }),
  addAlbum: (album) => set({ albums: [...(get().albums ?? []), album] }),
  removeAlbum: (id) =>
    set({ albums: (get().albums ?? []).filter((a) => a.id !== id) }),
}));
