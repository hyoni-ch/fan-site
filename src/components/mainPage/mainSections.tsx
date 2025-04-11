import { Box } from "@mui/material";
import React from "react";
import MainGoods from "./mainGoods";
import GoTopButton from "../GoTopButton";
import MainSlider from "./mainSlider";

function MainSections() {
  return (
    <Box sx={{ mb: 10 }}>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url("/images/mainImg.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <MainSlider />
      <MainGoods />
      <GoTopButton />
    </Box>
  );
}

export default MainSections;
