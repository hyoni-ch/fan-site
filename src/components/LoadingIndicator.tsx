// 원래 가용되던 로딩 인디케이터 부분은 스켈레톤 UI를 사용하고, 약간의 텍스트만 가미된 UI를 제공
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface LoadingIndicatorProps {
  message?: string;
  minHeight?: number;
}

function LoadingIndicator({
  message = "데이터를 불러오는 중입니다...",
  minHeight = 200,
}: LoadingIndicatorProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Typography sx={{ mr: 2 }}>{message}</Typography>
      <CircularProgress size={24} />
    </Box>
  );
}

export default LoadingIndicator;
