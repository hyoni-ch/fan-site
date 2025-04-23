// components/common/RetryErrorBox.tsx
import { Button, Box } from "@mui/material";
import ErrorIndicator from "@/components/ErrorIndicator";

interface Props {
  message: string;
  onRetry: () => void;
}

const RetryErrorBox = ({ message, onRetry }: Props) => (
  <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
    <ErrorIndicator message={message} />
    <Button onClick={onRetry} sx={{ mt: 2 }} variant="outlined">
      다시 시도
    </Button>
  </Box>
);

export default RetryErrorBox;
