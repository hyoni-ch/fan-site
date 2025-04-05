// components/UserListTable.tsx
"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { styled } from "@mui/material/styles";

import { User } from "@/types/iadmin";
import RoleSelect from "./roleSelect";

// 테이블 셀 간격 조정을 위한 스타일
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1, 3),
}));

interface UserListTableProps {
  users: User[];
  allRoles: string[];
  onSaveRoles: (nickname: string, roles: string[]) => Promise<void>;
  loading: boolean;
  error: Error | null;
  getRoleLabel: (role: string) => string;
}

const UserListTable: React.FC<UserListTableProps> = ({
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

  // 역할 드롭다운 값 변경 시 호출 콜백함수.
  const handleRoleChangeInternal = useCallback(
    (nickname: string, newRolesWithoutPrefix: string[]) => {
      // 접두사에 ROLE_ 붙여서 저장.
      const newRolesWithPrefix = newRolesWithoutPrefix.map(
        (role) => `ROLE_${role}`
      );
      // 임시 선택 역할 상태 업데이트
      setSelectedRolesInternal((prev) => ({
        ...prev,
        [nickname]: newRolesWithPrefix,
      }));
    },
    [setSelectedRolesInternal]
  );

  // 저장 버튼 클릭 시 호출 콜백 함수
  const handleSaveRolesInternal = useCallback(
    async (nickname: string) => {
      // 임시 선택 역할 상태에 있는 사용자의 역할 목록 업데인트
      const rolesToUpdate = selectedRolesInternal[nickname] || [];
      // 저장 완료 시 선택 역할 상태에서 해당 사용자 정보 제거
      await onSaveRoles(nickname, rolesToUpdate);
      setSelectedRolesInternal((prev) => {
        const newState = { ...prev };
        delete newState[nickname];
        return newState;
      });
    },
    [selectedRolesInternal, onSaveRoles]
  );

  // tanstack table 컬럼 정의
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "닉네임", // 테이블 헤더 텍스트
        accessorKey: "nickname",
      },
      {
        header: "이메일",
        accessorKey: "username",
      },
      {
        header: "현재 역할",
        // user 객체에서 roles배열 가져온 후 UI 레이블로 변환 하고 쉼표로 연결하기.
        accessorFn: (row) => row.roles?.map(getRoleLabel).join(", ") || "없음",
        id: "currentRoles",
      },
      {
        header: "역할 변경",
        id: "editRoles",
        // 각 셀 내용 렌더링 부분.
        cell: ({ row }) => {
          const nickname = row.original.nickname;
          // 현재 유저가 임시 선택한 역할 목록 or 현재 역할 목록
          const currentUserSelectedRolesWithPrefix =
            selectedRolesInternal[nickname] || row.original.roles || [];
          // ROLE_ 제거하고 UI에 표시할 역할 목록 생성.
          const currentUserSelectedRolesWithoutPrefix =
            currentUserSelectedRolesWithPrefix.map((role) =>
              getRoleLabel(role)
            );

          return (
            // 역할 선택 UI 컴포넌트.
            <RoleSelect
              nickname={nickname}
              allRoles={allRoles}
              selectedRoles={currentUserSelectedRolesWithoutPrefix}
              getRoleLabel={getRoleLabel}
              onChange={handleRoleChangeInternal}
              onSave={handleSaveRolesInternal}
            />
          );
        },
      },
    ],
    [
      allRoles,
      selectedRolesInternal,
      handleRoleChangeInternal,
      handleSaveRolesInternal,
      getRoleLabel,
    ]
  );

  // Table 인스턴스 생성
  const table = useReactTable({
    data: users, // 테이블 데이터 (부모 컴포에서 props로 전달)
    columns, // 테이블 컬럼 정의
    getCoreRowModel: getCoreRowModel(), // 기본 행 모델 생성 함수
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="user list table">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <StyledTableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <StyledTableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;
