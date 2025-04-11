import useFetchConcerts from "@/hooks/useProfileTabApi/useFetchConcerts";
import { Box, Divider, Typography } from "@mui/material";
import groupConcertsByYear from "@/utils/groupConcertsByYear";
import ConcertItem from "@/components/commonProfileTab/ConcertItem";
import LoadingIndicator from "@/components/LoadingIndicator";
import RetryErrorBox from "@/components/commonProfileTab/refetchButton";

function ConcertTab() {
  const { data: concertsData, loading, error, refetch } = useFetchConcerts();

  if (loading) {
    return <LoadingIndicator message="콘서트 정보를 불러오는 중입니다..." />;
  }

  if (error) {
    return (
      <RetryErrorBox
        message="콘서트 정보를 불러오는 중 오류가 발생했습니다"
        onRetry={refetch}
      />
    );
  }

  if (!concertsData) return null;

  // 년도별로 정리 유틸 함수로 분리
  const groupedConcerts = groupConcertsByYear(concertsData);
  /* 객체를 배열로 변환 --> [[연도, 콘서트 배열]형태의 튜플] */
  // 연도(문자열)를 숫자로 바꿔서 최신순 정렬
  //! 즉, a=['2023',[...]] , b=['2024',[...]] 더 좋은 정렬 방법 있는지 생각해보기
  const concertYears = Object.entries(groupedConcerts).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      {concertYears.map(([year, concerts], index) => (
        <Box key={year} width="100%" maxWidth="600px" mb={4}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            {year}
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {concerts.map((concert) => (
              <ConcertItem
                key={concert.id}
                concertName={concert.concertName}
                concertDate={concert.concertDate}
                place={concert.place}
              />
            ))}
          </Box>
          {index < concertYears.length - 1 && (
            <Divider sx={{ mt: 3, borderColor: "rgba(0,0,0,0.1)" }} />
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ConcertTab;
