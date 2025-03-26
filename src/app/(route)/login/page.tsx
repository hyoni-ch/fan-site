"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { join, login } from "@/api/auth"; // API 로직
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import LoginForm from "./_components/LoginForm";
import RegisterForm from "./_components/RegisterForm";
import UndoIcon from "@mui/icons-material/Undo";

interface AuthFields {
  username: string;
  password: string;
  nickname: string;
}

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [credentials, setCredentials] = useState<AuthFields>({
    username: "",
    password: "",
    nickname: "",
  });

  const router = useRouter();

  // 로그인 & 회원가입 입력 필드 핸들링
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // 로그인 & 회원가입 폼 제출
  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !credentials.username ||
      !credentials.password ||
      (activeTab === "register" && !credentials.nickname)
    ) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    const result =
      activeTab === "login"
        ? await login(credentials.username, credentials.password)
        : await join({
            username: credentials.username,
            password: credentials.password,
            nickname: credentials.nickname || "",
          });

    if (!result) {
      alert(activeTab === "login" ? "로그인 실패" : "회원가입 실패");
      return;
    }

    alert(result.message);

    if (activeTab === "login") {
      router.push("/");
    } else {
      setActiveTab("login");
    }
  };

  const handleBack = () => {
    router.push("/");
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 540,
        mx: "auto",
        mt: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "sapce-between",
          width: "100%",
          mb: 10,
        }}
      >
        <Button
          onClick={handleBack}
          sx={{
            color: "gray",
            display: "inline-flex",
            alignItems: "center",
            padding: 0,
            backgroundColor: "transparent",
            "&:hover": {
              color: "black",
            },
          }}
        >
          <UndoIcon sx={{ mr: 1, fontSize: "1.5rem" }} />
        </Button>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "black",
            fontSize: "0.75rem",
            userSelect: "none",
            mx: "auto",
            pr: 6,
          }}
        >
          WELCOME TO GLASSY 💎
        </Typography>
      </Box>
      {/* 로그인 / 회원가입 탭 */}
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        textColor="inherit"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          "& .MuiTabs-indicator": {
            backgroundColor: "#FCC422",
          },
          mb: 6,
        }}
      >
        <Tab
          value="login"
          label="로그인"
          sx={{
            color: activeTab === "login" ? "#FCC422" : "gray",
            fontWeight: activeTab === "login" ? "bold" : "normal",
            transition: "color 0.3s",
            flex: 1,
            textAlign: "center",
          }}
        />
        <Tab
          value="register"
          label="회원가입"
          sx={{
            color: activeTab === "register" ? "#FCC422" : "gray",
            fontWeight: activeTab === "register" ? "bold" : "normal",
            transition: "color 0.3s",
            flex: 1,
            textAlign: "center",
          }}
        />
      </Tabs>

      {/* 로그인 / 회원가입 폼 */}
      {activeTab === "login" ? (
        <LoginForm
          credentials={credentials}
          handleInputChange={handleInputChange}
          handleAuthSubmit={handleAuthSubmit}
        />
      ) : (
        <RegisterForm
          credentials={credentials}
          handleInputChange={handleInputChange}
          handleAuthSubmit={handleAuthSubmit}
        />
      )}
    </Box>
  );
};

export default AuthPage;
