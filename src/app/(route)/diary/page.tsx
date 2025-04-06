"use client";

import { Box } from "@mui/material";
import DiaryImage from "@/components/diaryPage/diaryImage";
import { useEffect, useState } from "react";
import getLatestDiaryEntries, { FourArticle } from "@/api/diary/getLatestDiary";

function Diary() {
  const [diaryImages, setDiaryImages] = useState<FourArticle[]>([]);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    0
  );
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchDiaryEntries() {
      const entries = await getLatestDiaryEntries();
      setDiaryImages(entries);
    }
    fetchDiaryEntries();
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleHover = (index: number) => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "880px" }}>
      {diaryImages.map((image, index) => (
        <DiaryImage
          key={image.id}
          id={image.id}
          src={`/api${image.articleImageList[0]?.url}` || "/images/diary1.png"}
          alt={image.title}
          diaryTitle={image.title}
          createDate={image.createDate}
          selected={selectedImageIndex}
          index={index}
          onClick={handleImageClick}
          onHover={handleHover}
          onMouseLeave={handleMouseLeave}
          hoveredImageIndex={hoveredImageIndex}
        />
      ))}
    </Box>
  );
}

export default Diary;
