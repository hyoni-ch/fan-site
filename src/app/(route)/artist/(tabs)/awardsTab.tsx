import AwardItem from "@/components/commonProfileTab/AwardItem";
import { awardsData } from "@/constants/awardsData";
import { Box, Divider, Typography } from "@mui/material";

function AwardsTab() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      {awardsData.map(({ year, awards }, index) => (
        <Box key={year} width="100%" maxWidth="600px" mb={4}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            {year}
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {awards.map((award, idx) => (
              <AwardItem key={idx} text={award} />
            ))}
          </Box>
          {index < awardsData.length - 1 && (
            <Divider sx={{ mt: 3, borderColor: "rgba(0,0,0,0.1)" }} />
          )}
        </Box>
      ))}
    </Box>
  );
}

export default AwardsTab;
