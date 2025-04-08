import { CircularProgress, styled } from "@mui/material";
import React from "react";

interface LoadingIndicatorProps {
  size?: number;
}

const StyledCircularProgress = styled(CircularProgress)(({ size }) => ({
  fontSize: size,
}));

function LoadingIndicator({ size = 40 }: LoadingIndicatorProps) {
  return <StyledCircularProgress size={size} />;
}

export default LoadingIndicator;
