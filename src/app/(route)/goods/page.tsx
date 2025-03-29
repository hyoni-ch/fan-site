"use client";

import React from "react";
import { Box } from "@mui/material";
import GoodsList from "./_components/goodsList";

function Goods() {
  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <GoodsList />
    </Box>
  );
}

export default Goods;
