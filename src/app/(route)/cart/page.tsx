"use client";

import { logout } from "@/api/auth";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    if (isAuthChecked && !accessToken) {
      router.push("/login");
    }
  }, [isAuthChecked, accessToken, router]);

  if (!isAuthChecked) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <div>
      <h1>메롱</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default Page;
