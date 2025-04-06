import { Container, Typography, IconButton, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(10),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  textAlign: "center",
}));

export const UploadButtonLabel = styled("label")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px dashed ${theme.palette.grey[500]}`,
  color: theme.palette.grey[700],
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const ErrorTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: "center",
}));
