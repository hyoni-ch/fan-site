"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import useDiaryStore from "@/store/diaryStore";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";
import { useDiaryInfiniteScroll } from "@/hooks/useDiaryApi/useInfiniteScroll";

function EveryDiary() {
  const router = useRouter();
  const roles = useAuthStore((state) => state.roles);
  const { diaryList, isLoading, hasMore } = useDiaryStore();

  useDiaryInfiniteScroll();

  const handleCardClick = (id?: number) => {
    if (id !== undefined) router.push(`/diary/${id}`);
  };

  const handleWriteClick = () => {
    router.push("/diary/write");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
        {/* 글쓰기 버튼 */}
        {roles?.includes("ROLE_ARTIST") && (
          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleWriteClick}
              sx={{
                backgroundColor: "#FCC422",
                color: "white",
                "&:hover": {
                  backgroundColor: "#F2A800",
                },
              }}
            >
              글쓰기
            </Button>
          </Box>
        )}

        {/* 에러 없음 시 카드 리스트 */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {diaryList.map((diary) => (
            <Box
              key={diary.id}
              sx={{
                width: { xs: "100%", sm: "48%", md: "30%" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => handleCardClick(diary.id)}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    diary.articleImageList[0]?.url
                      ? `${S3_IMAGE_BASE_URL}${diary.articleImageList[0].url}`
                      : "/images/diary1.png"
                  }
                  alt={diary.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {diary.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {diary.createDate}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {diary.content.length > 50
                      ? `${diary.content.slice(0, 50)}...`
                      : diary.content}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}

          {/* Skeleton UI */}
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: "100%", sm: "48%", md: "30%" },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={250}
                  animation="wave"
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton height={40} sx={{ mt: 1 }} />
                <Skeleton height={30} width="60%" />
              </Box>
            ))}
        </Box>

        {/* 에러 상태에서 Alert 띄우기 */}
        {!isLoading && diaryList.length === 0 && !hasMore && (
          <Alert severity="error" sx={{ mt: 4 }}>
            데이터를 불러오는 데 실패했어요. 나중에 다시 시도해 주세요.
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default EveryDiary;

//TODO 2차 리팩토링 과정 코드
// "use client";

// import React, { useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import useDiaryStore from "@/store/diaryStore";
// import useAuthStore from "@/store/authStore";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Typography,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";

// function EveryDiary() {
//   const router = useRouter();

//   const { diaryList, page, hasMore, isLoading, getDiaryList } = useDiaryStore();

//   const roles = useAuthStore((state) => state.roles);

//   // 초기 데이터 불러오기
//   useEffect(() => {
//     if (diaryList.length === 0 && !isLoading) {
//       getDiaryList(page);
//     }
//   }, [diaryList.length, isLoading, page, getDiaryList]);

//   // 무한스크롤 핸들러
//   const handleScroll = useCallback(() => {
//     const isBottom =
//       window.innerHeight + window.scrollY >=
//       document.documentElement.scrollHeight - 100;

//     if (isBottom && hasMore && !isLoading) {
//       getDiaryList();
//     }
//   }, [hasMore, isLoading, getDiaryList]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const handleCardClick = (id?: number) => {
//     if (id !== undefined) router.push(`/diary/${id}`);
//     else console.error("Invalid diary ID");
//   };

//   const handleWriteClick = () => {
//     router.push("/diary/write");
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
//         {/* 글쓰기 버튼 */}
//         {roles?.includes("ROLE_ARTIST") && (
//           <Box sx={{ mb: 4 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<EditIcon />}
//               onClick={handleWriteClick}
//               sx={{
//                 backgroundColor: "#FCC422",
//                 color: "white",
//                 padding: "8px 16px",
//                 borderRadius: "4px",
//                 fontSize: "0.875rem",
//                 "&:hover": {
//                   backgroundColor: "#F2A800",
//                 },
//               }}
//             >
//               글쓰기
//             </Button>
//           </Box>
//         )}

//         {/* 다이어리 카드 리스트 */}
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             gap: 2,
//           }}
//         >
//           {diaryList.map((diary) => (
//             <Box
//               key={diary.id}
//               sx={{
//                 width: { xs: "100%", sm: "48%", md: "30%" },
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <Card
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                   borderRadius: 2,
//                   boxShadow: 3,
//                   cursor: "pointer",
//                   transition: "transform 0.3s",
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//                   },
//                 }}
//                 onClick={() => handleCardClick(diary.id)}
//               >
//                 <CardMedia
//                   component="img"
//                   height="250"
//                   image={
//                     diary.articleImageList[0]?.url
//                       ? `${S3_IMAGE_BASE_URL}${diary.articleImageList[0].url}`
//                       : "/images/diary1.png"
//                   }
//                   alt={diary.title}
//                   sx={{
//                     borderTopLeftRadius: 2,
//                     borderTopRightRadius: 2,
//                     objectFit: "cover",
//                   }}
//                 />
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     component="div"
//                     sx={{ fontWeight: "bold" }}
//                   >
//                     {diary.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {diary.createDate}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     sx={{ mt: 1 }}
//                   >
//                     {diary.content.length > 50
//                       ? `${diary.content.slice(0, 50)}...`
//                       : diary.content}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Container>
//   );
// }

// export default EveryDiary;
