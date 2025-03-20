"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
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
      .post("http://61.99.26.112:3001/member/login", body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        if (response.data.code == "F") {
          alert("완료");
          router.push("/");
        } else alert("실패");
      })
      .catch((err) => {
        console.log(err);
        console.log(userName, password);
      });
  };

  //!로그아웃
  // const logout = () => {
  //   let accessToken = localStorage.getItem('accessToken.');
  //   localStorage.removeItem('accessToken');
  //   window.location.reload();
  // };

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
        <button type="submit">로그아웃 </button>
      </div>
    </>
  );
}

export default Login;
