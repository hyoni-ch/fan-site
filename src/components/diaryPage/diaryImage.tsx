"use client";

import { useRouter } from "next/navigation";
import HoverOverlay from "./hoverOverlay";
import DiaryImageContent from "./diaryImageContent";
import { DiaryImageProps } from "@/types/diaryMain";
import StyledGridContainer from "./gridContainer";

function DiaryImage({
  id,
  src,
  alt,
  diaryTitle,
  createDate,
  selected,
  index,
  onClick,
  onHover,
  onMouseLeave,
  hoveredImageIndex,
}: DiaryImageProps) {
  const router = useRouter();

  const handleDiaryClick = () => {
    router.push(`/diary/${id}`);
  };

  const handleContainerClick = () => {
    if (selected === index) {
      handleDiaryClick();
    } else {
      onClick(index);
    }
  };

  return (
    <StyledGridContainer
      selected={selected}
      index={index}
      onClick={handleContainerClick}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onMouseLeave}
    >
      <DiaryImageContent src={src} alt={alt} index={index} />
      <HoverOverlay
        id={id}
        diaryTitle={diaryTitle}
        createDate={createDate}
        selected={selected}
        index={index}
        hovered={hoveredImageIndex === index}
        onDiaryClick={handleDiaryClick}
      />
    </StyledGridContainer>
  );
}

export default DiaryImage;
