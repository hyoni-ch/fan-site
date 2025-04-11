// import { useState, useEffect } from "react";
// import { getConcertList } from "@/api/profile";
// import { ConcertList } from "@/types/iprofile";

// function useFetchConcerts() {
//   const [concertsData, setConcertsData] = useState<ConcertList[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchConcerts = async () => {
//       try {
//         const concertList = await getConcertList();
//         setConcertsData(concertList);
//         setLoading(false);
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error);
//         } else {
//           setError(new Error("Unknown error occurred"));
//         }
//         setLoading(false);
//       }
//     };

//     fetchConcerts();
//   }, []);

//   return { concertsData, loading, error };
// }

// export default useFetchConcerts;

import useFetchData from "./useFetchData";
import { getConcertList } from "@/api/profile";
import { ConcertList } from "@/types/iprofile";

function useFetchConcerts() {
  return useFetchData<ConcertList[]>(getConcertList);
}

export default useFetchConcerts;
