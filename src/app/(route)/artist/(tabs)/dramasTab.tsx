import RetryErrorBox from "@/components/commonProfileTab/refetchButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";
import useFetchDramas from "@/hooks/useProfileTabApi/useFetchDramas";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

function DramasTab() {
  const { data: dramasData, loading, error, refetch } = useFetchDramas();

  if (loading) {
    return <LoadingIndicator message="드라마 정보를 불러오는 중입니다..." />;
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

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {dramasData.map((drama) => (
        <Box
          key={drama.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Image
            src={`${S3_IMAGE_BASE_URL}${drama.careerImages[0]?.url}`}
            // 레거시 이미지 src
            // src={`/api${drama.careerImages[0]?.url}`}
            alt={drama.careerName}
            width={200}
            height={280}
            style={{ borderRadius: "8px", objectFit: "contain" }}
          />
          <Typography variant="body2" fontWeight={600} mt={2}>
            {drama.careerName}
          </Typography>
          <Typography style={{ fontSize: "0.7rem", color: "#9c9c9c" }}>
            {drama.releaseDate}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default DramasTab;
