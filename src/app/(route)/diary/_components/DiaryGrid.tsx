// 다이어리 메인 페이지 전체 틀
import { FourArticle } from "@/api/diary/getLatestDiary";
import { Box } from "@mui/material";
import DiaryItem from "./DiaryItem";
import useDiaryHover from "@/hooks/useDiaryApi/useDiaryHover";

interface Props {
  diaryList: FourArticle[];
}

export default function DiaryGrid({ diaryList }: Props) {
  const { selectedIndex, hoveredIndex, select, hover, leave } = useDiaryHover();

  // 다이어리 아이템 컴포넌트에서 하나씩 받아서 렌더링
  return (
    <Box sx={{ display: "flex", height: "880px" }}>
      {diaryList.map((item, index) => (
        <DiaryItem
          key={item.id}
          data={item}
          index={index}
          selectedIndex={selectedIndex}
          hoveredIndex={hoveredIndex}
          onSelect={select}
          onHover={hover}
          onLeave={leave}
        />
      ))}
    </Box>
  );
}
