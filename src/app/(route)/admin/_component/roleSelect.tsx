// RoleSelect.tsx
import React from "react";
import {
  Box,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
  Button,
} from "@mui/material";

interface RoleSelectProps {
  username: string;
  currentRoles: string[];
  handleRoleChange: (
    username: string
  ) => (event: SelectChangeEvent<string[]>) => void;
  handleApplyChanges: (username: string) => () => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  username,
  currentRoles,
  handleRoleChange,
  handleApplyChanges,
}) => {
  return (
    <Box display="flex" gap={1} alignItems="center" justifyContent="center">
      <Select
        multiple
        value={currentRoles}
        onChange={handleRoleChange(username)}
        renderValue={(selected) => (
          <Box display="flex" gap={1}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value.replace("ROLE_", "")}
                size="small"
              />
            ))}
          </Box>
        )}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="ROLE_ADMIN">ADMIN</MenuItem>
        <MenuItem value="ROLE_USER">USER</MenuItem>
        <MenuItem value="ROLE_ARTIST">ARTIST</MenuItem>
      </Select>
      <Button
        variant="contained"
        size="small"
        onClick={handleApplyChanges(username)}
      >
        적용
      </Button>
    </Box>
  );
};

export default RoleSelect;
