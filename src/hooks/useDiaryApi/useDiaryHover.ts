import { useState } from "react";

export default function useDiaryHover() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return {
    selectedIndex,
    hoveredIndex,
    select: (index: number) => setSelectedIndex(index),
    hover: (index: number) => setHoveredIndex(index),
    leave: () => setHoveredIndex(null),
  };
}
