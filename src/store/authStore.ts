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

      logout: () => {
        set({
          username: null,
          accessToken: null,
          userNickname: null,
        }),
          roles: [],
        });
      },
    }),
    {
      name: "auth-storage", // localStorage에 저장될 key 값
      storage: createJSONStorage(() => localStorage), // localStorage 사용
      partialize: (state) => {
        // roles는 로컬스토리지에서 제외하고 저장하지 않도록 처리
        const { roles, ...rest } = state;
        return rest; // roles 제외한 나머지 상태만 로컬스토리지에 저장
      },
    }
  )
);

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const getUserName = () => useAuthStore.getState().username;
export const getUserNickname = () => useAuthStore.getState().userNickname;
export const getUserRoles = () => useAuthStore.getState().roles;

export default useAuthStore;
