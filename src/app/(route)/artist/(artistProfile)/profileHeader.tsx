import FadeInUpWrapper from "@/components/commonAnimation/FadeInUpWrapper";
import { Box, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
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
          style={{ objectFit: "cover", filter: "brightness(0.6)" }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
          textAlign="center"
          sx={{
            backdropFilter: "blur(2px)",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))",
          }}
        >
          <Typography variant="h3" fontWeight={700}>
            조유리(JO YU RI)
          </Typography>
        </Box>
      </Box>
      <AnimatePresence>
        <FadeInUpWrapper>
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
              <Typography variant="body1" fontWeight={600}>
                조유리(JO YU RI)
              </Typography>
              <Typography
                variant="body2"
                fontWeight={400}
                color="#7a7a7a"
                ml={1}
              >
                가수, 배우
              </Typography>
            </Box>
          </Box>
        </FadeInUpWrapper>
      </AnimatePresence>
    </>
  );
};

export default ProfileHeader;
