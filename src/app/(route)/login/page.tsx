"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { join, login } from "@/api/auth"; // API 로직
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import LoginForm from "./_components/LoginForm";
import RegisterForm from "./_components/RegisterForm";
import UndoIcon from "@mui/icons-material/Undo";
import CheckIcon from "@mui/icons-material/Check";

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

  //? 추가 되는 로딩 및 alert 부분
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [openBackdrop, setOpenBackdrop] = useState(false);
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

    setLoading(true); //? 로딩 시작
    setOpenBackdrop(true); //? Backdrop 열기

    const result =
      activeTab === "login"
        ? await login(credentials.username, credentials.password)
        : await join({
            username: credentials.username,
            password: credentials.password,
            nickname: credentials.nickname || "",
          });

    setTimeout(() => {
      setLoading(false); // 로딩 종료
      setOpenBackdrop(false); // Backdrop 닫기
    }, 100);

    if (!result?.success) {
      setAlertMessage(result?.message || "알 수 없는 에러 발생");
      setAlertSeverity("error");
      setTimeout(() => setAlertMessage(null), 5000);
      return;
    }

    if (!result) {
      alert(activeTab === "login" ? "로그인 실패" : "회원가입 실패");
      return;
    }

    if (activeTab === "login") {
      router.push("/");
    } else {
      setActiveTab("login");
      //? 회원가입 성공 후 이메일 인증 요청 알림
      setAlertMessage("입력하신 이메일로 인증요청을 보냈습니다.");
      setAlertSeverity("success");
      setTimeout(() => {
        setAlertMessage(null);
      }, 7000);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
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
      {/* //? 로딩 상태 표시 */}
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={openBackdrop}
          onClick={(e) => e.preventDefault()}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {/* //? Alert 문구 표시 */}
      {alertMessage && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity={alertSeverity}
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      )}

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
