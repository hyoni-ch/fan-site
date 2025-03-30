"use client";

import { logout } from "@/api/auth";
import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import adaptV4Theme from "./../../../../node_modules/@mui/material/modern/styles/adaptV4Theme";
import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";

function Page() {
  // const router = useRouter();
  // const { accessToken } = useAuthStore();

  // useEffect(() => {
  //   if (!accessToken) {
  //     router.replace("/login");
  //   }
  // }, [accessToken, router]);

  // // 로그인 정보가 없으면 렌더링 안함
  // if (!accessToken) {
  //   return null;
  // }

  // const handleLogout = () => {
  //   logout();
  //   router.replace("/");
  // };

  const { items, removeItemFromCart, clearCart, updateItemQuantity } =
    useCartStore();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(itemId, newQuantity);
  };

  const cal = () => {
    const selectedData = items.filter((item) =>
      selectedItems.includes(item.id)
    );
    const totalPrice = selectedData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalQuantity = selectedData.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return {
      totalPrice,
      totalQuantity,
    };
  };

  const { totalPrice, totalQuantity } = cal();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        p: 2,
      }}
    >
      {/* <h1>메롱</h1>
      <button onClick={handleLogout}>로그아웃</button>
       */}
      <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
        장바구니
      </Typography>
      <Box
        sx={{
          width: "100%",
          borderRadius: "10px",
          p: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {items.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#999" }}>
            장바구니에 상품이 없습니다.
          </Typography>
        ) : (
          <Box>
            {items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #ddd",
                  p: 2,
                  mb: 2,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                }}
              >
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  sx={{
                    mr: 2,
                  }}
                />
                <Box sx={{ flexShrink: 0 }}>
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.goodsName}
                      width={100}
                      height={100}
                      layout="intrinsic"
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        marginRight: "16px",
                      }}
                    />
                  )}
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
                    {item.goodsName}
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    ₩{item.price.toLocaleString()}
                  </Typography>
                </Box>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  sx={{
                    width: "60px",
                    textAlign: "center",
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                    },
                    mr: 2,
                  }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => removeItemFromCart(item.id)}
                  sx={{
                    color: "#ff3b30",
                    "&:hover": {
                      backgroundColor: "#ffebee",
                    },
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                onClick={clearCart}
                sx={{
                  "&:hover": {
                    color: "#e53935",
                    backgroundColor: "inherit",
                  },
                }}
              >
                장바구니 비우기
              </Button>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "8px",
            p: 3,
            mt: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              총 상품 가격
            </Typography>
            <Typography variant="h6" sx={{ color: "#333" }}>
              ₩{totalPrice.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              총 개수
            </Typography>
            <Typography variant="h6" sx={{ color: "#333" }}>
              {totalQuantity}개
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" sx={{}}>
              구매하기
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
