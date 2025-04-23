"use client";

import DramasSkeleton from "@/app/(route)/artist/(tabSkeleton)/DramaSkeleton";
import RetryErrorBox from "@/components/commonProfileTab/refetchButton";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";
import useFetchDramas from "@/hooks/useProfileTabApi/useFetchDramas";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Button from "@mui/material/Button";
// import LoadingIndicator from "@/components/LoadingIndicator";

const ITEMS_PER_PAGE = 6;

function DramasTab() {
  const { data: dramasData, isLoading, error, refetch } = useFetchDramas();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <DramasSkeleton />
        {/* <LoadingIndicator message="드라마 정보를 불러오는 중입니다..." /> */}
        <Typography variant="body2" color="textSecondary" mt={4}>
          드라마 정보를 불러오는 중입니다...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <RetryErrorBox
        message="드라마 정보를 불러오는 중 오류가 발생했습니다"
        onRetry={refetch}
      />
    );
  }

  if (!dramasData) return null;

  const visibleDramas = dramasData.slice(0, visibleCount);
  const hasMore = visibleCount < dramasData.length;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          maxWidth: "800px",
        }}
      >
        <AnimatePresence>
          {visibleDramas.map((drama) => (
            <motion.div
              key={drama.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                width: "calc(33.333% - 20px)",
                minWidth: "200px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
                borderRadius={2}
                bgcolor="#fafafa"
              >
                <Image
                  src={`${S3_IMAGE_BASE_URL}${drama.careerImages[0]?.url}`}
                  alt={drama.careerName}
                  width={200}
                  height={280}
                  style={{ borderRadius: 8, objectFit: "contain" }}
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  mt={2}
                  textAlign="center"
                >
                  {drama.careerName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#9c9c9c",
                    mt: 1,
                    textAlign: "center",
                  }}
                >
                  {drama.releaseDate}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {hasMore && (
        <Button
          variant="outlined"
          onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
          sx={{ mt: 4, mb: 6, fontWeight: 600 }}
        >
          더 보기
        </Button>
      )}
    </Box>
  );
}

export default DramasTab;

//! 레거시 코드 부분
// import DramasSkeleton from "@/components/commonProfileTab/DramaSkeleton";
// import RetryErrorBox from "@/components/commonProfileTab/refetchButton";
// import LoadingIndicator from "@/components/LoadingIndicator";
// // import LoadingIndicator from "@/components/LoadingIndicator";
// import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";
// import useFetchDramas from "@/hooks/useProfileTabApi/useFetchDramas";
// import { Box, Typography } from "@mui/material";
// import Image from "next/image";

// function DramasTab() {
//   const { data: dramasData, loading, error, refetch } = useFetchDramas();

//   if (loading) {
//     return (
//       <Box>
//         <DramasSkeleton />
//         <LoadingIndicator message="드라마 정보를 불러오는 중입니다..." />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <RetryErrorBox
//         message="드라마 정보를 불러오는 중 오류가 발생했습니다"
//         onRetry={refetch}
//       />
//     );
//   }

//   if (!dramasData) return null;

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       {dramasData.map((drama) => (
//         <Box
//           key={drama.id}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             marginTop: 4,
//           }}
//         >
//           <Image
//             src={`${S3_IMAGE_BASE_URL}${drama.careerImages[0]?.url}`}
//             // 레거시 이미지 src
//             // src={`/api${drama.careerImages[0]?.url}`}
//             alt={drama.careerName}
//             width={200}
//             height={280}
//             style={{ borderRadius: "8px", objectFit: "contain" }}
//           />
//           <Typography variant="body2" fontWeight={600} mt={2}>
//             {drama.careerName}
//           </Typography>
//           <Typography style={{ fontSize: "0.7rem", color: "#9c9c9c" }}>
//             {drama.releaseDate}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// }

// export default DramasTab;
