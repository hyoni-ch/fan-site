import useAuthStore from "@/store/authStore";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function useDiaryPermission() {
  const router = useRouter();

  const checkArtistPermission = useCallback(async () => {
    const token = useAuthStore.getState().accessToken;

    try {
      const { data } = await api.get("/home", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(data.roles) && data.roles.includes("ROLE_ARTIST")) {
        router.push("/diary/write");
      } else {
        alert("글쓰기 권한이 없습니다.");
      }
    } catch {
      alert("인증 정보 확인에 실패했습니다. 다시 로그인해주세요.");
      router.push("/login");
    }
  }, [router]);

  return { checkArtistPermission };
}

export default useDiaryPermission;
