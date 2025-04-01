import Link from "next/link";
import Image from "next/image";
import React from "react";

import FacebookIcon from "../../public/images/icon/facebookIcon.png";
import InstagramIcon from "../../public/images/icon/instagramIcon.png";
import YouTubeIcon from "../../public/images/icon/youtubeIcon.png";
import XIcon from "../../public/images/icon/xIcon.png";
import TiktokIcon from "../../public/images/icon/tiktokIcon.png";
import spotifyIcon from "../../public/images/icon/spotifyIcon.png";
import { Box, IconButton } from "@mui/material";

function Footer() {
  const snsData = [
    {
      id: 1,
      name: "instagram",
      icon: InstagramIcon,
      path: "https://www.instagram.com/joyuri_offcl/#",
      width: 30,
      height: 30,
    },
    {
      id: 2,
      name: "x",
      icon: XIcon,
      path: "https://x.com/JOYURI_offcl",
      width: 30,
      height: 30,
    },
    {
      id: 3,
      name: "facebook",
      icon: FacebookIcon,
      path: "https://www.facebook.com/JOYURI.offcl",
      width: 30,
      height: 30,
    },
    {
      id: 4,
      name: "youtube",
      icon: YouTubeIcon,
      path: "https://www.youtube.com/channel/UCSEVFgCkKem_c3nIBm7F37g",
      width: 40,
      height: 30,
    },
    {
      id: 5,
      name: "spotify",
      icon: spotifyIcon,
      path: "https://open.spotify.com/artist/3LFFf4EpKn2krneZ9vozyz",
      width: 35,
      height: 35,
    },
    {
      id: 6,
      name: "tiktok",
      icon: TiktokIcon,
      path: "https://www.tiktok.com/@joyuri.offcl",
      width: 30,
      height: 30,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: "2rem",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {snsData.map((sns) => {
          return (
            <IconButton key={sns.id}>
              <Link href={sns.path}>
                <Image
                  src={sns.icon}
                  alt={sns.name}
                  width={sns.width}
                  height={sns.height}
                />
              </Link>
            </IconButton>
          );
        })}
      </Box>

      <p style={{ color: "#7d7d7d" }}>
        COPYRIGHTⓒ 2025 PROJECT. ALL RIGHTS RESERVED.
      </p>
    </Box>
  );
}

export default Footer;
