import { SuccessAlertProps } from "@/types/ialertProp";
import { Alert } from "@mui/material";
import React from "react";

function successAlert({ message }: SuccessAlertProps) {
  if (!message) return null;
  return (
    <>
      <Alert severity="success" sx={{ mb: 2 }}>
        {/* <AlertTitle>Success</AlertTitle> */}
        {message}
      </Alert>
    </>
  );
}

export default successAlert;
