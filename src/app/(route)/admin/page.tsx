"use client";
import { getUserInfo } from "@/api/auth";
import React, { useState, useEffect } from "react";
import UserListTable from "./_component/userListTable";
import { CircularProgress } from "@mui/material";
import { User } from "@/types/iadmin";
import useAuthStore, { getUserRoles } from "@/store/authStore";
import { useRouter } from "next/navigation";

const AdminUserListPage: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { roles } = useAuthStore();
  const router = useRouter();

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
      const fetchUserList = async () => {
        try {
          const data = await getUserInfo();
          setUserList(data);
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
          setLoading(false);
        }
      };

      fetchUserList();
    }
  }, [authChecked]);

  if (!authChecked || loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <h1>전체 사용자 목록</h1>
      <UserListTable users={userList} />
    </div>
  );
};

export default AdminUserListPage;
