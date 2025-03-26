import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  username: string | null;
  accessToken: string | null;
  setUsername: (username: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      accessToken: null,
      setUsername: (username) => set({ username }),
      setAccessToken: (accessToken) => set({ accessToken }),
      logout: () => set({ username: null, accessToken: null }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 key 값
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    }
  )
);

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const getUserName = () => useAuthStore.getState().username;

export default useAuthStore;
