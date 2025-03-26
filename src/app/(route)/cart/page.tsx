"use client";

import { logout } from "@/api/auth";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  // 로그인 정보가 없으면 렌더링 안함
  if (!accessToken) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <div>
      <h1>메롱</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default Page;
