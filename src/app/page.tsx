"use client";

import { Box } from "@mui/material";
// import { logout } from "@/utils/auth";

import { useEffect, useState } from "react";
import Section from "@/components/mainSection";

function Home() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [sectionHeight, setSectionHeight] = useState<number>(0);
  const sections = [0, 1, 2, 3];

  useEffect(() => {
    setSectionHeight(window.innerHeight);
  }, []);

  const handleScroll = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      if (currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      }
    } else {
      if (currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSection]);

  useEffect(() => {
    if (sectionHeight > 0) {
      window.scrollTo({
        top: currentSection * sectionHeight,
        behavior: "smooth",
      });
    }
  }, [currentSection, sectionHeight]);

  return (
    <Box style={{ backgroundColor: "#ECE7E4" }}>
      <Section backgroundImage="/images/mainImg.jpg" sectionNumber={1} />
      <Section
        title="DISCOGRAPHY"
        sectionNumber={2}
        moreButtonPath="/discography"
      />
      <Section title="GOODS" sectionNumber={3} moreButtonPath="/goods" />
    </Box>
  );
}

export default Home;
