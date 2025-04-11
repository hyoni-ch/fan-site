import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface LoadingIndicatorProps {
  message?: string;
  minHeight?: number;
}

export default function LoadingIndicator({
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
