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

interface Field {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "date" | "select";
  value: string;
  options?: { label: string; value: string }[]; // select 전용 옵션
}

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  isEditMode?: boolean;
  title?: string;
  fields?: Field[];
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  image?: File | null;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  onSubmit,
  isEditMode = false,
  title,
  fields,
  onInputChange,
  image,
  onImageChange,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>{title || (isEditMode ? "수정" : "추가")}</DialogTitle>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {/* 이미지 업로드 */}
            {onImageChange && (
              <>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                >
                  이미지 업로드
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </Button>
                {image && (
                  <Typography variant="body2">
                    선택된 이미지: {image.name}
                  </Typography>
                )}
              </>
            )}

            {/* fields 기반 폼 렌더링 */}
            {fields &&
              fields.map((field) => {
                if (field.type === "select" && field.options) {
                  return (
                    <TextField
                      key={field.name}
                      select
                      label={field.label}
                      name={field.name}
                      fullWidth
                      value={field.value}
                      onChange={onInputChange}
                      SelectProps={{ native: true }}
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="">선택하세요</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  );
                }

                return (
                  <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    fullWidth
                    multiline={field.type === "textarea"}
                    type={
                      field.type === "number"
                        ? "number"
                        : field.type === "date"
                        ? "date"
                        : "text"
                    }
                    value={field.value}
                    onChange={onInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                );
              })}

            {/* children 내용이 있으면 함께 출력 */}
            {children}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          {onSubmit && (
            <Button type="submit" variant="contained">
              {isEditMode ? "수정하기" : "추가하기"}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormModal;
