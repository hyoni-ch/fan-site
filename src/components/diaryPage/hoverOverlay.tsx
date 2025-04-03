"use client";

import useDiaryStore from "@/store/diaryStore";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface HoverOverlayProps {
  id: number;
  diaryTitle: string;
  createDate: string;
  selected: number | null;
  index: number;
  hovered: boolean;
  onDiaryClick: () => void;
}

function HoverOverlay({
  diaryTitle,
  createDate,
  selected,
  index,
  hovered,
  onDiaryClick,
}: HoverOverlayProps) {
  const router = useRouter();
  const getDiaryList = useDiaryStore((state) => state.getDiaryList);
  const resetDiaryList = useDiaryStore((state) => state.resetDiaryList);

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetDiaryList();
    getDiaryList(0);
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "end",
        color: "white",
        opacity: hovered ? 0.7 : 0,
        transition: "opacity .5s ease",
      }}
      onClick={(e) => {
        if (selected === index) {
          onDiaryClick();
          e.stopPropagation();
        }
      }}
    >
      <Box
        sx={{
          opacity: selected === null || (selected === index && hovered) ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          mb: 10,
          mr: 10,
        }}
      >
        <Button
          variant="contained"
          onClick={handleViewAllClick}
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
        <Typography variant="h3" fontWeight={"bold"}>
          {diaryTitle}
        </Typography>
        <Typography variant="h6" fontWeight={"light"}>
          {createDate}
        </Typography>
      </Box>
    </Box>
  );
}

export default HoverOverlay;
