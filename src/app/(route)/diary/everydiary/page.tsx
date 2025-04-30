// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import useAuthStore from "@/store/authStore";
// import useDiaryStore from "@/store/diaryStore";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Typography,
//   Skeleton,
//   Alert,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";
// import { useDiaryInfiniteScroll } from "@/hooks/useDiaryApi/useInfiniteScroll";
// import api from "@/utils/api";

// function EveryDiary() {
//   const router = useRouter();
//   const roles = useAuthStore((state) => state.roles);
//   const { diaryList, isLoading, hasMore } = useDiaryStore();

//   useDiaryInfiniteScroll();

//   const handleCardClick = (id?: number) => {
//     if (id !== undefined) router.push(`/diary/${id}`);
//   };

//   const handleWriteClick = async () => {
//     const token = useAuthStore.getState().accessToken;
//     try {
//       const { data } = await api.get("/home", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(data);

//       if (Array.isArray(data.roles) && data.roles.includes("ROLE_ARTIST")) {
//         router.push("/diary/write");
//       } else {
//         alert("글쓰기 권한이 없습니다.");
//       }
//     } catch {
//       alert("인증 정보 확인에 실패했습니다. 다시 로그인해주세요.");
//       router.push("/login");
//     }
//   };

//   const showSkeleton = isLoading && hasMore;

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
//         {/* 타이틀 + 설명 */}
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           gutterBottom
//           textAlign="center"
//         >
//           유리의 일상
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mb: 3, textAlign: "center" }}
//         >
//           모든 작성된 다이어리를 한눈에 확인해보세요.
//         </Typography>
//         {/* 글쓰기 버튼 */}
//         {roles?.includes("ROLE_ARTIST") && (
//           <Box sx={{ mb: 4, textAlign: "right" }}>
//             <Button
//               variant="contained"
//               startIcon={<EditIcon />}
//               onClick={handleWriteClick}
//               sx={{
//                 backgroundColor: "#FCC422",
//                 color: "white",
//                 "&:hover": {
//                   backgroundColor: "#F2A800",
//                 },
//               }}
//             >
//               글쓰기
//             </Button>
//           </Box>
//         )}

//         {/* 구분선 */}
//         <Box sx={{ borderBottom: "2px solid #eee", mb: 4 }} />

//         {/* 에러 없음 시 카드 리스트 */}
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
//                     diary.articleImageList?.[0]?.url
//                       ? `${S3_IMAGE_BASE_URL}${diary.articleImageList[0].url}`
//                       : "/images/diary1.png"
//                   }
//                   alt={diary.title}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold">
//                     {diary.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {diary.createDate}
//                   </Typography>
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     {diary.content.length > 50
//                       ? `${diary.content.slice(0, 50)}...`
//                       : diary.content}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))}

//           {/* Skeleton UI */}
//           {showSkeleton &&
//             Array.from({ length: 3 }).map((_, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   width: { xs: "100%", sm: "48%", md: "30%" },
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <Skeleton
//                   variant="rectangular"
//                   height={250}
//                   animation="wave"
//                   sx={{ borderRadius: 2 }}
//                 />
//                 <Skeleton height={40} sx={{ mt: 1 }} />
//                 <Skeleton height={30} width="60%" />
//               </Box>
//             ))}
//         </Box>

//         {/* 에러 상태에서 Alert 띄우기 */}
//         {!isLoading && diaryList.length === 0 && !hasMore && (
//           <Alert severity="error" sx={{ mt: 4 }}>
//             데이터를 불러오는 데 실패했어요. 나중에 다시 시도해 주세요.
//           </Alert>
//         )}
//       </Box>
//     </Container>
//   );
// }

// export default EveryDiary;

"use client";

import React from "react";
import { Box, Button, Container, Typography, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import useAuthStore from "@/store/authStore";
import useDiaryStore from "@/store/diaryStore";
import { useDiaryInfiniteScroll } from "@/hooks/useDiaryApi/useInfiniteScroll";
import useDiaryPermission from "@/hooks/useDiaryApi/useDiaryPermission";
import DiaryCard from "./_components/DiaryCard";
import DiaryCardSkeleton from "./_components/DiaryCardSkeleton";

function EveryDiary() {
  const roles = useAuthStore((state) => state.roles);
  const { diaryList, isLoading, hasMore } = useDiaryStore();
  const { checkArtistPermission } = useDiaryPermission();

  useDiaryInfiniteScroll();
  const showSkeleton = isLoading && hasMore;

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          유리의 하루들 ✨
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          모든 작성된 다이어리를 한눈에 확인해보세요.
        </Typography>

        {/* Write Button */}
        {roles?.includes("ROLE_ARTIST") && (
          <Box sx={{ mb: 4, textAlign: "right" }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={checkArtistPermission}
              sx={{
                backgroundColor: "#FCC422",
                color: "white",
                "&:hover": { backgroundColor: "#F2A800" },
              }}
            >
              작성하기
            </Button>
          </Box>
        )}

        <Box sx={{ borderBottom: "2px solid #eee", mb: 4 }} />

        {/* Diary Card List */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {diaryList.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}

          {showSkeleton &&
            Array.from({ length: 3 }).map((_, i) => (
              <DiaryCardSkeleton key={i} />
            ))}
        </Box>

        {/* Error */}
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
