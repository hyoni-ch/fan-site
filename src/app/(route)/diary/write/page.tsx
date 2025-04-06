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
  styled,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image";
import { writeDiary } from "@/api/diary/diaryWrite";

// Custom 스타일 컴포넌트
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(10),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  textAlign: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const UploadButtonLabel = styled("label")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px dashed ${theme.palette.grey[500]}`,
  color: theme.palette.grey[700],
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StyledImageList = styled(ImageList)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2, 4),
  fontSize: "1rem",
}));

const ErrorTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: "center",
}));

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  //! 사진 2장 이상 가능할때
  // const [images, setImages] = useState<string[]>([]);
  // const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        <StyledTextField
          fullWidth
          label="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <StyledTextField
          fullWidth
          label="오늘의 이야기를 적어보세요..."
          multiline
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Box sx={{ mt: 3 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
          <UploadButtonLabel htmlFor="raised-button-file">
            <StyledIconButton>
              <AddPhotoAlternateIcon />
            </StyledIconButton>
            사진 첨부
          </UploadButtonLabel>
          {image && (
            <StyledImageList rowHeight={360} cols={1}>
              {/* cols를 1로 변경 */}
              <StyledImageListItem key="uploaded-image">
                <Image
                  src={image}
                  alt="uploaded-image"
                  fill
                  objectFit="cover"
                />
              </StyledImageListItem>
            </StyledImageList>
          )}
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
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? "작성 중..." : "작성 완료"}
        </SubmitButton>
        {error && <ErrorTypography color="error">{error}</ErrorTypography>}
      </Box>
    </StyledContainer>
  );
}

export default Write;

// import React from "react";
// import DiaryForm from "./_components/DiaryForm";

// function Write() {
//   return <DiaryForm />;
// }

// export default Write;
