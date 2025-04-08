"use client";

import { verifyEmail } from "@/api/auth";
import {
  Alert,
  Container,
  Snackbar,
  CircularProgress,
  styled,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface StyledSnackbarProps {
  severity: "success" | "error";
}

const StyledSnackbar = styled(Snackbar)<StyledSnackbarProps>(
  ({ theme, severity }) => ({
    "& .MuiAlert-root": {
      fontWeight: "500",
      fontSize: "1rem",
      backgroundColor:
        severity === "success"
          ? theme.palette.success.dark
          : theme.palette.error.dark,
      color: theme.palette.common.white,
      opacity: 0.9,
      boxShadow: theme.shadows[5],
    },
  })
);

function VerifyEmailServer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    router.push(snackbarSeverity === "success" ? "/login" : "/error");
  };

  useEffect(() => {
    const handleVerifyEmail = async (verificationToken: string) => {
      setLoading(true);
      const result = await verifyEmail(verificationToken);
      setLoading(false);

      setSnackBarMessage(result.message);
      setSnackbarSeverity(result.success ? "success" : "error");
      setSnackbarOpen(true);

      setTimeout(() => {
        setLoading(false);
        if (result.success) {
          router.push("/login");
        } else {
          router.push("/error");
        }
      }, 3000);
    };

    if (token) {
      handleVerifyEmail(token);
    }
  }, [token, router]);

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <StyledSnackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          severity={snackbarSeverity}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </StyledSnackbar>
      )}
    </Container>
  );
}

export default VerifyEmailServer;
