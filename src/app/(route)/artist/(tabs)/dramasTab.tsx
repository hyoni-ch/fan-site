import { getDramaList } from "@/api/profile";
import { API_BASED_URL } from "@/constants/apiUrl";
import { DramaList } from "@/types/iprofile";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

function DramasTab() {
  const [dramas, setDramas] = useState<DramaList[]>([]);

  useEffect(() => {
    const fetchDramaList = async () => {
      const DramaList = await getDramaList();
      setDramas(DramaList);
    };
    fetchDramaList();
  }, []);

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
            src={`${API_BASED_URL}${drama.careerImages[0]?.url}`}
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
