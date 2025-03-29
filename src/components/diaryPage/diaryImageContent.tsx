"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface DiaryImageContentProps {
  src: string;
  alt: string;
  index: number;
}

function DiaryImageContent({ src, alt, index }: DiaryImageContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </motion.div>
  );
}

export default DiaryImageContent;
