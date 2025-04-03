"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image"; // Image 컴포넌트 import

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
      setImageFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 여기서 title, content, images, imageFiles를 사용하여 API 호출 또는 다른 처리를 수행합니다.
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Images:", images);
    console.log("Image Files:", imageFiles);
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          글쓰기
        </Typography>
        <TextField
          fullWidth
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="내용"
          multiline
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          required
        />
        <Box sx={{ mt: 2 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="raised-button-file">
            <IconButton component="span">
              <AddPhotoAlternateIcon />
            </IconButton>
          </label>
          <ImageList rowHeight={160} cols={3}>
            {images.map((img, index) => (
              <ImageListItem key={index}>
                <Image
                  src={img}
                  alt={`image-${index}`}
                  layout="fill"
                  objectFit="cover"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          작성 완료
        </Button>
      </Box>
    </Container>
  );
}

export default Write;
