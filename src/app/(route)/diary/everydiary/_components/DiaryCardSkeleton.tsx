// app/diary/DiaryCardSkeleton.tsx
"use client";

import { Box, Skeleton } from "@mui/material";

export default function DiaryCardSkeleton() {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "48%", md: "30%" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={250}
        animation="wave"
        sx={{ borderRadius: 2 }}
      />
      <Skeleton height={40} sx={{ mt: 1 }} />
      <Skeleton height={30} width="60%" />
    </Box>
  );
}
