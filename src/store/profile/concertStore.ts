// // store/concertStore.ts
// import { ConcertList } from "@/types/iprofile";
// import { createProfileTabStore } from "./profileTabStore";

// export const useConcertStore = createProfileTabStore<ConcertList>();

//TODO 2차 리팩토링 과정: 그럼 차라리 탭별로 Zustand store를 분리해서 확장 가능성을 높이자.
import { ConcertState } from "@/types/iProfileState";
import { create } from "zustand";

export const useConcertStore = create<ConcertState>((set, get) => ({
  concerts: null,
  setConcerts: (concerts) => set({ concerts }),
  addConcert: (Concert) =>
    set({ concerts: [...(get().concerts ?? []), Concert] }),
  removeConcert: (id) =>
    set({ concerts: (get().concerts ?? []).filter((a) => a.id !== id) }),
}));
