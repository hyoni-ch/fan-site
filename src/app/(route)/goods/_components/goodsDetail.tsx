import { API_BASED_URL } from "@/constants/apiUrl";
import React, { useState } from "react";
import Image from "next/image";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";

interface GoodsImage {
  id: number;
  url: string;
}

interface Goods {
  id: number;
  goodsName: string;
  price: number;
  description: string;
  goodsImages: GoodsImage[];
}

interface GoodsProps {
  goods: Goods;
}

function GoodsDetail({ goods }: GoodsProps) {
  const [count, setCount] = useState<number>(1);
  const [tabValue, setTabValue] = useState<string>("info");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(event.target.value, 10));
    setCount(value);
  };

  console.log(goods);

  if (!goods) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 10 }}>
        <Box>
          {goods.goodsImages && goods.goodsImages.length > 0 ? (
            goods.goodsImages.map((image, index) => (
              <Image
                key={index}
                src={API_BASED_URL + image.url}
                alt={`Goods Image ${index + 1}`}
                width={100}
                height={100}
                layout="responsive"
              />
            ))
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            border: 1,
            borderRadius: 1,
            borderColor: "#ddd",
            p: 5,
          }}
        >
          <Box>{goods.goodsName}</Box>
          <Box>₩{goods.price.toLocaleString()}</Box>
          <Box
            sx={{
              borderTop: 1,
              borderBottom: 1,
              borderColor: "#ddd",
              p: 5,
            }}
          >
            <Typography>수량</Typography>
            <TextField
              type="number"
              value={count}
              onChange={handleCountChange}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button>장바구니</Button>
            <Button>구매하기</Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="굿즈 Tabs"
        >
          <Tab label="상품 정보" value="info" />
          <Tab label="리뷰/평점" value="review" />
        </Tabs>
      </Box>
    </Box>
  );
}

export default GoodsDetail;
