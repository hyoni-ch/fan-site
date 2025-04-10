import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { updateGoods } from "@/api/goods";

interface GoodsProps {
  id: number;
  currentName: string;
  currentPrice: string;
  currentDescription: string;
}
function GoodsUpdate({
  id,
  currentName,
  currentPrice,
  currentDescription,
}: GoodsProps) {
  const [name, setName] = useState<string>(currentName);
  const [price, setPrice] = useState<string>(currentPrice);
  const [description, setDescription] = useState<string>(currentDescription);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description) {
      alert("모두 채워주세요!");
      return;
    }

    try {
      const result = await updateGoods(id, name, description, price, image);

      console.log(result);
      alert("굿즈가 수정 되었습니다!");
    } catch (error) {
      console.error("굿즈 업데이트 실패:", error);
      alert("굿즈 업데이트에 실패했습니다.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          굿즈 수정하기
        </Typography>
        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            {/* 이미지 파일 업로드 */}
            <Box sx={{ width: "100%" }}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  backgroundColor: "#FCC422",
                  textTransform: "none",
                  padding: "12px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "#f8b602",
                  },
                }}
              >
                이미지 파일 선택
                <input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Button>
              {image && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  선택된 파일: {image.name}
                </Typography>
              )}
            </Box>
            {/* 상품 이름 입력 */}
            <TextField
              label="굿즈 이름"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            {/* 가격 입력 */}
            <TextField
              label="가격"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
            />
            {/* 설명 입력 */}
            <TextField
              label="굿즈 상세 설명"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />

            {/* 제출 버튼 */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                fontWeight: "bold",
                padding: "12px",
                textTransform: "none",
              }}
            >
              수정하기
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default GoodsUpdate;
