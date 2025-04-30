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
        required
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <StyledTextField
        fullWidth
        label="오늘의 이야기"
        multiline
        rows={10}
        value={content}
        required
        onChange={(e) => onContentChange(e.target.value)}
      />
    </>
  );
}

export default DiaryTextFields;
