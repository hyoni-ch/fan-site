import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function DramasSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        maxWidth: "800px",
        margin: "0 auto",
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
            bgcolor: "#f5f5f5",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={200}
            height={280}
            style={{ borderRadius: 8 }}
          />
          <Skeleton width="80%" height={16} style={{ marginTop: 12 }} />
          <Skeleton width="60%" height={14} style={{ marginTop: 6 }} />
        </Box>
      ))}
    </Box>
  );
}

export default DramasSkeleton;
