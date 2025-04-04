"use client";

import React, { useEffect } from "react";
import GoodsCreate from "../_components/goodsCreate";
import { Box } from "@mui/material";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

function Create() {
  const { roles } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!roles?.includes("ROLE_ADMIN")) {
      router.push("/");
      alert("접근할 수 없는 페이지입니다.");
    }
  }, [roles, router]);

  return (
    <Box>
      <GoodsCreate />
    </Box>
  );
}

export default Create;
