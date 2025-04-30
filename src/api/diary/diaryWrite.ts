import { Article } from "@/types/diaryMain";
import api from "@/utils/api";

export const writeDiary = async (
  title: string,
  content: string,
  imageFile: File | null
): Promise<Article> => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    // 1. 글 작성하기
    const response = await api.post("/article/write", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    // 현재 'success : 33' 이런 형식으로 data가 반환됨.
    const responseString = response.data as string;
    // 즉, 직접 정규식으로 숫자만 추출해야됨
    const match = responseString.match(/\d+/);
    const newDiaryId = match ? parseInt(match[0], 10) : null;
    if (!newDiaryId) {
      throw new Error("서버 응답에서 다이어리 ID를 파싱할 수 없습니다.");
    }

    await new Promise((res) => setTimeout(res, 1000));
    // 2. 새 글 상세 조회
    const detailResponse = await api.get(`/article/${newDiaryId}`);
    console.log(detailResponse);
    // 데이터 파싱 시 내부 키 매핑하기. key 매핑해서 주면 기존 코드와 충돌 없음
    const rawData = detailResponse.data;
    const transformedData: Article = {
      ...rawData,
      articleImageList: rawData.images, // 🔁 키 변환
    };
    return transformedData;
    // return detailResponse.data as Article;
  } catch (error) {
    console.error("작성 실패", error);
    throw error;
  }
};
