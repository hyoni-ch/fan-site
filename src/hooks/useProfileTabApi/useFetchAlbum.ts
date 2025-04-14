// import { useState, useEffect } from "react";
// import { getAlbumList } from "@/api/discography";
// import { Album } from "@/types/iprofile";

// function useFetchAlbums() {
//   const [albumsData, setAlbumsData] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const albumList = await getAlbumList();
//         setAlbumsData(albumList);
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

//     fetchAlbums();
//   }, []);

//   return { albumsData, loading, error };
// }

// export default useFetchAlbums;

import useFetchProfileData from "./useFetchProfileData";
import { getAlbumList } from "@/api/discography";
import { Album } from "@/types/iprofile";

function useFetchAlbums(minLoadingTime: number = 0) {
  return useFetchProfileData<Album[]>(getAlbumList, minLoadingTime);
}

export default useFetchAlbums;
