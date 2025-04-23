import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import AlbumTab from "./albumTab";
import DramasTab from "./dramasTab";
import ConcertTab from "./concertTabs";
import AwardsTab from "./awardsTab";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import FadeInUpWrapper from "@/components/commonAnimation/FadeInUpWrapper";

const tabComponents = {
  // 함수형으로 수정, 추후 props 전달 유연성 증가
  album: () => <AlbumTab />,
  drama: () => <DramasTab />,
  concert: () => <ConcertTab />,
  awards: () => <AwardsTab />,
  // album: <AlbumTab />,
  // drama: <DramasTab />,
  // concert: <ConcertTab />,
  // awards: <AwardsTab />,
};

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<
    "album" | "drama" | "concert" | "awards"
  >("album");

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-80px 0px",
  });

  return (
    <Box ref={ref}>
      <AnimatePresence>
        {inView && (
          <motion.div {...FadeInUpWrapper}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h3" fontWeight={600}>
                Works
              </Typography>

              <Box>
                <Tabs
                  value={activeTab}
                  onChange={(_, newValue) => setActiveTab(newValue)}
                  textColor="inherit"
                  sx={{
                    width: "100%",
                    maxWidth: 600,
                    mb: 6,
                    mt: 2,
                    "& .MuiTabs-flexContainer": {
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#FCC422",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  {["album", "drama", "concert", "awards"].map((tab) => (
                    <Tab
                      key={tab}
                      value={tab}
                      label={tab.toUpperCase()}
                      sx={{
                        textTransform: "none",
                        fontWeight: activeTab === tab ? 700 : 500,
                        color: activeTab === tab ? "#FCC422" : "#474747",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.9rem",
                          md: "1rem",
                        },
                        width: { xs: "80px", sm: "120px", md: "130px" },
                        minWidth: "unset",
                        maxWidth: "unset",
                        flex: "unset",
                        textAlign: "center",
                      }}
                    />
                  ))}
                </Tabs>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  maxWidth: 800,
                }}
              >
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* {tabComponents[activeTab]} */}
                  {tabComponents[activeTab]()}
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ProfileTabs;
