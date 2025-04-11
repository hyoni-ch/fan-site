import useFetchDramas from "@/hooks/useProfileTabApi/useFetchDramas";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface ProfileDramaTabProps {
  isInView: boolean;
}

function DramasTab({ isInView }: ProfileDramaTabProps) {
  const { dramasData, loading, error } = useFetchDramas();
  const isFetched = useRef(false);

  useEffect(() => {
    if (isInView && !isFetched.current) {
      isFetched.current = true;
    }
  }, [isInView]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
      >
        <Typography sx={{ ml: 2 }}>
          서버에서 드라마 정보를 불러오는 중...
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
      >
        <Typography color="error">
          드라마 정보를 불러오는 중 오류가 발생했습니다
        </Typography>
      </Box>
    );
  }

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
            src={`/api${drama.careerImages[0]?.url}`}
            alt={drama.careerName}
            width={200}
            height={280}
            objectFit="contain"
            style={{ borderRadius: "8px" }}
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
