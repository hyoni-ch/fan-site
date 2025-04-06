import { Button, styled } from "@mui/material";

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2, 4),
  fontSize: "1rem",
}));

function DiarySubmitButton({ loading }: { loading: boolean }) {
  return (
    <SubmitButton
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      fullWidth
    >
      {loading ? "작성 중..." : "작성 완료"}
    </SubmitButton>
  );
}

export default DiarySubmitButton;
