"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

function Join() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password || !nickname) {
      console.error("userName 또는 password, nickname이 비어 있습니다.");
      return;
    }

    const body = { username: username, password, nickname: nickname };

    api
      .post("/member/join", body)
      .then((response) => {
        console.log("📌 서버 응답 데이터:", response.data);
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
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
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
          <input
            type="string"
            id="string"
            value={nickname}
            onChange={(e) => {
              setNickname(e.currentTarget.value);
            }}
          />
          <div>
            <button type="submit">회원가입</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Join;
