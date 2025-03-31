import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ProfileHeader = () => {
  return (
    <>
      <Box sx={{ position: "relative", width: "100vw", height: "60vh" }}>
        <Image
          src="/images/profile2.png"
          alt="프로필 이미지"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </Box>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box mt={10} textAlign="center">
            <Typography variant="h3" fontWeight={600}>
              Profile
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={3}
              gap={1}
            >
              <Typography variant="body1" fontWeight={500}>
                조유리(JO YU RI)
              </Typography>
              <Typography variant="body2" fontWeight={300} color="#333" ml={1}>
                가수, 배우
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProfileHeader;
