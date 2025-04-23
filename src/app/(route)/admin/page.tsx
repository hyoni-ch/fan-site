"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { User } from "@/types/iadmin";
import { getUserInfo, postAddRole } from "@/api/admin";
import useAuthStore, { getUserRoles } from "@/store/authStore";
import UserManager from "./_component/manager/user";
import GoodsManager from "./_component/manager/goods";
import DiscographyManager from "./_component/manager/discography";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AlbumIcon from "@mui/icons-material/Album";

const AdminPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("userMenu");
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [allRoles, setAllRoles] = useState<string[]>([]);
  const { roles } = useAuthStore();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:900px)");

  const getRoleLabel = useCallback((role: string) => {
    return role.replace(/^ROLE_/, "");
  }, []);

  const menuItems = [
    { label: "대시보드", value: "dashboard", icon: <DashboardIcon /> },
    { label: "전체 사용자 목록", value: "userMenu", icon: <PeopleIcon /> },
    { label: "굿즈 관리", value: "goodsMenu", icon: <LocalMallIcon /> },
    { label: "앨범 관리", value: "discographyMenu", icon: <AlbumIcon /> },
  ];

  useEffect(() => {
    const checkAdminRole = () => {
      const storedRoles = getUserRoles() || roles;
      if (!storedRoles || !storedRoles.includes("ROLE_ADMIN")) {
        router.push("/");
        return;
      }
      setAuthChecked(true);
    };
    checkAdminRole();
  }, [roles, router]);

  useEffect(() => {
    if (authChecked) {
      const fetchAdminData = async () => {
        setLoading(true);
        setError(null);
        try {
          const usersData = await getUserInfo();
          setUserList(usersData);
          setAllRoles(["ROLE_USER", "ROLE_ADMIN", "ROLE_ARTIST"]);
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
          setLoading(false);
        }
      };
      fetchAdminData();
    }
  }, [authChecked]);

  const handleSaveRoles = useCallback(
    async (nickname: string, rolesToUpdate: string[]) => {
      try {
        await postAddRole(nickname, rolesToUpdate);
        const data = await getUserInfo();
        setUserList(data);
      } catch (error) {
        console.error(`역할 업데이트 실패: ${nickname}`, error);
      }
    },
    [setUserList]
  );

  const menuComponents: Record<string, React.ReactNode> = {
    dashboard: <Box p={3}>대시보드 준비 중...</Box>,
    userMenu: (
      <Box p={3}>
        <UserManager
          users={userList}
          allRoles={allRoles}
          onSaveRoles={handleSaveRoles}
          loading={loading}
          error={error}
          getRoleLabel={getRoleLabel}
        />
      </Box>
    ),
    goodsMenu: (
      <Box p={3}>
        <GoodsManager />
      </Box>
    ),
    discographyMenu: (
      <Box p={3}>
        <DiscographyManager />
      </Box>
    ),
  };

  if (!authChecked) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {isMobile && (
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              관리자 페이지
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {isMobile ? (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box sx={{ width: 250, p: 2 }}>
              {menuItems.map((item, idx) => (
                <Button
                  key={idx}
                  fullWidth
                  onClick={() => {
                    setActiveMenu(item.value);
                    setDrawerOpen(false);
                  }}
                  startIcon={item.icon}
                  sx={{
                    justifyContent: "flex-start",
                    p: 2,
                    fontWeight: "bold",
                    backgroundColor:
                      activeMenu === item.value ? "#FCC422" : "transparent",
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Drawer>
        ) : (
          <Box
            sx={{
              width: 280,
              p: 3,
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #e0e0e0",
              boxShadow: 1,
              gap: 2,
              flexShrink: 0,
            }}
          >
            {menuItems.map((item, idx) => (
              <Button
                key={idx}
                variant="text"
                onClick={() => setActiveMenu(item.value)}
                startIcon={item.icon}
                sx={{
                  p: 2,
                  textAlign: "left",
                  fontWeight: "bold",
                  justifyContent: "flex-start",
                  backgroundColor:
                    activeMenu === item.value ? "#FCC422" : "transparent",
                  color: activeMenu === item.value ? "#000" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      activeMenu === item.value ? "#FCC422" : "#f5f5f5",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* 콘텐츠 영역 */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {menuComponents[activeMenu] || <Box p={3}>메뉴를 선택해주세요</Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPage;
