"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { User } from "@/types/iadmin";
import { getUserInfo, postAddRole } from "@/api/admin";
import useAuthStore from "@/store/authStore";
import UserListTable from "./_component/userListTable";
import GoodsManager from "./_component/goodsManager";
import { Box, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { getUserRoles } from "@/utils/authUtils";

const AdminUserListPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("userMenu");
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // 관리자 권한 상태
  const [authChecked, setAuthChecked] = useState(false);
  // 전역 상태에서 역할 정보 가져오기
  const { roles } = useAuthStore();
  const router = useRouter();
  const [allRoles, setAllRoles] = useState<string[]>([]);

  const getRoleLabel = useCallback((role: string) => {
    return role.replace(/^ROLE_/, "");
  }, []);

  const menuItems = [
    { label: "대시보드", value: "dashboard", icon: <DashboardIcon /> },
    { label: "전체 사용자 목록", value: "userMenu", icon: <PeopleIcon /> },
    { label: "굿즈 관리", value: "goodsMenu", icon: <LocalMallIcon /> },
    // 필요 시 더 추가 가능
  ];

  useEffect(() => {
    const checkAdminRole = () => {
      // 로컬 스토리지에서 역할 정보를 가져오거나, Zustand 스토어의 현재 역할 정보를 사용
      const storedRoles = getUserRoles() || roles;
      // 관리자 역할이 없으면 메인 페이지로 리다이렉트
      if (!storedRoles || !storedRoles.includes("ROLE_ADMIN")) {
        router.push("/");
        return;
      }
      // 관리자 역할이 확인되면 authChecked 상태를 true로 설정
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
          //! 모든 가능한 역할 목록 설정--> 이 부분 수정 사항에 포함해야할듯.
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

  // 사용자 역할 변경 후 저장 버튼 클릭 시 호출되는 비동기 콜백 함수
  const handleSaveRoles = useCallback(
    async (nickname: string, rolesToUpdate: string[]) => {
      try {
        // 서버에 변경된 역할 정보 전송
        await postAddRole(nickname, rolesToUpdate);
        console.log(`역할이 성공적으로 업데이트되었습니다: ${nickname}`);
        // 역할 업데이트 후 최신 사용자 정보 다시 가져오기
        const data = await getUserInfo();
        setUserList(data);
      } catch (error) {
        console.error(`역할 업데이트 실패: ${nickname}`, error);
      }
    },
    [setUserList]
  );

  if (!authChecked) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: 800,
        maxWidth: 1200,
        display: "flex",
        margin: "30px auto",
        borderRadius: "25px",
        boxShadow: 1,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 280,
          p: 3,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #e0e0e0",
          boxShadow: 1,
          gap: 2,
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

      <Box sx={{ flex: 1 }}>
        {activeMenu === "userMenu" ? (
          <Box
            sx={{
              padding: 3,
            }}
          >
            <UserListTable
              users={userList} // 사용자 목록
              allRoles={allRoles} // 모든 역할 목록
              onSaveRoles={handleSaveRoles} // 역할 저장 함수
              loading={loading}
              error={error}
              getRoleLabel={getRoleLabel} // 역할 레이블 변환
            />
          </Box>
        ) : activeMenu === "goodsMenu" ? (
          <Box
            sx={{
              padding: 3,
            }}
          >
            <GoodsManager />
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminUserListPage;
