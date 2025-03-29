"use client";

import { API_BASED_URL } from "@/constants/apiUrl";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  //! 여기 인증 완료 되면 login페이지로 라우팅 되기 직전 alert창 또는 다른 육감적인 표시 해주기
  useEffect(() => {
    if (token) {
      axios
        .post(`${API_BASED_URL}/member/verify-email?token=` + token)
        .then((response) => {
          console.log(response);
          setIsVerified(true);
          // setTimeout(() => router.push("/login"), 1000);
          router.push("/login");
        })
        .catch((error) => {
          console.error("인증 실패:", error);
          setIsVerified(false);
          router.push("/error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token, router]);

  if (loading) {
    return <p>인증 중...</p>;
  }

  return (
    <div>
      {isVerified ? (
        <p>이메일 인증이 완료되었습니다! 환영합니다.</p>
      ) : (
        <p>인증에 실패했습니다. 다시 시도해주세요.</p>
      )}
    </div>
  );
}

export default VerifyEmail;
