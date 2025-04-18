import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

interface GoodsModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditMode: boolean;
  newGoods: {
    name: string;
    price: string;
    description: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  image: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GoodsModal: React.FC<GoodsModalProps> = ({
  open,
  onClose,
  onSubmit,
  isEditMode,
  newGoods,
  onInputChange,
  image,
  onImageChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>{isEditMode ? "굿즈 수정" : "굿즈 추가"}</DialogTitle>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
            >
              Upload an image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onImageChange}
              />
            </Button>
            {image && (
              <Typography variant="body2">
                선택된 사진: {image.name}
              </Typography>
            )}

            <TextField
              label="이름"
              name="name"
              fullWidth
              value={newGoods.name}
              onChange={onInputChange}
            />

            <TextField
              label="가격"
              name="price"
              fullWidth
              value={newGoods.price}
              onChange={onInputChange}
            />

            <TextField
              label="상세정보"
              name="description"
              fullWidth
              value={newGoods.description}
              onChange={onInputChange}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button type="submit" variant="contained">
            {isEditMode ? "수정하기" : "추가하기"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GoodsModal;
