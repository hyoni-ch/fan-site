"use client";

import useCartStore from "@/store/cartStore";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ClearIcon from "@mui/icons-material/Clear";

function Page() {
  const { items, removeItemFromCart, clearCart, updateItemQuantity } =
    useCartStore();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectAllChange = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
  };

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleBuy = () => {
    if (selectedItems.length === 0) {
      alert("구매하실 굿즈를 선택해주세요!");
    } else {
      const isConfirmed = window.confirm("선택한 굿즈를 구매하시겠습니까?");

      if (isConfirmed) {
        alert("구매가 완료되었습니다.");
        selectedItems.forEach((itemId) => {
          removeItemFromCart(itemId);
        });
        setSelectedItems([]);
      } else {
        alert("구매가 취소되었습니다.");
      }
    }
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
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        장바구니
      </Typography>
      {isClient && (
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  borderBottom: "1px solid #ddd",
                  pb: 2,
                }}
              >
                <Checkbox
                  checked={selectedItems.length === items.length}
                  onChange={handleSelectAllChange}
                  sx={{
                    mr: 2,
                  }}
                />
                <Typography>전체 선택</Typography>
              </Box>
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
                        style={{
                          borderRadius: "8px",
                          objectFit: "cover",
                          marginRight: 10,
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
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10)
                      )
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
                    onClick={() => {
                      const isConfirmed = window.confirm(
                        "선택한 상품을 정말 삭제하시겠습니까?"
                      );
                      if (isConfirmed) {
                        removeItemFromCart(item.id);
                      }
                    }}
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
              <Button variant="contained" onClick={handleBuy}>
                구매하기
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Page;
