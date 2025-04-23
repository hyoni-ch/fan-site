"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { User } from "@/types/iadmin";
import RoleSelect from "../roleSelect";
import ManagerTable from "../managerTable";

interface UserListTableProps {
  users: User[];
  allRoles: string[];
  onSaveRoles: (nickname: string, roles: string[]) => Promise<void>;
  loading: boolean;
  error: Error | null;
  getRoleLabel: (role: string) => string;
}

const UserManager: React.FC<UserListTableProps> = ({
  users,
  allRoles,
  onSaveRoles,
  loading,
  error,
  getRoleLabel,
}) => {
  const [selectedRolesInternal, setSelectedRolesInternal] = useState<{
    [nickname: string]: string[];
  }>({});

  const handleRoleChangeInternal = useCallback(
    (nickname: string, newRolesWithoutPrefix: string[]) => {
      const newRolesWithPrefix = newRolesWithoutPrefix.map(
        (role) => `ROLE_${role}`
      );
      setSelectedRolesInternal((prev) => ({
        ...prev,
        [nickname]: newRolesWithPrefix,
      }));
    },
    []
  );

  const handleSaveRolesInternal = useCallback(
    async (nickname: string) => {
      const rolesToUpdate = selectedRolesInternal[nickname] || [];
      await onSaveRoles(nickname, rolesToUpdate);
      setSelectedRolesInternal((prev) => {
        const newState = { ...prev };
        delete newState[nickname];
        return newState;
      });
    },
    [selectedRolesInternal, onSaveRoles]
  );

  const columns = useMemo(() => {
    return [
      {
        label: "닉네임",
        render: (user: User) => user.nickname,
      },
      {
        label: "이메일",
        render: (user: User) => user.username,
      },
      {
        label: "현재 역할",
        render: (user: User) =>
          user.roles?.map(getRoleLabel).join(", ") || "없음",
      },
      {
        label: "역할 변경",
        render: (user: User) => {
          const currentRoles =
            selectedRolesInternal[user.nickname] || user.roles || [];
          const displayRoles = currentRoles.map(getRoleLabel);

          return (
            <RoleSelect
              nickname={user.nickname}
              allRoles={allRoles}
              selectedRoles={displayRoles}
              getRoleLabel={getRoleLabel}
              onChange={handleRoleChangeInternal}
              onSave={handleSaveRolesInternal}
            />
          );
        },
      },
    ];
  }, [
    allRoles,
    selectedRolesInternal,
    handleRoleChangeInternal,
    handleSaveRolesInternal,
    getRoleLabel,
  ]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        전체 사용자 목록
      </Typography>
      <ManagerTable<User>
        data={users}
        columns={columns}
        isLoading={loading}
        error={error?.message}
        getId={(user) => user.nickname}
        onEdit={undefined}
        onDelete={undefined}
      />
    </Box>
  );
};

export default UserManager;
