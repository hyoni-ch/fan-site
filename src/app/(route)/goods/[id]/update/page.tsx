"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import GoodsUpdate from "./../../_components/goodsUpdate";
import { getGoodsDetail } from "@/api/goods";
import { Goods } from "@/types/igoods";

function GoodsUpdatePage() {
  const { id } = useParams();
  const goodsId = Number(id);

  const [goods, setGoods] = useState<Goods | null>(null);

  useEffect(() => {
    const fetchGoods = async (goodsId: number) => {
      try {
        const goods = await getGoodsDetail(goodsId);
        console.log("Fetched goods:", goods);
        setGoods(goods);
      } catch (err) {
        alert("굿즈 디테일을 불러오는데 실패했습니다.");
        console.error(err);
      }
    };
    fetchGoods(goodsId);
  }, [goodsId]);

  useEffect(() => {
    console.log(goods);
  }, [goods]);

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
      <GoodsUpdate
        id={goodsId}
        currentName={goods.goodsName}
        currentPrice={goods.price}
        currentDescription={goods.description}
      />
    </Box>
  );
}

export default GoodsUpdatePage;
