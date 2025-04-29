import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  src: string;
  alt: string;
  isSelected: boolean;
  index: number;
}

export default function DiaryImage({ src, alt, isSelected, index }: Props) {
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
        width={1500}
        height={840}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: isSelected ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      />
    </motion.div>
  );
}
