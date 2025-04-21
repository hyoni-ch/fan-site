import { Typography } from "@mui/material";

interface ConcertItemProps {
  concertName: string;
  concertDate: string;
  place: string;
}

function ConcertItem({ concertName, concertDate, place }: ConcertItemProps) {
  return (
    <li style={{ marginBottom: "10px" }}>
      <Typography variant="body2" fontWeight={600}>
        {concertName}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "0.75rem" }}
      >
        {concertDate} | {place}
      </Typography>
    </li>
  );
}

export default ConcertItem;
