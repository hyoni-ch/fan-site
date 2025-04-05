// 역할 변경 UI (Select, Checkbox, Save 버튼 등)을 재사용 가능한 컴포넌트로 모듈화
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

interface RoleSelectProps {
  nickname: string;
  allRoles: string[];
  selectedRoles: string[];
  getRoleLabel: (role: string) => string;
  onChange: (nickname: string, selected: string[]) => void;
  onSave: (nickname: string) => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  nickname,
  allRoles,
  selectedRoles, //부모 compo에서 관리되는 상태 받아 초기, 현재 값들을 설정.
  getRoleLabel,
  onChange,
  onSave,
}) => {
  // Select 박스에 현재 선택된 값을 렌더링하는 부분
  const renderValue = (selected: string[]) => {
    if (selected.length === 0)
      return <em style={{ color: "grey" }}>역할 선택</em>;
    // 선택된 역할이 3개 이상이라면 앞의 2개의 역할과 ...으로 요약 렌더링
    if (selected.length > 2)
      return `${selected.slice(0, 2).map(getRoleLabel).join(", ")}, ...`;
    return selected.map(getRoleLabel).join(", ");
  };

  return (
    <Box display="flex" alignItems="center">
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id={`select-label-${nickname}`}>역할 선택</InputLabel>
        <Select
          labelId={`select-label-${nickname}`}
          id={`select-${nickname}`}
          multiple
          value={selectedRoles}
          onChange={(e) => onChange(nickname, e.target.value as string[])}
          renderValue={renderValue}
          MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
        >
          {allRoles.map((role) => {
            const label = getRoleLabel(role);
            return (
              <MenuItem key={role} value={label}>
                <Checkbox checked={selectedRoles.includes(label)} />
                <ListItemText primary={label} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button onClick={() => onSave(nickname)} size="small" sx={{ ml: 1 }}>
        저장
      </Button>
    </Box>
  );
};

export default RoleSelect;
