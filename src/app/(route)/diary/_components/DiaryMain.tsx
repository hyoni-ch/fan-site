"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import getLatestDiaryEntries, { FourArticle } from "@/api/diary/getLatestDiary";
import DiaryGrid from "./DiaryGrid";

export default function DiaryMain() {
  const [diaryList, setDiaryList] = useState<FourArticle[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getLatestDiaryEntries();
      setDiaryList(data);
    };
    fetch();
  }, []);

  return (
    <Box sx={{ width: "100%", height: "880px" }}>
      <DiaryGrid diaryList={diaryList} />
    </Box>
  );
}
