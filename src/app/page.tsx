"use client";

// import { logout } from "@/utils/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    <div>
      <section style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Image
          src="/images/mainImg.jpg"
          alt="mainImg"
          layout="fill"
          objectFit="cover"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </section>

      <section
        style={{
          height: "100vh",
          backgroundColor: "#aaa",
        }}
      >
        <h1>DISCOGRAPHY</h1>
      </section>

      <section
        style={{
          height: "100vh",
          backgroundColor: "#bbb",
        }}
      >
        <h1>GOODS</h1>
      </section>
    </div>
  );
}

export default Home;
