"use client";

import useDiaryStore from "@/store/diaryStore";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function EveryDiary() {
  const diaryList = useDiaryStore((state) => state.diaryList);
  const page = useDiaryStore((state) => state.page);
  const hasMore = useDiaryStore((state) => state.hasMore);
  const getDiaryList = useDiaryStore((state) => state.getDiaryList);

  const router = useRouter();

  useEffect(() => {
    if (diaryList.length === 0) {
      getDiaryList(page);
    }
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMore
    ) {
      const currentPage = useDiaryStore.getState().page; // 현재 페이지 번호 가져오기
      getDiaryList(currentPage); // 현재 페이지 번호로 API 요청
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleCardClick = (id: number | undefined) => {
    if (id !== undefined) {
      router.push(`/diary/${id}`);
    } else {
      console.error("Invalid diary id");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, display: "flex", flexWrap: "wrap", gap: 3 }}>
        {diaryList.map((diary, index) => (
          <Box
            key={`${diary.id}-${index}`}
            sx={{
              width: { xs: "100%", sm: "48%", md: "30%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: 2,
                boxShadow: 3,
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => handleCardClick(diary.id)}
            >
              <CardMedia
                component="img"
                height="250"
                // image={`${API_BASED_URL}${diary.articleImageList[0].url}`}
                image={
                  diary.articleImageList[0]?.url
                    ? `/api/${diary.articleImageList[0].url}`
                    : "/images/diary1.png"
                }
                alt={diary.title}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  {diary.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {diary.createDate}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 1 }}
                >
                  {diary.content.length > 50
                    ? `${diary.content.slice(0, 50)}...`
                    : diary.content}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default EveryDiary;
