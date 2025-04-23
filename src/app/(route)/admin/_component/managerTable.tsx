import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

type Column<T> = {
  label: string;
  render: (item: T) => React.ReactNode;
};

type ManagerTableProps<T> = {
  data: T[] | null;
  columns: Column<T>[];
  isLoading?: boolean;
  error?: string | Error | null;
  onEdit?: (item: T) => void; // 수정: onEdit는 선택적으로 받음
  onDelete?: (id: string | number) => void | Promise<void>; // 수정: onDelete는 선택적으로 받음
  getId: (item: T) => number | string;
  extraActions?: (item: T) => React.ReactNode;
};

const ManagerTable = <T,>({
  data,
  columns,
  isLoading,
  error,
  onEdit,
  onDelete,
  getId,
  extraActions,
}: ManagerTableProps<T>) => {
  return (
    <Paper elevation={1} sx={{ overflow: "hidden", borderRadius: 2 }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography
          sx={{
            color: "#d32f2f",
            fontWeight: "bold",
            backgroundColor: "#ffe5e5",
            borderRadius: "8px",
            padding: "12px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          {typeof error === "string" ? error : error?.message}
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx}>{col.label}</TableCell>
              ))}
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={getId(item)}>
                {columns.map((col, idx) => (
                  <TableCell key={idx}>{col.render(item)}</TableCell>
                ))}
                <TableCell align="right">
                  {extraActions?.(item)}
                  {/* onEdit과 onDelete가 존재할 때만 버튼을 렌더링 */}
                  {onEdit && (
                    <Button
                      size="small"
                      sx={{ color: "blue", marginLeft: 1 }}
                      onClick={() => onEdit(item)}
                    >
                      수정
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="small"
                      sx={{ color: "red", marginLeft: 1 }}
                      onClick={() => onDelete(getId(item))}
                    >
                      삭제
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default ManagerTable;
