import { create } from "zustand";

interface LikeStore {
  likedArticles: Set<number>;
  addLikedArticle: (articleId: number) => void;
  removeLikedArticle: (articleId: number) => void;
  isLiked: (articleId: number) => boolean;
}

const useLikeStore = create<LikeStore>((set, get) => ({
  likedArticles: new Set(),
  addLikedArticle: (articleId) => {
    if (!get().likedArticles.has(articleId)) {
      set((state) => ({
        likedArticles: new Set(state.likedArticles).add(articleId),
      }));
    }
  },
  removeLikedArticle: (articleId) => {
    const newLikedArticles = new Set(get().likedArticles);
    newLikedArticles.delete(articleId);
    set({ likedArticles: newLikedArticles });
  },
  isLiked: (articleId) => get().likedArticles.has(articleId),
}));

export default useLikeStore;
