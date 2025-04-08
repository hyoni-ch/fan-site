"use client";

import React from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import LoginForm from "./_components/LoginForm";
import RegisterForm from "./_components/RegisterForm";
import ErrorAlert from "@/components/errorAlert";
import SuccessAlert from "@/components/successAlert";
import AuthHeader from "./_components/AuthHeader";
import AuthTabs from "./_components/AuthTabs";
import useUserAuth from "@/hooks/useUserAuth";

const AuthPage = () => {
  const {
    activeTab,
    credentials,
    loading,
    errorMessage,
    successMessage,
    openBackdrop,
    setActiveTab,
    handleInputChange,
    handleAuthSubmit,
    handleBack,
  } = useUserAuth();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        maxWidth: 540,
        mx: "auto",
        mt: 25,
      }}
    >
      <AuthHeader onBack={handleBack} />
      <AuthTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* 로딩 상태 표시 */}
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={openBackdrop}
          onClick={(e) => e.preventDefault()}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {/* 에러 Alert 표시 */}
      {errorMessage && <ErrorAlert success={true} message={errorMessage} />}

      {/* 성공 Alert 표시 */}
      {successMessage && <SuccessAlert message={successMessage} />}

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
