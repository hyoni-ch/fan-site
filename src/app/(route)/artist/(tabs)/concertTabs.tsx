import { getConcertList } from "@/api/profile";
import { ConcertList } from "@/types/iprofile";
import { Box, Typography } from "@mui/material";
// import Image from "next/image";
import { useEffect, useState } from "react";

function ConcertTab() {
  const [concerts, setConcerts] = useState<ConcertList[]>([]);

  //마운트시 getConcerList함수 실행 후 목록 저장.
  useEffect(() => {
    const fetchConcertList = async () => {
      const concertList = await getConcertList();
      setConcerts(concertList);
    };
    console.log("AlbumTab 렌더링됨");
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
          {/* <Image
            src={`/api${concert.concertImages[0]?.url}`}
            alt={concert.title}
            width={200}
            height={282}
            objectFit="contain"
          /> */}
          <Typography style={{ fontSize: "0.7rem", color: "#000000" }}>
            {concert.concertDate}
          </Typography>
          <Typography variant="body2" fontWeight={600} mt={1}>
            {concert.concertName}
          </Typography>
          <Typography style={{ fontSize: "0.7rem", color: "#9c9c9c" }}>
            {concert.place}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default ConcertTab;
