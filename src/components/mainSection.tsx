import { Box, Button, Link, Typography } from "@mui/material";
import Image from "next/image";
import MainSlider from "./mainSlider";
import MainGoods from "./mainGoods";
const MainSection = ({
  title,
  backgroundImage,
  backgroundColor = "#ECE7E4",
  sectionNumber,
  moreButtonPath,
}: {
  title?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  sectionNumber: number;
  moreButtonPath?: string;
}) => (
  <Box component="section" sx={{ height: "100vh", backgroundColor }}>
    {backgroundImage && (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        <Image
          src={backgroundImage}
          alt="main image"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
    )}
    <Typography variant="h4" component="h1" sx={{ textAlign: "center", pb: 5 }}>
      {title}
    </Typography>

    {sectionNumber === 2 && (
      <Box sx={{ position: "relative", height: "500px" }}>
        <MainSlider />
      </Box>
    )}

    {sectionNumber === 3 && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <MainGoods />
      </Box>
    )}

    {(sectionNumber === 2 || sectionNumber === 3) && moreButtonPath && (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Link href={moreButtonPath}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fcc422",
              borderRadius: "20px",
              pl: 5,
              pr: 5,
            }}
          >
            MORE
          </Button>
        </Link>
      </Box>
    )}
  </Box>
);

export default MainSection;
