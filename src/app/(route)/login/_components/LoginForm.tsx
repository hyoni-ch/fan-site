// app/login/_components/LoginForm.tsx

import React from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Link,
} from "@mui/material";

interface LoginFormProps {
  credentials: { username: string; password: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  credentials,
  handleInputChange,
  handleAuthSubmit,
}) => {
  return (
    <form onSubmit={handleAuthSubmit}>
      <TextField
        label="이메일"
        type="email"
        name="username"
        value={credentials.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
        sx={textFieldStyles}
      />
      <TextField
        label="비밀번호"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
        sx={textFieldStyles}
      />
      <Box display="flex" justifyContent="space-between">
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="자동 로그인"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "0.875rem",
            },
          }}
        />
        <Link
          href="/"
          sx={{
            color: "gray",
            textDecoration: "none",
            fontSize: "0.875rem",
            "&:hover": {
              color: "black",
            },
            mt: 1,
          }}
        >
          비밀번호 찾기
        </Link>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 8 }}
      >
        <Button type="submit" variant="contained" sx={buttonStyles}>
          로그인
        </Button>
      </Box>
    </form>
  );
};

const textFieldStyles = {
  mb: 4,
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0px 1000px white inset",
    WebkitTextFillColor: "black",
    backgroundColor: "white",
    transition: "background-color 5000s ease-in-out 0s",
  },
};

const buttonStyles = {
  backgroundColor: "#FCC422",
  "&:hover": {
    backgroundColor: "#F2A800",
  },
  width: "100%",
  padding: "0.75rem",
};

export default LoginForm;
