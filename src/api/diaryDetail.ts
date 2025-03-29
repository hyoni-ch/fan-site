import api from "@/utils/api";
// 다이어리 디테일 전체 내용 get
export const fetchArticle = async (articleId: number) => {
  try {
    const response = await api.get(`/article/${articleId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 불러오기 실패:", error);
    throw error;
  }
};
// 좋아요 누르기
export const likeArticle = async (articleId: number) => {
  try {
    const response = await api.post(`/article/${articleId}/likeit`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("좋아요 실패:", error);
    throw error;
  }
};
// 댓글 작성
export const insertComment = async (articleId: number, content: string) => {
  try {
    const response = await api.post(`/article/${articleId}/insertComment`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("댓글 추가 실패:", error);
    throw error;
  }
};
// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  try {
    const response = await api.post(`/article/deleteComment`, {
      id: commentId,
    });
    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw error;
  }
};
// 댓글 리스트 가져오기
export const fetchCommentList = async (articleId: number) => {
  try {
    const response = await api.get(`/article/${articleId}/commentList`);
    return response.data;
  } catch (error) {
    console.error("댓글 리스트 가져오기 실패:", error);
    throw error;
  }
};
// 대댓글 리스트 가져오기
export const fetchChildCommentList = async (parentId: number) => {
  try {
    const response = await api.get(`/article/getChild`, {
      params: {
        id: parentId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("대댓글 리스트 가져오기 실패:", error);
    throw error;
  }
};

// 대댓글 작성
export const insertChildComment = async (parentId: number, content: string) => {
  try {
    const response = await api.post(`/article/insertChildren`, {
      id: parentId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("대댓글 작성 실패:", error);
    throw error;
  }
};
