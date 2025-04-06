// components/diary/DiaryTextFields.tsx
import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

interface TextProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

function DiaryTextFields({
  title,
  content,
  onTitleChange,
  onContentChange,
}: TextProps) {
  return (
    <>
      <StyledTextField
        fullWidth
        label="제목을 입력해주세요"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
      />
      <StyledTextField
        fullWidth
        label="오늘의 이야기를 적어보세요..."
        multiline
        rows={12}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        required
      />
    </>
  );
}

export default DiaryTextFields;
