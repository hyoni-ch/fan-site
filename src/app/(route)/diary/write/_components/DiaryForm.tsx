// components/diary/DiaryForm.tsx
"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DiaryTextFields from "./DiaryTextFields";
import DiarySubmitButton from "./DiarySubmitButton";
import DiaryImageList from "./DiaryImageList";
import {
  UploadButtonLabel,
  StyledContainer,
  StyledTypography,
  StyledIconButton,
  ErrorTypography,
} from "./DiaryStyles";
import { writeDiary } from "@/api/diary/diaryWrite";

function DiaryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  //! 사진 2장 이상 가능할때
  // const [images, setImages] = useState<string[]>([]);
  // const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const newImage = URL.createObjectURL(files[0]);
      setImage(newImage);
      setImageFile(files[0]);
    } else {
      setImage(null);
      setImageFile(null);
    }
  };
  //! 사진 2상 이상 가능할때 함수
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files) {
  //     const newImages = Array.from(files).map((file) =>
  //       URL.createObjectURL(file)
  //     );
  //     setImages((prevImages) => [...prevImages, ...newImages]);
  //     setImageFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // const firstImageFile = imageFiles[0] || null;
      // const responseData = await writeDiary(title, content, firstImageFile);
      const responseData = await writeDiary(title, content, imageFile);
      console.log("다이어리 작성 성공:", responseData);
      alert("다이어리가 성공적으로 작성되었습니다!");
      setTitle("");
      setContent("");
      setImage(null);
      setImageFile(null);
      // setImages([]);
      // setImageFiles([]);
    } catch (err) {
      console.error("다이어리 작성 실패:", err);
      setError("다이어리 작성에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <StyledTypography variant="h4" gutterBottom>
        오늘의 하루~
      </StyledTypography>
      <Box component="form" onSubmit={handleSubmit}>
        <DiaryTextFields
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />
        <Box sx={{ mt: 3 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={handleImageUpload}
          />
          <UploadButtonLabel htmlFor="raised-button-file">
            <StyledIconButton>
              <AddPhotoAlternateIcon />
            </StyledIconButton>
            사진 첨부
          </UploadButtonLabel>
          {image && <DiaryImageList image={image} />}
          {/* 이미지 2개이상 요청 가능할때 */}
          {/* <StyledImageList rowHeight={160} cols={3}>
            {images.map((img, index) => (
              <StyledImageListItem key={index}>
                <Image
                  src={img}
                  alt={`image-${index}`}
                  layout="fill"
                  objectFit="cover"
                />
              </StyledImageListItem>
            ))}
          </StyledImageList> */}
        </Box>
        <DiarySubmitButton loading={loading} />
        {error && <ErrorTypography color="error">{error}</ErrorTypography>}
      </Box>
    </StyledContainer>
  );
}

export default DiaryForm;
