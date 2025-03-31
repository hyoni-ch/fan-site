import { Box, Typography } from "@mui/material";

function AwardsTab() {
  return (
    <Box>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box display="flex" gap={2}>
          <Typography variant="body2" fontWeight={500}>
            2025
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            제1회 디 어워즈 (D Awards) - 임팩트상 수상
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Typography variant="body2" fontWeight={500}>
            2024
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            2024 아시아 아티스트 어워즈 (AAA 2024) AAA 베스트 초이스상 수상
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Typography variant="body2" fontWeight={500}>
            2024
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            2024 아시아 아티스트 어워즈 (AAA 2024)​ AAA 이모티브상 수상
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Typography variant="body2" fontWeight={500}>
            2023
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            2023 대한민국 퍼스트브랜드 대상
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Typography variant="body2" fontWeight={500}>
            2022
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            MNET JAPAN FAN’S CHOICE AWARDS
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Typography variant="body2" fontWeight={500}>
            2022
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            SBS MTV 더쇼 1위 수상
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AwardsTab;
