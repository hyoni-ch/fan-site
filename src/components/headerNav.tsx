"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useScrollAnimation from "@/utils/scrollUtils";
import { getAccessToken } from "@/utils/token";
import { AccountCircle, ShoppingBag } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  appBarStyle,
  toolbarStyle,
  logoBoxStyle,
  menuBoxStyle,
  iconButtonStyle,
} from "@/styles/headerStyles";

function HeaderNav() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scrolling = useScrollAnimation();

  useEffect(() => {
    const accessToken = getAccessToken();
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleRoute = (path: string) => {
    router.push(isLoggedIn ? path : "/login");
  };

  return (
    <>
      {/* 네비게이션 메뉴 */}
      <AppBar sx={appBarStyle(scrolling)}>
        <Toolbar sx={toolbarStyle}>
          {/* 로고 */}
          <Link href="/">
            <Box sx={logoBoxStyle}>
              <Image
                src="/images/jjoul.png"
                alt="Logo"
                width={120}
                height={120}
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </Box>
          </Link>
          {/* 메뉴바 */}
          <Box sx={menuBoxStyle}>
            {["artist", "discography", "goods", "diary"].map((tab) => (
              <Typography
                key={tab}
                variant="h6"
                component={Link}
                href={`/${tab}`}
                sx={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": { opacity: 0.5 },
                }}
              >
                {tab.toUpperCase()}
              </Typography>
            ))}
          </Box>
          {/* 마이페이지 & 장바구니 아이콘 */}
          <Box sx={iconButtonStyle}>
            <IconButton color="inherit" onClick={() => handleRoute("/mypage")}>
              <AccountCircle sx={{ color: "black" }} />
            </IconButton>
            <IconButton color="inherit" onClick={() => handleRoute("/cart")}>
              <ShoppingBag sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HeaderNav;
