// import useFetchProfileData from "./useFetchProfileData";
// import { getConcertList } from "@/api/profile";
// import { ConcertList } from "@/types/iprofile";

// function useFetchConcerts() {
//   return useFetchProfileData<ConcertList[]>(getConcertList);
// }

// export default useFetchConcerts;

//TODO 1차 리팩
// // hooks/useProfileTabApi/useFetchConcerts.ts
// import { useConcertStore } from "@/store/profile/concertStore";
// import { useProfileTabQuery } from "./useProfileTabQuery";
// import { getConcertList } from "@/api/profile";

// export default function useFetchConcerts(minLoadingTime = 0) {
//   // const { concerts, setConcerts } = useConcertStore();
//   // ✅ 상태와 setter만 선택적으로 가져옴
//   const concerts = useConcertStore((state) => state.concerts);
//   const setConcerts = useConcertStore((state) => state.setConcerts);
//   return useProfileTabQuery(
//     "concerts",
//     getConcertList,
//     setConcerts,
//     concerts,
//     minLoadingTime
//   );
// }

//TODO 2차 리팩
// hooks/useProfileTabApi/useFetchConcerts.ts
import { useConcertStore } from "@/store/profile/concertStore";
import { useProfileTabData } from "./useProfileTabData";
import { ConcertList } from "@/types/iprofile";
import { getConcertList } from "@/api/profile";

export default function useFetchConcerts(minLoadingTime = 0) {
  const concerts = useConcertStore((state) => state.concerts);
  const setConcerts = useConcertStore((state) => state.setConcerts);
  // const { concerts, setConcerts } = useConcertStore();
  return useProfileTabData<ConcertList>({
    queryKey: ["profile", "concerts"],
    fetchFn: getConcertList,
    setZustand: setConcerts,
    zustandData: concerts,
    minLoadingTime,
  });
}
