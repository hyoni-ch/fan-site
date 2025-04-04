"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useScrollAnimation from "@/utils/scrollUtils";
import {
  AccountCircle,
  ShoppingBag,
  AdminPanelSettings,
} from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  appBarStyle,
  toolbarStyle,
  logoBoxStyle,
  menuBoxStyle,
  iconButtonStyle,
} from "@/styles/headerStyles";
import useAuthStore from "@/store/authStore";

function HeaderNav() {
  const router = useRouter();
  const scrolling = useScrollAnimation();

  const { username, accessToken, roles } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMainPage, setIsMainPage] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setIsMainPage(window.location.pathname === "/");
    if (isHydrated) {
      console.log("헤더에서 상태:", { username, accessToken, roles });
    }
  }, [isHydrated, username, accessToken, roles]);

  const handleRoute = (path: string) => {
    router.push(path);
  };

  const handleMyPageClick = () => {
    if (accessToken) {
      router.push("/mypage");
    } else {
      router.push("/login");
    }
  };

  // admin만 이동 가능
  const handleAdminPageClick = () => {
    router.push("/admin");
  };

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* 네비게이션 메뉴 */}
      <AppBar sx={appBarStyle(scrolling, isMainPage)}>
        <Toolbar sx={toolbarStyle}>
          {/* 로고 */}
          <Box sx={logoBoxStyle}>
            <Link href="/">
              <Image
                src="/images/jjoul.png"
                alt="Logo"
                width={140}
                height={140}
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </Link>
          </Box>

          {/* 메뉴바 */}
          <Box sx={menuBoxStyle}>
            {["diary", "goods", "discography", "artist"].map((tab) => (
              <Typography
                key={tab}
                variant="h6"
                component={Link}
                href={`/${tab}`}
                sx={{
                  textDecoration: "none",
                  color: "#FCC422",
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
            {roles && roles.includes("ROLE_ADMIN") && (
              <IconButton color="inherit" onClick={handleAdminPageClick}>
                <AdminPanelSettings sx={{ color: "#FCC422" }} />
              </IconButton>
            )}
            <IconButton color="inherit" onClick={handleMyPageClick}>
              <AccountCircle sx={{ color: "#FCC422" }} />
            </IconButton>
            <IconButton color="inherit" onClick={() => handleRoute("/cart")}>
              <ShoppingBag sx={{ color: "#FCC422" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HeaderNav;
