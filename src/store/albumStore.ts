import { create } from "zustand";
import { Album } from "@/types/iprofile";

interface AlbumState {
  albums: Album[] | null;
  setAlbums: (albums: Album[]) => void;
}

export const useAlbumStore = create<AlbumState>((set) => ({
  albums: null,
  setAlbums: (albums) => set({ albums }),
}));
