// import useFetchProfileData from "./useFetchProfileData";
// import { getDramaList } from "@/api/profile";
// import { DramaList } from "@/types/iprofile";

// function useFetchDramas() {
//   return useFetchProfileData<DramaList[]>(getDramaList);
// }

// export default useFetchDramas;

// hooks/useProfileTabApi/useFetchDramas.ts
import { useDramaStore } from "@/store/profile/dramaStore";
import { useProfileTabData } from "./useProfileTabData";
import { getDramaList } from "@/api/profile";
import { DramaList } from "@/types/iprofile";

export default function useFetchDramas(minLoadingTime = 0) {
  const dramas = useDramaStore((state) => state.dramas);
  const setDramas = useDramaStore((state) => state.setDramas);
  return useProfileTabData<DramaList>({
    queryKey: ["profile", "dramas"],
    fetchFn: getDramaList,
    setZustand: setDramas,
    zustandData: dramas,
    minLoadingTime,
  });
}
