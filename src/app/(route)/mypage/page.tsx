"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
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
    <Box sx={{ padding: 3, maxWidth: 900, margin: "0 auto" }}>
      <Tabs
        aria-label="mypage Tabs"
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="내프로필" value="profile" />
        <Tab label="보안설정" value="security" />
        {/* <Tab abel="결제내역" value="orderhistory" /> */}
      </Tabs>
      <Box sx={{ paddingTop: 3 }}>
        {activeTab === "profile" && userInfo ? (
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
        ) : activeTab === "security" ? (
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
