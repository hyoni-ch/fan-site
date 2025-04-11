import { useState, useEffect } from "react";
import { getDramaList } from "@/api/profile";
import { DramaList } from "@/types/iprofile";

function useFetchDramas() {
  const [dramasData, setDramasData] = useState<DramaList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const dramaList = await getDramaList();
        setDramasData(dramaList);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("Unknown error occurred"));
        }
        setLoading(false);
      }
    };

    fetchDramas();
  }, []);

  return { dramasData, loading, error };
}

export default useFetchDramas;
