"use client";

import { Box, styled } from "@mui/material";

interface GridContainerProps {
  selected: number | null;
  index: number;
}

const StyledGridContainer = styled(Box)<GridContainerProps>(
  ({ selected, index }) => ({
    position: "relative",
    width: selected === index ? "70%" : "10%",
    height: "880px",
    cursor: "pointer",
    overflow: "hidden",
    transition: "width 0.3s ease-out",
  })
);

export default StyledGridContainer;
