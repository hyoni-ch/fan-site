"use client";

import { Box } from "@mui/material";
import MainSections from "@/components/mainPage/mainSections";

function Home() {
  return (
    <Box sx={{ backgroundColor: "#ECE7E4", overflow: "auto" }}>
      <MainSections />
    </Box>
  );
}

export default Home;
