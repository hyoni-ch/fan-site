// app/components/DiaryOverlay.tsx
"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  date: string;
  isHovered: boolean;
  isSelected: boolean;
}

export default function DiaryOverlay({
  title,
  date,
  isHovered,
  isSelected,
}: Props) {
  const router = useRouter();

  const handleViewAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/diary/everydiary");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        opacity: isHovered ? 0.7 : 0,
        transition: "opacity 0.5s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        color: "white",
        pointerEvents: isHovered ? "auto" : "none",
      }}
    >
      {isSelected && isHovered && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            mb: 10,
            mr: 10,
          }}
        >
          <Button
            variant="contained"
            onClick={handleViewAll}
            sx={{
              backgroundColor: "#FCC422",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#F2A800",
              },
              mb: 2,
            }}
          >
            전체 보러 가기
          </Button>
          <Typography variant="h3" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {date}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
