"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getUser, logout } from "@/api/auth";
import LoadingIndicator from "@/components/LoadingIndicator";

interface UserInfo {
  username: string;
  nickname: string;
}

function Mypage() {
  const [activeMenu, setActiveMenu] = useState("profile");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    // localStorage에서 zustand로 auth 정보 설정
    const token = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");

    if (token && userName) {
      setAuth(token, userName);
    }
    setLoading(false);
  }, [setAuth]);

  useEffect(() => {
    if (!loading && !accessToken) {
      router.push("/login");
    }
  }, [loading, accessToken, router]);

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await getUser();
      if (response?.data) {
        setUserInfo(response.data);
        setNickname(response.data.nickname);
      }
    } catch (error) {
      console.error("유저 정보를 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    if (accessToken) fetchUserInfo();
  }, [accessToken]);

  // 로그아웃
  const handleLogout = () => {
    logout();
  };

  // 닉네임 수정
  const onNicknameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert("닉네임 칸이 비어 있습니다.");
      return;
    }

    try {
      const response = await api.post("/member/updateNickname", { nickname });
      if (response.data) {
        alert("닉네임 수정 완료");
        fetchUserInfo(); // 갱신
      }
    } catch (err) {
      console.error("❌ 닉네임 수정 오류:", err);
    }
  };

  // 비밀번호 변경
  const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      alert("모든 칸을 채워주세요!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const body = { oldPassword, newPassword };
      const response = await api.post("/member/updatePassword", body);
      if (response.data) {
        alert("비밀번호가 변경되었습니다!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error("❌ 비밀번호 수정 오류:", err);
    }
  };

  if (loading || !accessToken) {
    return <LoadingIndicator />;
  }

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
          <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 1 }}>
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
                onChange={(e) => setNickname(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth>
                닉네임 수정
              </Button>
            </form>
          </Box>
        ) : activeMenu === "security" ? (
          <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 1 }}>
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
                fullWidth
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="새 비밀번호"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="비밀번호 확인"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth>
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
