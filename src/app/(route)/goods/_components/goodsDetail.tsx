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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { deleteGoods } from "@/api/goods";
import { useRouter } from "next/navigation";

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
  const roles = useAuthStore((state) => state.roles);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(event.target.value, 10));
    setCount(value);
  };

  const handleAddToCart = () => {
    const imageUrl =
      goods.goodsImages.length > 0 ? `/api${goods.goodsImages[0].url}` : "";

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

  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 이 굿즈를 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        await deleteGoods(goods.id);
        alert("삭제되었습니다.");
        router.push("/goods");
      } catch (error) {
        alert("삭제에 실패했습니다.");
        console.error(error);
      }
    } else {
      alert("삭제가 취소되었습니다.");
    }
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
                  src={`/api${image.url}`}
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

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
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
          {roles?.includes("ROLE_ARTIST") && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 3 }}>
              <Link href={`/goods/${goods.id}/update`}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FCC422",
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    p: "12px 24px",
                    ":hover": {
                      backgroundColor: "#f8b602",
                      transform: "scale(1.05)",
                      transition: "transform 0.2s ease",
                    },
                  }}
                  startIcon={<EditIcon />}
                >
                  수정
                </Button>
              </Link>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF4D4D",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  p: "12px 24px",
                  ":hover": {
                    backgroundColor: "#f44336",
                    transform: "scale(1.05)",
                    transition: "transform 0.2s ease",
                  },
                }}
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
              >
                삭제
              </Button>
            </Box>
          )}
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
