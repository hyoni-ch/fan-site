import { API_BASED_URL } from "@/constants/apiUrl";
import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Link,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import useCartStore from "@/store/cartStore";

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
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(event.target.value, 10));
    setCount(value);
  };

  const handleAddToCart = () => {
    const imageUrl =
      goods.goodsImages.length > 0
        ? API_BASED_URL + goods.goodsImages[0].url
        : "";

    const cartItem = {
      id: goods.id,
      goodsName: goods.goodsName,
      price: goods.price,
      quantity: count,
      imageUrl: imageUrl,
    };

    addItemToCart(cartItem);
    alert("장바구니에 추가 되었습니다.");
  };

  const handleBuy = () => {
    alert("구매가 완료 되었습니다.");
  };

  if (!goods) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 4 }}>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, maxWidth: "500px" }}>
          {goods.goodsImages && goods.goodsImages.length > 0 ? (
            goods.goodsImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "16px",
                  boxShadow: 2,
                }}
              >
                <Image
                  src={API_BASED_URL + image.url}
                  alt={`Goods Image ${index + 1}`}
                  width={500}
                  height={500}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "gray" }}>
              이미지가 없습니다.
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            flex: 1,
            maxWidth: "500px",
            border: 1,
            borderRadius: 2,
            borderColor: "#ddd",
            p: 3,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {goods.goodsName}
          </Typography>
          <Typography variant="h6" sx={{ color: "#757575", mb: 3 }}>
            ₩{goods.price.toLocaleString()}
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              수량
            </Typography>
            <TextField
              type="number"
              value={count}
              onChange={handleCountChange}
              sx={{
                width: "100%",
                mb: 2,
                padding: "8px",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                padding: "12px",
                fontWeight: "bold",
              }}
              onClick={handleAddToCart}
            >
              장바구니
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                padding: "12px",
                fontWeight: "bold",
              }}
              onClick={handleBuy}
            >
              구매하기
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="굿즈 Tabs"
          sx={{
            borderBottom: 1,
            borderColor: "#ddd",
            mb: 2,
          }}
        >
          <Tab label="상품 정보" value="info" />
          <Tab label="리뷰/평점" value="review" />
        </Tabs>

        {tabValue === "info" && (
          <Typography variant="body1" sx={{ color: "#555" }}>
            {goods.description}
          </Typography>
        )}

        {tabValue === "review" && (
          <Typography variant="body2" sx={{ color: "gray" }}>
            아직 리뷰가 없습니다.
          </Typography>
        )}
      </Box>

      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Link href="/goods">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FCC422",
              borderRadius: "50%",
              minWidth: "50px",
              height: "50px",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "#f8b602",
              },
            }}
          >
            <ListIcon sx={{ color: "white", fontSize: "24px" }} />
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default GoodsDetail;
