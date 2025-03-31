import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const ProfileInfo = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
              <Typography variant="body2">2018 10/29 IZ*ONE</Typography>
              <Typography variant="body2">2021 10/07 (솔로) </Typography>
              <Typography variant="body2">2022 07/22 (배우)</Typography>
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
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileInfo;
