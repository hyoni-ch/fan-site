import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import AlbumTab from "./albumTab";
import DramasTab from "./dramasTab";
import ConcertTab from "./concertTabs";
import AwardsTab from "./awardsTab";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
              <Box
                sx={{
                  width: "100%",
                  mx: "auto",
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={(_, newValue) => setActiveTab(newValue)}
                  textColor="inherit"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    "& .MuiTabs-indicator": { backgroundColor: "#FCC422" },
                    mb: 6,
                    mt: 2,
                  }}
                  centered
                >
                  {["album", "drama", "concert", "awards"].map((tab) => (
                    <Tab
                      key={tab}
                      value={tab}
                      label={tab.toUpperCase()}
                      sx={{
                        color: activeTab === tab ? "#FCC422" : "gray",
                        fontWeight: activeTab === tab ? "bold" : "normal",
                        transition: "color 0.3s",
                        minWidth: 100,
                      }}
                    />
                  ))}
                </Tabs>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  maxWidth: 800,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {activeTab === "album" && <AlbumTab />}
                {activeTab === "drama" && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <DramasTab inView={inView} />
                  </motion.div>
                )}
                {activeTab === "concert" && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ConcertTab />
                  </motion.div>
                )}
                {activeTab === "awards" && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AwardsTab />
                  </motion.div>
                )}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ProfileTabs;
