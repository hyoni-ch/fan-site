import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <IconButton
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="body2" sx={{ alignSelf: "center" }}>
        {currentPage + 1} / {totalPages}
      </Typography>
      <IconButton
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
