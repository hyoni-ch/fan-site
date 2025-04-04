import { getDramaList } from "@/api/profile";
import { DramaList } from "@/types/iprofile";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function DramasTab({ inView }: { inView: boolean }) {
  const [dramas, setDramas] = useState<DramaList[]>([]);
  const isFetched = useRef(false);

  useEffect(() => {
    if (inView && !isFetched.current) {
      const fetchDramaList = async () => {
        const dramaList = await getDramaList();
        setDramas(dramaList);
        console.log("메롱", dramaList);
        isFetched.current = true;
      };
      fetchDramaList();
    }
  }, [inView]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {dramas.map((drama) => (
        <Box
          key={drama.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Image
            src={`/api${drama.careerImages[0]?.url}`}
            alt={drama.careerName}
            width={200}
            height={282}
            objectFit="contain"
          />
          <Typography variant="body2" fontWeight={600} mt={2}>
            {drama.careerName}
          </Typography>
          <Typography style={{ fontSize: "0.7rem", color: "#9c9c9c" }}>
            {drama.releaseDate}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default DramasTab;
