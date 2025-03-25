"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";

interface UserInfo {
  username: string;
  nickname: string;
}

function Mypage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 회원 정보 get
  useEffect(() => {
    api.get("/home").then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  // 결제 내역 get
  // api.get("/home").then((response) => {
  //   console.log(response.data);
  // });

  // 결제 내역 목업 데이터
  const data = [
    {
      title: "조유리의 반짝반짝 키보드",
      price: 30000,
      date: "2025-03-24",
      status: "구매확정",
    },
    {
      title: "조유리의 반짝반짝 키보드",
      price: 30000,
      date: "2025-03-22",
      status: "취소완료",
    },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password || !nickname) {
      console.error("password, nickname이 비어 있습니다.");
      return;
    }

    const body = { password, nickname };

    api
      .post("/member/join", body)
      .then((response) => {
        console.log("📌 서버 응답 데이터:", response.data);
        if (response.data) {
          alert("비밀번호/닉네임 수정 완료");
        }
      })
      .catch((err) => {
        console.log("❌ 오류 발생:", err);
      });
  };

  return (
    <>
      <div>
        <button onClick={() => handleTabClick("profile")}>PROFILE</button>
        <button onClick={() => handleTabClick("orderhistory")}>
          ORDER HISTORY
        </button>
      </div>
      <div>
        {activeTab === "profile" && userInfo ? (
          <div>
            <p>이메일 : {userInfo.username}</p>
            <form onSubmit={onSubmit}>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <input
                type="text"
                id="nickname"
                value={nickname}
                placeholder="nickname"
                onChange={(e) => {
                  setNickname(e.currentTarget.value);
                }}
              />
              <button>APPLY</button>
            </form>
          </div>
        ) : (
          <div>
            <h2>결제 내역</h2>
            {data.length === 0 ? (
              <div>
                <p>아직 결제한 내역이 없습니다.</p>
              </div>
            ) : (
              data.map((item, idx) => (
                <ul key={idx}>
                  <li>{item.title}</li>
                  <li>{item.price}</li>
                  <li>{item.status}</li>
                  <li>{item.date}</li>
                </ul>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Mypage;
