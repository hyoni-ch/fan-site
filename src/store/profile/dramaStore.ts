// store/concertStore.ts
// import { DramaList } from "@/types/iprofile";
// import { createProfileTabStore } from "./profileTabStore";

// export const useDramaStore = createProfileTabStore<DramaList>();

//TODO 2차 리팩토링 과정: 그럼 차라리 탭별로 Zustand store를 분리해서 확장 가능성을 높이자.
import { DramaState } from "@/types/iProfileState";
import { create } from "zustand";

export const useDramaStore = create<DramaState>((set, get) => ({
  dramas: null,
  setDramas: (dramas) => set({ dramas }),
  addDrama: (drama) => set({ dramas: [...(get().dramas ?? []), drama] }),
  removeDrama: (id) =>
    set({ dramas: (get().dramas ?? []).filter((a) => a.id !== id) }),
}));
