// "use client";
// import React, { useReducer, useEffect } from "react";
// import { Box } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import { useRouter } from "next/navigation";

// import DiaryTextFields from "./DiaryTextFields";
// import DiarySubmitButton from "./DiarySubmitButton";
// import DiaryImageList from "./DiaryImageList";
// import {
//   StyledContainer,
//   StyledTypography,
//   StyledIconButton,
//   UploadButtonLabel,
//   ErrorTypography,
// } from "./DiaryStyles";

// import { writeDiary } from "@/api/diary/diaryWrite";
// import useDiaryStore from "@/store/diaryStore";

// // 초기 상태 정의
// const initialState = {
//   title: "",
//   content: "",
//   image: null as string | null,
//   imageFile: null as File | null,
//   loading: false,
//   error: null as string | null,
// };

// // 액션 타입 정의
// type Action =
//   | { type: "SET_TITLE"; payload: string }
//   | { type: "SET_CONTENT"; payload: string }
//   | { type: "SET_IMAGE"; payload: { preview: string; file: File } }
//   | { type: "CLEAR_IMAGE" }
//   | { type: "SET_LOADING"; payload: boolean }
//   | { type: "SET_ERROR"; payload: string | null }
//   | { type: "RESET_FORM" };

// // 리듀서 함수 정의
// function reducer(
//   state: typeof initialState,
//   action: Action
// ): typeof initialState {
//   switch (action.type) {
//     case "SET_TITLE":
//       return { ...state, title: action.payload };
//     case "SET_CONTENT":
//       return { ...state, content: action.payload };
//     case "SET_IMAGE":
//       return {
//         ...state,
//         image: action.payload.preview,
//         imageFile: action.payload.file,
//       };
//     case "CLEAR_IMAGE":
//       return { ...state, image: null, imageFile: null };
//     case "SET_LOADING":
//       return { ...state, loading: action.payload };
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     case "RESET_FORM":
//       return initialState;
//     default:
//       return state;
//   }
// }

// function DiaryForm() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { title, content, image, imageFile, loading, error } = state;
//   const router = useRouter();

//   // 이미지 메모리 해제 (cleanup)
//   useEffect(() => {
//     return () => {
//       if (image) URL.revokeObjectURL(image);
//     };
//   }, [image]);

//   // 이미지 업로드 핸들러
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const preview = URL.createObjectURL(file);
//       dispatch({ type: "SET_IMAGE", payload: { preview, file } });
//     } else {
//       dispatch({ type: "CLEAR_IMAGE" });
//     }
//   };

//   // 제출 핸들러
//   const handleDiarySubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch({ type: "SET_LOADING", payload: true });
//     dispatch({ type: "SET_ERROR", payload: null });

//     try {
//       const newDiary = await writeDiary(title, content, imageFile);
//       useDiaryStore.getState().addDiary(newDiary);
//       alert("다이어리 작성 완료!");
//       dispatch({ type: "RESET_FORM" });
//       router.push("/diary/everydiary");
//     } catch (err) {
//       console.error("작성 실패", err);
//       dispatch({
//         type: "SET_ERROR",
//         payload: "다이어리 작성 실패. 다시 시도해주세요.",
//       });
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };
//   return (
//     <StyledContainer maxWidth="md">
//       <StyledTypography variant="h4" gutterBottom>
//         오늘의 하루~
//       </StyledTypography>

//       <Box component="form" onSubmit={handleDiarySubmit}>
//         <DiaryTextFields
//           title={title}
//           content={content}
//           onTitleChange={(val) => dispatch({ type: "SET_TITLE", payload: val })}
//           onContentChange={(val) =>
//             dispatch({ type: "SET_CONTENT", payload: val })
//           }
//         />

//         {/* 이미지 업로드 버튼 및 미리보기 */}
//         <Box sx={{ mt: 3 }}>
//           <input
//             accept="image/*"
//             style={{ display: "none" }}
//             id="upload-photo"
//             type="file"
//             onChange={handleImageUpload}
//           />
//           <UploadButtonLabel htmlFor="upload-photo">
//             {/* <StyledIconButton> */}
//             <StyledIconButton as="span">
//               <AddPhotoAlternateIcon />
//             </StyledIconButton>
//             사진 첨부
//           </UploadButtonLabel>
//           {image && <DiaryImageList image={image} />}
//         </Box>

//         {/* 제출 버튼 */}
//         <DiarySubmitButton loading={loading} />

//         {/* 에러 메시지 */}
//         {error && <ErrorTypography>{error}</ErrorTypography>}
//       </Box>
//     </StyledContainer>
//   );
// }

// export default DiaryForm;
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
