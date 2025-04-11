"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useScrollAnimation from "@/utils/scrollUtils";
import {
  AccountCircle,
  ShoppingCart,
  AdminPanelSettings,
  Menu as MenuIcon,
  Close as CloseIcon,
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
import { motion, AnimatePresence } from "framer-motion";

function HeaderNav() {
  const router = useRouter();
  const scrolling = useScrollAnimation();

  const { accessToken, roles } = useAuthStore();
  const [isMainPage, setIsMainPage] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsMainPage(window.location.pathname === "/");
  }, []);

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

  const handleAdminPageClick = () => {
    router.push("/admin");
  };

  const menuItems = [
    { text: "ARTIST", href: "/artist" },
    { text: "DISCOGRAPHY", href: "/discography" },
    { text: "GOODS", href: "/goods" },
    { text: "DIARY", href: "/diary" },
  ];

  return (
    <>
      <AppBar sx={appBarStyle(scrolling, isMainPage)}>
        <Toolbar sx={{ ...toolbarStyle, justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={logoBoxStyle}>
            <Link href="/">
              <Image
                src="/images/jjoul.png"
                alt="Logo"
                width={170}
                height={100}
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Menu Bar for larger screens */}
            <Box
              sx={{
                ...menuBoxStyle,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                justifyContent: "center",
                ml: 40,
              }}
            >
              {menuItems.map((item) => (
                <Typography
                  key={item.text}
                  variant="h5"
                  component={Link}
                  href={item.href}
                  sx={{
                    textDecoration: "none",
                    color: "#FCC422",
                    fontWeight: 600,
                    fontSize: "1rem",
                    transition: "opacity 0.2s",
                    "&:hover": { opacity: 0.6 },
                    ml: 3,
                  }}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
            {/* My Page & Cart Icons */}
            <Box sx={{ ...iconButtonStyle, ml: "auto" }}>
              {roles && roles.includes("ROLE_ADMIN") && (
                <IconButton
                  color="inherit"
                  onClick={handleAdminPageClick}
                  sx={{ ml: 1 }}
                >
                  <AdminPanelSettings sx={{ color: "#FCC422", fontSize: 30 }} />
                </IconButton>
              )}
              <IconButton
                color="inherit"
                onClick={handleMyPageClick}
                sx={{ ml: 1 }}
              >
                <AccountCircle sx={{ color: "#FCC422", fontSize: 30 }} />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => handleRoute("/cart")}
                sx={{ ml: 1 }}
              >
                <ShoppingCart sx={{ color: "#FCC422", fontSize: 30 }} />
              </IconButton>
            </Box>
            {/* Hamburger Menu for smaller screens  */}
            <Box sx={{ display: { xs: "block", md: "none" }, ml: 2 }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon sx={{ color: "#FCC422", fontSize: 36 }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Full Screen Mobile Menu (slide from right) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 1300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(5px)",
            }}
          >
            <IconButton
              onClick={() => setIsDrawerOpen(false)}
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                color: "#fff",
              }}
            >
              <CloseIcon sx={{ fontSize: 36 }} />
            </IconButton>

            {menuItems.map((item) => (
              <Typography
                key={item.text}
                component={Link}
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
                sx={{
                  fontSize: "2rem",
                  color: "#FCC422",
                  fontWeight: "bold",
                  mb: 3,
                  textDecoration: "none",
                  "&:hover": { opacity: 0.6 },
                }}
              >
                {item.text}
              </Typography>
            ))}

            <Box sx={{ mt: 5 }}>
              <IconButton onClick={handleMyPageClick} sx={{ mx: 2 }}>
                <AccountCircle sx={{ color: "#FCC422", fontSize: 36 }} />
              </IconButton>
              <IconButton onClick={() => handleRoute("/cart")} sx={{ mx: 2 }}>
                <ShoppingCart sx={{ color: "#FCC422", fontSize: 36 }} />
              </IconButton>
              {roles && roles.includes("ROLE_ADMIN") && (
                <IconButton onClick={handleAdminPageClick} sx={{ mx: 2 }}>
                  <AdminPanelSettings sx={{ color: "#FCC422", fontSize: 36 }} />
                </IconButton>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HeaderNav;
