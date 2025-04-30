"use client";
// '아티스트'한정 페이지 접근 권한 검증 훅
//* 현재는 글쓰기 페이지 하나 한정이지만, 추후 확장 가능성도 고려 ex) 아티스트만 접근할 수 있는 페이지들)
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import api from "@/utils/api";

export const useCheckArtistRole = () => {
  const router = useRouter();
  const token = useAuthStore.getState().accessToken;

  useEffect(() => {
    const checkRole = async () => {
      if (!token) {
        alert("로그인이 필요합니다.");
        router.replace("/login");
        return;
      }

      try {
        const { data } = await api.get("/home", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const roles: string[] = data?.roles || [];
        if (!roles.includes("ROLE_ARTIST")) {
          alert("글쓰기 권한이 없습니다.");
          router.replace("/");
        }
      } catch (err) {
        console.error("에러입니다", err);
        alert("인증 확인에 실패했습니다. 다시 로그인해주세요.");
        router.replace("/login");
      }
    };

    checkRole();
  }, [token, router]);
};
