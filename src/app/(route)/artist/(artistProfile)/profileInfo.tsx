import FadeInUpWrapper from "@/components/commonAnimation/FadeInUpWrapper";
import { Box, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";

const debutDates = [
  "2018 10/29 IZ*ONE",
  "2021 10/07 (솔로)",
  "2022 07/22 (배우)",
];

const ProfileInfo = () => {
  return (
    <AnimatePresence>
      <FadeInUpWrapper>
        <Box
          display="flex"
          justifyContent="space-evenly"
          width="100%"
          maxWidth={800}
          mt={3}
          mb={10}
          borderBottom="1px solid #c4c4c4"
          pb={5}
        >
          <Box display="flex">
            <Box>
              <Typography variant="h6" fontWeight={500} mr={2}>
                Debut
              </Typography>
            </Box>
            <Box mt={1} mr={2}>
              {debutDates.map((date, idx) => (
                <Typography key={idx} variant="body2">
                  {date}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box display="flex">
            <Box>
              <Typography variant="h6" fontWeight={500} mr={2}>
                Birth
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant="body2">2001년 10월 22일</Typography>
            </Box>
          </Box>
        </Box>
      </FadeInUpWrapper>
    </AnimatePresence>
  );
};

export default ProfileInfo;
