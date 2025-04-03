// UserListTable.tsx
"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import RoleSelect from "./roleSelect";

interface User {
  nickname: string;
  username: string;
  roles: string[];
}

interface UserListTableProps {
  users: User[];
  onUpdateUserRoles?: (username: string, roles: string[]) => void;
}

const UserListTable: React.FC<UserListTableProps> = ({
  users,
  onUpdateUserRoles,
}) => {
  const data = useMemo(() => users, [users]);
  const [editedRoles, setEditedRoles] = useState<{
    [username: string]: string[];
  }>({});

  const handleRoleChange =
    (username: string) => (event: SelectChangeEvent<string[]>) => {
      const selectedRoles = event.target.value as string[];
      setEditedRoles((prev) => ({ ...prev, [username]: selectedRoles }));
    };

  const handleApplyChanges = (username: string) => () => {
    if (onUpdateUserRoles) {
      onUpdateUserRoles(username, editedRoles[username] || []);
    }
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "닉네임",
        accessorKey: "nickname",
        cell: ({ getValue }) => (
          <Typography variant="body2" fontWeight="bold">
            {getValue() as string}
          </Typography>
        ),
      },
      {
        header: "유저명",
        accessorKey: "username",
        cell: ({ getValue }) => (
          <Typography variant="body2" color="text.secondary">
            {getValue() as string}
          </Typography>
        ),
      },
      {
        header: "권한",
        accessorKey: "roles",
        cell: ({ row }) => {
          const username = row.original.username;
          const currentRoles =
            editedRoles[username] || row.original.roles || [];
          return (
            <RoleSelect
              username={username}
              currentRoles={currentRoles}
              handleRoleChange={handleRoleChange}
              handleApplyChanges={handleApplyChanges}
            />
          );
        },
      },
    ],
    [editedRoles]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 2 }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} hover>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} sx={{ textAlign: "center" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: "center", py: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  유저 데이터가 없습니다.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;
