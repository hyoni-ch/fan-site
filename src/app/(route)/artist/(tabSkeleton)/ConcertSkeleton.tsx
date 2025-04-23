"use client";

import { Box, Divider, Skeleton, Typography } from "@mui/material";

export default function ConcertsSkeleton() {
  // 연도 섹션 2개, 각 섹션에 콘서트 아이템 3개씩
  const fakeYears = [2024, 2023];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      {fakeYears.map((year, index) => (
        <Box key={year} width="100%" maxWidth="600px" mb={4}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            <Skeleton width={80} height={24} />
          </Typography>

          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Box key={idx} component="li" sx={{ listStyle: "none", mb: 2 }}>
                <Skeleton width="80%" height={22} />
                <Skeleton width="60%" height={18} sx={{ mt: 1 }} />
              </Box>
            ))}
          </Box>

          {index < fakeYears.length - 1 && (
            <Divider sx={{ mt: 3, borderColor: "rgba(0,0,0,0.1)" }} />
          )}
        </Box>
      ))}
    </Box>
  );
}
