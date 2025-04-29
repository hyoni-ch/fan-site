import { Box } from "@mui/material";
import DiaryImage from "./DiaryImage";
import DiaryOverlay from "./DiaryOverLay";
import { FourArticle } from "@/api/diary/getLatestDiary";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";

interface Props {
  data: FourArticle;
  index: number;
  selectedIndex: number | null;
  hoveredIndex: number | null;
  onSelect: (index: number) => void;
  onHover: (index: number) => void;
  onLeave: () => void;
}

export default function DiaryItem({
  data,
  index,
  selectedIndex,
  hoveredIndex,
  onSelect,
  onHover,
  onLeave,
}: Props) {
  const isSelected = index === selectedIndex;
  const isHovered = index === hoveredIndex;

  const width = isSelected ? "70%" : "20%";

  const handleClick = () => {
    if (isSelected) {
      window.location.href = `/diary/${data.id}`;
    } else {
      onSelect(index);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height: "100%",
        overflow: "hidden",
        transition: "width 0.3s ease",
        cursor: "pointer",
      }}
      onClick={handleClick}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      <DiaryImage
        src={`${S3_IMAGE_BASE_URL}${data.articleImageList[0]?.url}`}
        alt={data.title}
        isSelected={isSelected}
        index={index}
      />
      <DiaryOverlay
        title={data.title}
        date={data.createDate}
        isHovered={isHovered}
        isSelected={isSelected}
      />
    </Box>
  );
}
