// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// interface AuthState {
//   username: string | null;
//   accessToken: string | null;
//   userNickname: string | null;
//   roles: string[] | null;
//   setUsername: (username: string | null) => void;
//   setAccessToken: (accessToken: string | null) => void;
//   setUserNickname: (userNickname: string | null) => void;
//   setAuth: (token: string, userName: string) => void;
//   clearAuth: () => void;
//   setRoles: (roles: string[] | null) => void;
//   logout: () => void;
// }

// const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       username: null,
//       accessToken: null,
//       userNickname: null,
//       roles: null,
//       setUsername: (username) => set({ username }),
//       setAccessToken: (accessToken) => set({ accessToken }),
//       setUserNickname: (userNickname) => set({ userNickname }),
//       setRoles: (roles) => set({ roles }),
//       logout: () => {
//         set({
//           username: null,
//           accessToken: null,
//           userNickname: null,
//           roles: null,
//         });
//       },
//       setAuth: (token, userName) =>
//         set({ accessToken: token, username: userName }),
//       clearAuth: () => set({ accessToken: null, username: null }),
//     }),
//     {
//       name: "auth-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export const getAccessToken = () => useAuthStore.getState().accessToken;
// export const getUserName = () => useAuthStore.getState().username;
// export const getUserNickname = () => useAuthStore.getState().userNickname;
// export const getUserRoles = () => useAuthStore.getState().roles;

// export default useAuthStore;

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  username?: string;
  accessToken?: string;
  userNickname?: string;
  roles?: string[];
  setAuthData: (data: {
    username: string;
    accessToken: string;
    userNickname: string;
    roles: string[];
  }) => void;
  setUsername: (username: string) => void;
  setAccessToken: (accessToken: string) => void;
  setUserNickname: (userNickname: string) => void;
  setRoles: (roles: string[]) => void;
  setAuth: (token: string, userName: string) => void;

  clearAuthData: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: undefined,
      accessToken: undefined,
      userNickname: undefined,
      roles: undefined,

      setAuthData: ({ username, accessToken, userNickname, roles }) =>
        set({ username, accessToken, userNickname, roles }),

      setUsername: (username: string) => set({ username }),
      setAccessToken: (accessToken: string) => set({ accessToken }),
      setUserNickname: (userNickname: string) => set({ userNickname }),
      setRoles: (roles: string[]) => set({ roles }),

      setAuth: (token, userName) =>
        set({ accessToken: token, username: userName }),

      clearAuthData: () =>
        set({
          username: undefined,
          accessToken: undefined,
          userNickname: undefined,
          roles: undefined,
        }),
    }),
    {
      name: "@auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
