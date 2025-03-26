// app/login/_components/RegisterForm.tsx

import React from "react";
import { TextField, Button } from "@mui/material";

interface RegisterFormProps {
  credentials: { username: string; password: string; nickname: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
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
        sx={textFieldStyles}
      />
      <TextField
        label="닉네임"
        type="text"
        name="nickname"
        value={credentials.nickname}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ ...textFieldStyles, mb: 14 }}
      />
      <Button type="submit" variant="contained" sx={buttonStyles}>
        회원가입
      </Button>
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

export default RegisterForm;
