import api from "@/utils/api";

export interface ArticleImage {
  id: number;
  url: string;
}

export interface FourArticle {
  id: number;
  title: string;
  articleImageList: ArticleImage[];
  createDate: string;
}

async function getLatestDiaryEntries(): Promise<FourArticle[]> {
  try {
    const response = await api.get<FourArticle[]>("/article/getfour");
    return response.data;
  } catch (error) {
    console.error("최신 일기 정보를 불러오는 데 실패했습니다:", error);
    return [];
  }
}

export default getLatestDiaryEntries;
