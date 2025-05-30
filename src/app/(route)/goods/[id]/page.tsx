"use client";

import React, { useEffect, useState } from "react";
import GoodsDetail from "../_components/goodsDetail";
import { Box } from "@mui/material";
import { getGoodsDetail } from "@/api/goods";
import { useParams } from "next/navigation";

function GoodsDetailPage() {
  const [goods, setGoods] = useState<null>(null);
  const { id } = useParams();
  const goodsId = Number(id);
  useEffect(() => {
    const fetchGoods = async (goodsId: number) => {
      try {
        const goods = await getGoodsDetail(goodsId);
        setGoods(goods);
      } catch (err) {
        alert("굿즈 디테일을 불러오는데 실패했습니다.");
        console.error(err);
      }
    };
    fetchGoods(goodsId);
  }, []);

  if (!goods) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <GoodsDetail goods={goods} />
    </Box>
  );
}

export default GoodsDetailPage;
