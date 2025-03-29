// hooks/useLikeHandler.ts
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import useLikeStore from "@/store/diaryLikeStore";
import { likeArticle } from "@/api/diaryDetail";

interface LikeHandlerProps {
  articleId: number;
  initialLiked: boolean;
  initialLikes: number;
}

const useLikeHandler = ({
  articleId,
  initialLiked,
  initialLikes,
}: LikeHandlerProps) => {
  const { accessToken } = useAuthStore((state) => state);
  const addLikedArticle = useLikeStore((state) => state.addLikedArticle);
  const removeLikedArticle = useLikeStore((state) => state.removeLikedArticle);

  const [likes, setLikes] = useState<number>(0); // 초기값 설정
  const [liked, setLiked] = useState<boolean>(initialLiked);

  useEffect(() => {
    // 초기 좋아요 상태 및 좋아요 수 설정
    setLikes(initialLikes);
    setLiked(initialLiked);
  }, [initialLikes, initialLiked]);

  const handleLikeClick = async () => {
    if (!accessToken) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      return;
    }

    try {
      const updatedLikes = await likeArticle(articleId);

      setLiked((prevLiked) => !prevLiked);
      setLikes(updatedLikes);

      if (liked) {
        removeLikedArticle(articleId);
      } else {
        addLikedArticle(articleId);
      }
    } catch (error) {
      console.error("좋아요 실패:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  return { likes, liked, handleLikeClick };
};

export default useLikeHandler;
