"use client";

import React from "react";
import { Box, Button, Container, Typography, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import useAuthStore from "@/store/authStore";
import useDiaryStore from "@/store/diaryStore";
import { useDiaryInfiniteScroll } from "@/hooks/useDiaryApi/useInfiniteScroll";
import useDiaryPermission from "@/hooks/useDiaryApi/useDiaryPermission";
import DiaryCard from "./_components/DiaryCard";
import DiaryCardSkeleton from "./_components/DiaryCardSkeleton";

function EveryDiary() {
  const roles = useAuthStore((state) => state.roles);
  const { diaryList, isLoading, hasMore } = useDiaryStore();
  const { checkArtistPermission } = useDiaryPermission();

  useDiaryInfiniteScroll();
  const showSkeleton = isLoading && hasMore;

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          유리의 하루들 ✨
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          모든 작성된 다이어리를 한눈에 확인해보세요.
        </Typography>

        {/* Write Button */}
        {roles?.includes("ROLE_ARTIST") && (
          <Box sx={{ mb: 4, textAlign: "right" }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={checkArtistPermission}
              sx={{
                backgroundColor: "#FCC422",
                color: "white",
                "&:hover": { backgroundColor: "#F2A800" },
              }}
            >
              작성하기
            </Button>
          </Box>
        )}

        <Box sx={{ borderBottom: "2px solid #eee", mb: 4 }} />

        {/* Diary Card List */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {diaryList.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
          {/* Skeleton UI */}
          {showSkeleton &&
            Array.from({ length: 3 }).map((_, i) => (
              <DiaryCardSkeleton key={i} />
            ))}
        </Box>

        {/* 에러 상태에서 Alert 띄우기 */}
        {!isLoading && diaryList.length === 0 && !hasMore && (
          <Alert severity="error" sx={{ mt: 4 }}>
            데이터를 불러오는 데 실패했어요. 나중에 다시 시도해 주세요.
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default EveryDiary;
