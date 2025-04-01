"use client";

import { Box, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASED_URL } from "@/constants/apiUrl";
import { getGoodsList } from "@/api/goods";

interface GoodsImage {
  id: number;
  url: string;
}

interface Goods {
  id: number;
  goodsName: string;
  price: number;
  goodsImages: GoodsImage[];
}

type GoodsList = Goods[];

function MainGoods() {
  const [goodsList, setGoodsList] = useState<GoodsList | null>(null);
  const [recentGoods, setRecentGoods] = useState<GoodsList>([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const params = {
          sort: "last",
          name: "",
          page: 0,
          size: 10,
        };
        const goods = await getGoodsList(params);
        setGoodsList(goods.content);
      } catch (err) {
        alert("굿즈 리스트를 불러오는데 실패했습니다.");
        console.error(err);
      }
    };
    fetchGoods();
  }, []);

  useEffect(() => {
    if (goodsList) {
      const recent = goodsList.slice(0, 3);
      setRecentGoods(recent);
    }
  }, [goodsList]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        maxWidth: "1280px",
        gap: 2,
      }}
    >
      {recentGoods.map((goods) => (
        <Box key={goods.id}>
          <Link href={`/goods/${goods.id}`}>
            {goods.goodsImages.length > 0 && (
              <Box key={goods.goodsImages[0].id}>
                <Image
                  src={API_BASED_URL + goods.goodsImages[0].url}
                  alt={`굿즈 ${goods.id}`}
                  width={300}
                  height={400}
                  objectFit="cover"
                  layout="intrinsic"
                />
              </Box>
            )}
          </Link>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box>{goods.goodsName}</Box>
            <Box sx={{ color: "#757575" }}>₩{goods.price.toLocaleString()}</Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default MainGoods;
