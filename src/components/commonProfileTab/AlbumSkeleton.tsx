import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function AlbumSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        maxWidth: "800px",
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: "calc(33.333% - 20px)",
            minWidth: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            borderRadius: 2,
            bgcolor: "#f0f0f0", // 스켈레톤 배경색
          }}
        >
          <Skeleton
            variant="rectangular"
            width={200}
            height={200}
            style={{ borderRadius: 8 }}
          />
          <Skeleton width="80%" height={16} style={{ marginTop: 8 }} />
          <Skeleton width="60%" height={14} style={{ marginTop: 4 }} />
          <Skeleton width="40%" height={12} style={{ marginTop: 4 }} />
        </Box>
      ))}
    </Box>
  );
}

export default AlbumSkeleton;
