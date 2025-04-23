import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface ErrorIndicatorProps {
  message?: string;
  minHeight?: number;
}

export default function ErrorIndicator({
  message = "데이터를 불러오는 중 오류가 발생했습니다",
  minHeight = 200,
}: ErrorIndicatorProps) {
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
      <Typography color="error">{message}</Typography>
    </Box>
  );
}
