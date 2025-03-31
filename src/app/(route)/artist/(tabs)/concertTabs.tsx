import { getConcertList } from "@/api/profile";
import { API_BASED_URL } from "@/constants/apiUrl";
import { ConcertList } from "@/types/iprofile";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

function ConcertTab() {
  const [concerts, setConcerts] = useState<ConcertList[]>([]);
  //마운트시 getConcerList함수 실행 후 목록 저장.
  useEffect(() => {
    const fetchConcertList = async () => {
      const concertList = await getConcertList();
      setConcerts(concertList);
    };
    fetchConcertList();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {concerts.map((concert) => (
        <Box
          key={concert.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Image
            src={`${API_BASED_URL}${concert.concertImages[0]?.url}`}
            alt={concert.title}
            width={200}
            height={282}
            objectFit="contain"
          />
          <Typography variant="body2" fontWeight={600} mt={2}>
            {concert.title}
          </Typography>
          <Typography style={{ fontSize: "0.7rem", color: "#9c9c9c" }}>
            {concert.year}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default ConcertTab;
