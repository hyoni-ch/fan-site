"use client";

import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import api from "@/utils/api";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

interface UserInfo {
  username: string;
  nickname: string;
}

function Mypage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  // 회원 정보 get
  useEffect(() => {
    api.get("/home").then((response) => {
      setUserInfo(response.data);
      setNickname(response.data.nickname);
      console.log(nickname);
    });
  }, []);

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

  const onNicknameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nickname) {
      alert("닉네임 칸이 비어 있습니다.");
      console.error("닉네임이 비어 있습니다.");
      return;
    }

    const body = { nickname };

    api
      .post("/member/updateNickname", body)
      .then((response) => {
        console.log("📌 서버 응답 데이터:", response.data);
        if (response.data) {
          alert("닉네임 수정 완료");
        }
      })
      .catch((err) => {
        console.log("❌ 오류 발생:", err);
      });
  };

  const onPasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!oldPassword || !newPassword) {
      alert("모든 칸을 채워주세요!");
      console.error("현재 비밀번호 또는 새 비밀번호가 비어 있습니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const body = { oldPassword, newPassword };

    api
      .post("/member/updatePassword", body)
      .then((response) => {
        console.log("📌 서버 응답 데이터:", response.data);
        if (response.data) {
          alert("비밀번호 수정 완료되었습니다!");
        }
      })
      .catch((err) => {
        console.log("❌ 오류 발생:", err);
      });
  };

  return (
    <>
      <div style={{ borderBottom: "1px solid #eee" }}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "profile" ? styles.tabButtonActive : ""
          }`}
          onClick={() => handleTabClick("profile")}
        >
          내프로필
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "security" ? styles.tabButtonActive : ""
          }`}
          onClick={() => handleTabClick("security")}
        >
          보안설정
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "orderhistory" ? styles.tabButtonActive : ""
          }`}
          onClick={() => handleTabClick("orderhistory")}
        >
          결제내역
        </button>
      </div>
      <div>
        {activeTab === "profile" && userInfo ? (
          <div>
            <h3>기본 정보</h3>
            <p>{userInfo.username}</p>

            <form onSubmit={onNicknameSubmit}>
              <div>
                <label>닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.currentTarget.value);
                  }}
                />
              </div>

              <button>확인</button>
            </form>
          </div>
        ) : activeTab === "security" ? (
          <div>
            <h3>비밀번호 변경</h3>
            <p>안전한 비밀번호로 내 정보를 보호하세요.</p>
            <p>이전에 사용한 적 없는 비밀번호가 안전합니다.</p>

            <form onSubmit={onPasswordSubmit}>
              <div>
                <label>현재 비밀번호</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.currentTarget.value);
                  }}
                />
              </div>
              <div>
                <label>새 비밀번호</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.currentTarget.value);
                  }}
                />
              </div>
              <div>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                />
              </div>

              <button>확인</button>
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
