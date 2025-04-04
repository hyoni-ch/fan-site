"use client";

import { verifyEmail } from "@/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function VerifyEmailServer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [verificationMessage, setVerificationMessage] = useState<string>("");

  //! 여기 인증 완료 되면 login페이지로 라우팅 되기 직전 alert창 또는 다른 육감적인 표시 해주기
  useEffect(() => {
    const handleVerifyEmail = async (verificationToken: string) => {
      setLoading(true);
      const result = await verifyEmail(verificationToken);
      setIsVerified(result.success);
      setVerificationMessage(result.message);

      if (result.success) {
        alert(result.message + "\n로그인 페이지로 이동합니다.");
        router.push("/login");
      } else {
        alert(
          "이메일 인증에 실패했습니다: " +
            result.message +
            "에러 페이지로 이동합니다."
        );
        router.push("/error");
      }
      setLoading(false);
    };

    if (token) {
      handleVerifyEmail(token);
    }
  }, [token, router]);

  if (loading) {
    return <p>인증 중...</p>;
  }

  return (
    <div>
      {isVerified ? (
        <p>{verificationMessage}</p>
      ) : (
        <p>{verificationMessage || "인증을 진행하는 동안 오류가 발생"}</p>
      )}
    </div>
  );
}

export default VerifyEmailServer;
