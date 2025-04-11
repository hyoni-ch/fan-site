import { Typography } from "@mui/material";

interface AwardItemProps {
  text: string;
}

function AwardItem({ text }: AwardItemProps) {
  const [title, subtitle] = text.split(" - ");

  return (
    <li style={{ marginBottom: "10px" }}>
      <Typography variant="body2" fontWeight={600}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.75rem" }}
        >
          {subtitle}
        </Typography>
      )}
    </li>
  );
}

export default AwardItem;
