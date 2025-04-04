"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getUser, logout } from "@/api/auth";

interface UserInfo {
  username: string;
  nickname: string;
}

function Mypage() {
  const [activeMenu, setActiveMenu] = useState("profile");
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
  const fetchUserInfo = async () => {
    const fetchUser = await getUser();
    try {
      setUserInfo(fetchUser?.data);
      setNickname(fetchUser?.data.nickname);
    } catch (error) {
      console.error("유저 정보를 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    logout();
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
    <Box sx={{ display: "flex", padding: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* 왼쪽 메뉴 */}
      <Box
        sx={{
          width: "250px",
          borderRight: "1px solid #ddd",
          paddingRight: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button
          variant="text"
          color={activeMenu === "profile" ? "primary" : "inherit"}
          onClick={() => setActiveMenu("profile")}
          sx={{ textAlign: "left", fontWeight: "bold" }}
        >
          내프로필
        </Button>
        <Button
          variant="text"
          color={activeMenu === "security" ? "primary" : "inherit"}
          onClick={() => setActiveMenu("security")}
          sx={{ textAlign: "left", fontWeight: "bold" }}
        >
          보안설정
        </Button>
        <Button
          variant="text"
          onClick={handleLogout}
          sx={{ textAlign: "left", fontWeight: "bold", marginTop: "auto" }}
        >
          로그아웃
        </Button>
      </Box>

      {/* 오른쪽 내용 */}
      <Box sx={{ flex: 1, paddingLeft: 3 }}>
        {activeMenu === "profile" && userInfo ? (
          <Box
            sx={{
              padding: 3,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              기본 정보
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              {userInfo.username}
            </Typography>

            <form onSubmit={onNicknameSubmit}>
              <TextField
                label="닉네임"
                variant="outlined"
                fullWidth
                value={nickname}
                onChange={(e) => setNickname(e.currentTarget.value)}
                sx={{
                  marginBottom: 2,
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: 1.5,
                  textTransform: "none",
                }}
              >
                닉네임 수정
              </Button>
            </form>
          </Box>
        ) : activeMenu === "security" ? (
          <Box
            sx={{
              padding: 3,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              비밀번호 변경
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              안전한 비밀번호로 내 정보를 보호하세요.
            </Typography>

            <form onSubmit={onPasswordSubmit}>
              <TextField
                label="현재 비밀번호"
                type="password"
                variant="outlined"
                fullWidth
                value={oldPassword}
                onChange={(e) => setOldPassword(e.currentTarget.value)}
                sx={{
                  marginBottom: 2,
                }}
              />
              <TextField
                label="새 비밀번호"
                type="password"
                variant="outlined"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
                sx={{
                  marginBottom: 2,
                }}
              />
              <TextField
                label="비밀번호 확인"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                sx={{
                  marginBottom: 2,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: 1.5,
                  textTransform: "none",
                }}
              >
                비밀번호 변경
              </Button>
            </form>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6">결제 내역</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Mypage;
