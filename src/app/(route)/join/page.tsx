"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Join() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName || !password) {
      console.error("userName 또는 password가 비어 있습니다.");
      return;
    }

    const body = { username: userName, password: password };
    axios
      .post("http://61.99.26.112:3001/member/join", body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("📌 서버 응답 데이터:", response.data); // 응답 데이터 확인
        if (response.data) {
          alert("회원가입 완료");
        }
        router.push("/login");
      })
      .catch((err) => {
        console.log("❌ 오류 발생:", err);
      });
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            value={userName}
            onChange={(e) => {
              setUserName(e.currentTarget.value);
            }}
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <div>
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Join;
