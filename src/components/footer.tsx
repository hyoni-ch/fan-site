import Link from "next/link";
import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";

function Footer() {
  const snsData = [
    {
      id: 1,
      name: "instagram",
      icon: InstagramIcon,
      path: "https://www.instagram.com/joyuri_offcl/#",
    },
    {
      id: 2,
      name: "x",
      icon: XIcon,
      path: "https://x.com/JOYURI_offcl",
    },
    {
      id: 3,
      name: "facebook",
      icon: FacebookIcon,
      path: "https://www.facebook.com/JOYURI.offcl",
    },
    {
      id: 4,
      name: "youtube",
      icon: YouTubeIcon,
      path: "https://www.youtube.com/channel/UCSEVFgCkKem_c3nIBm7F37g",
    },
    {
      id: 5,
      name: "spotify",
      icon: YouTubeIcon,
      path: "https://open.spotify.com/artist/3LFFf4EpKn2krneZ9vozyz",
    },
    {
      id: 6,
      name: "tiktok",
      icon: YouTubeIcon,
      path: "https://www.tiktok.com/@joyuri.offcl",
    },
  ];

  return (
    <div style={footerStyle}>
      <ul style={footerListStyle}>
        {snsData.map((sns) => {
          return (
            <li key={sns.id}>
              <Link href={sns.path}>
                <sns.icon fontSize="large" />
              </Link>
            </li>
          );
        })}
      </ul>

      <p style={{ color: "#7d7d7d" }}>
        COPYRIGHTⓒ 2025 PROJECT. ALL RIGHTS RESERVED.
      </p>
    </div>
  );
}

export default Footer;

const footerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  padding: "2rem",
};

const footerListStyle = {
  display: "flex",
  gap: 10,
  listStyleType: "none",
};
