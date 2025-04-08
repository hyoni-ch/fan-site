// components/auth/AuthHeader.tsx
import { Box, Button, Typography } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";

interface AuthHeaderProps {
  onBack: () => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ onBack }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      mb: 10,
    }}
  >
    <Button
      onClick={onBack}
      sx={{
        color: "gray",
        display: "inline-flex",
        alignItems: "center",
        padding: 0,
        backgroundColor: "transparent",
        "&:hover": {
          color: "black",
        },
      }}
    >
      <UndoIcon sx={{ mr: 1, fontSize: "1.5rem" }} />
    </Button>
    <Typography
      variant="h6"
      sx={{
        textAlign: "center",
        color: "black",
        fontSize: "0.75rem",
        userSelect: "none",
        mx: "auto",
        pr: 6,
      }}
    >
      WELCOME TO GLASSY 💎
    </Typography>
  </Box>
);

export default AuthHeader;
