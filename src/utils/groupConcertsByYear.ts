import { ConcertList } from "@/types/iprofile";

// 정의해둔 콘서트 인터페이스를 연도별 그룹화된 객체로 한번 더 정의
interface GroupedConcerts {
  [year: string]: ConcertList[];
}

function groupConcertsByYear(concerts: ConcertList[]): GroupedConcerts {
  // 콘서트 배열을 하나의 객체로 변환
  // acc는 누적되는 결과값 (초기값은 {}), concert는 배열의 각 요소
  return concerts.reduce((acc, concert) => {
    // '년도' 숫자 추출 후 문자열로 변환 (객체의 key)
    const year = new Date(concert.concertDate).getFullYear().toString();
    // acc객체에 year 키가 없으면 빈 배열 생성
    if (!acc[year]) acc[year] = [];
    // 해당 연도 배열에 콘서트 추가
    acc[year].push(concert);
    return acc;
  }, {} as GroupedConcerts);
}

export default groupConcertsByYear;
