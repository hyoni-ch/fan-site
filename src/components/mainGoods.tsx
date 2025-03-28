"use client";

import api from "@/utils/api";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_BASED_URL } from "@/constants/apiUrl";

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
    api
      .get(`/goods/list`, {
        params: {
          sort: "last",
          name: "",
          page: 0,
          size: 10,
        },
      })
      .then((response) => {
        setGoodsList(response.data.content);
      });
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
          {goods.goodsImages.length > 0 && (
            <Box key={goods.goodsImages[0].id}>
              <img
                src={API_BASED_URL + goods.goodsImages[0].url}
                alt={`굿즈 ${goods.id}`}
                height={400}
                width={300}
                style={{ objectFit: "cover" }}
              />
            </Box>
          )}
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
