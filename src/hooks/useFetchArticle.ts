// hooks/useFetchArticle.ts
import { useState, useEffect } from "react";
import { fetchArticle } from "@/api/diaryDetail";

interface Article {
  id: number;
  author: string;
  title: string;
  content: string;
  createDate: string;
  modifyDate: string;
  images: { id: number; url: string }[];
  likes: number;
  liked: boolean;
}

const useFetchArticle = (articleId: number) => {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const fetchedArticle = await fetchArticle(articleId);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    loadArticle();
  }, [articleId]);

  return article;
};

export default useFetchArticle;
