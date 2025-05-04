"use client";
import React from "react";
import { Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DiaryTextFields from "./DiaryTextFields";
import DiarySubmitButton from "./DiarySubmitButton";
import DiaryImageList from "./DiaryImageList";
import {
  StyledContainer,
  StyledTypography,
  StyledIconButton,
  UploadButtonLabel,
  ErrorTypography,
} from "./DiaryStyles";
import { useDiaryWriteForm } from "@/hooks/useDiaryApi/useDiaryWriteForm";

function DiaryForm() {
  const {
    title,
    content,
    image,
    loading,
    error,
    dispatch,
    handleImageUpload,
    handleSubmit,
  } = useDiaryWriteForm();

  return (
    <StyledContainer maxWidth="md">
      <StyledTypography variant="h4" gutterBottom>
        오늘의 하루~
      </StyledTypography>
      <Box component="form" onSubmit={handleSubmit}>
        <DiaryTextFields
          title={title}
          content={content}
          onTitleChange={(val) => dispatch({ type: "SET_TITLE", payload: val })}
          onContentChange={(val) =>
            dispatch({ type: "SET_CONTENT", payload: val })
          }
        />

        <Box sx={{ mt: 3 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-photo"
            type="file"
            onChange={handleImageUpload}
          />
          <UploadButtonLabel htmlFor="upload-photo">
            <StyledIconButton as="span">
              <AddPhotoAlternateIcon />
            </StyledIconButton>
            사진 첨부
          </UploadButtonLabel>
          {image && <DiaryImageList image={image} />}
        </Box>

        <DiarySubmitButton loading={loading} />
        {error && <ErrorTypography>{error}</ErrorTypography>}
      </Box>
    </StyledContainer>
  );
}

export default DiaryForm;
