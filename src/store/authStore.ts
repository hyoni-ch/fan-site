import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  username: string | null;
  accessToken: string | null;
  userNickname: string | null;
  roles: string[] | null;
  setUsername: (username: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setUserNickname: (userNickname: string | null) => void;
  setRoles: (roles: string[] | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      accessToken: null,
      userNickname: null,
      roles: null,
      setUsername: (username) => set({ username }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setUserNickname: (userNickname) => set({ userNickname }),
      setRoles: (roles) => set({ roles }),
      logout: () =>
        set({
          username: null,
          accessToken: null,
          userNickname: null,
          roles: null,
        }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 key 값
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    }
  )
);

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const getUserName = () => useAuthStore.getState().username;
export const getUserNickname = () => useAuthStore.getState().userNickname;
export const getUserRole = () => useAuthStore.getState().roles;

export default useAuthStore;
