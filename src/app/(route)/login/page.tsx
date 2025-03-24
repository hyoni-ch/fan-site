"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/auth";

interface Credentials {
  userName: string;
  password: string;
}

function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    userName: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!credentials.userName || !credentials.password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    const result = await login(credentials.userName, credentials.password);
    alert(result.message);

    router.push("/");
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="userName"
            value={credentials.userName}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <div>
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
