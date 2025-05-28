"use client";

import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";

type Props = {
  diary: {
    id?: number;
    title: string;
    content: string;
    createDate: string;
    articleImageList?: { url: string }[];
  };
};

const DiaryCard = ({ diary }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (diary.id !== undefined) {
      router.push(`/diary/${diary.id}`);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "48%", md: "30%" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card
        onClick={handleClick}
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
      >
        <CardMedia
          component="img"
          height="250"
          image={
            diary.articleImageList?.[0]?.url
              ? `${S3_IMAGE_BASE_URL}${diary.articleImageList[0].url}`
              : "/images/diary1.png"
          }
          alt={diary.title}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {diary.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {diary.createDate}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {diary.content.length > 50
              ? `${diary.content.slice(0, 50)}...`
              : diary.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DiaryCard;
