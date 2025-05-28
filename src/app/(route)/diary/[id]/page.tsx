"use client";

import { deleteDiary } from "@/api/diary/diaryDelUpdate";
import {
  deleteComment,
  fetchChildCommentList,
  fetchCommentList,
  insertChildComment,
  insertComment,
} from "@/api/diary/diaryDetail";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";
import useFetchArticle from "@/hooks/useFetchArticle";
import useLikeHandler from "@/hooks/useLikeHandler";
import useAuthStore from "@/store/authStore";
import {
  boxStyle,
  commentBoxStyle,
  commentItemStyle,
  commentTextStyle,
  contentStyle,
  imageBoxStyle,
  imageOverlayStyle,
  subtitleStyle,
  titleStyle,
} from "@/styles/diaryDetailStyles";
import { Favorite } from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CommentType = {
  id: number;
  author: string;
  content: string;
  createDate: string;
  children: number;
};

type ReplyType = {
  id: number;
  author: string;
  content: string;
  createDate: string;
  parentId: number;
};
const DiaryDetail = () => {
  const { id } = useParams();
  const articleId = Number(id);
  const article = useFetchArticle(articleId);
  const roles = useAuthStore((state) => state.roles);

  const { likes, liked, handleLikeClick } = useLikeHandler({
    articleId,
    initialLiked: article?.liked || false,
    initialLikes: article?.likes || 0,
  });

  //! 유저 인증
  const username = useAuthStore((state) => state.username);
  const accessToken = useAuthStore((state) => state.accessToken);
  const userNickname = useAuthStore((state) => state.userNickname);
  //! 댓글
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  //! 대댓글 관련 정의
  const [replies, setReplies] = useState<{ [commentId: number]: ReplyType[] }>(
    {}
  );
  const [replyVisible, setReplyVisible] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [replyTexts, setReplyTexts] = useState<{ [key: number]: string }>({});

  const [showReplies, setShowReplies] = useState<{
    [parentId: number]: boolean;
  }>({});

  const router = useRouter();
  //! 댓글 리스트 가져오기
  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await fetchCommentList(articleId);
        console.log("comments", data);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [articleId]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const redirectToLogin = () => {
    router.push("/login");
  };
  //! 댓글 작성 함수
  const handleCommentSubmit = async () => {
    if (!accessToken) {
      redirectToLogin();
      return;
    }
    if (!comment.trim()) return;
    setLoading(true); // 로딩 시작
    try {
      await insertComment(articleId, comment);
      const updatedComments = await fetchCommentList(articleId);
      setComments(updatedComments);
      setComment("");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  //! 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    if (!accessToken) {
      redirectToLogin();
      return;
    }
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };
  //! 대댓글 열기
  const handleReplyClick = (commentId: number) => {
    setReplyVisible((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };
  //! 대댓글 작성
  const handleReplyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    commentId: number
  ) => {
    const updateReplyTexts = {
      ...replyTexts,
      [commentId]: event.target.value,
    };
    setReplyTexts(updateReplyTexts);
  };
  //! 대댓글 제출
  const handleReplySubmit = async (commentId: number) => {
    const replyText = replyTexts[commentId];

    if (!replyText || !replyText.trim()) return;
    setLoading(true); // 로딩 시작

    try {
      await insertChildComment(commentId, replyText);
      const updatedReplies = await fetchChildCommentList(commentId); // 서버에서 최신 대댓글 목록 가져오기

      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: updatedReplies,
      }));

      setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
      if (comments.find((comment) => comment.id === commentId)) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, children: (comment.children || 0) + 1 }
              : comment
          )
        );
      }
      setReplyVisible((prevVisible) => ({
        ...prevVisible,
        [commentId]: false,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };
  //! 대댓글 토글 보이기
  const toggleShowReplies = async (parentId: number) => {
    setShowReplies((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
    if (!showReplies[parentId]) {
      try {
        const childCXomments = await fetchChildCommentList(parentId);
        setReplies((prevReplies) => {
          const updatedReplies = {
            ...prevReplies,
            [parentId]: childCXomments,
          };
          console.log(`${parentId}:`, updatedReplies);
          setReplies(updatedReplies);
          return updatedReplies;
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  //! 대댓글 삭제
  const handleDeleteReplyComment = async (
    replyId: number,
    parentId: number
  ) => {
    try {
      await deleteComment(replyId);
      setReplies((prevReplies) => ({
        ...prevReplies,
        [parentId]: prevReplies[parentId].filter(
          (reply) => reply.id !== replyId
        ),
      }));
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? { ...comment, children: comment.children - 1 }
            : comment
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //! 다이어리 삭제 하기
  const handleDeleteDiary = async () => {
    try {
      await deleteDiary(articleId);
      router.push("/diary"); // 삭제 후 리스트로 이동
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  if (!article) return <Typography>Loading...</Typography>;

  return (
    <Box sx={boxStyle}>
      <Box sx={imageBoxStyle}>
        <Image
          src={
            article.images?.[0].url
              ? `${S3_IMAGE_BASE_URL}${article.images[0].url}`
              : "/images/diary1.png"
          }
          alt="Diary Detail Image"
          layout="fill"
          style={{ objectFit: "cover" }}
        />
        <Box sx={imageOverlayStyle}>
          <Typography variant="h5" sx={titleStyle}>
            {article.title}
          </Typography>
          <Typography variant="subtitle1" sx={subtitleStyle}>
            by{article.author}|{article.createDate}
          </Typography>
          {roles?.includes("ROLE_ARTIST") && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={() => router.push(`/diary/${articleId}/edit`)}
              >
                수정하기
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{
                  backgroundColor: "error.main",
                  color: "white",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
                onClick={handleDeleteDiary}
              >
                삭제하기
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <CardContent sx={contentStyle}>
        <Typography variant="body1">{article.content}</Typography>
      </CardContent>
      <Box sx={{ textAlign: "center", padding: "16px", mb: 6 }}>
        <IconButton onClick={handleLikeClick}>
          <Favorite
            sx={{
              fontSize: "2rem",
              color: liked ? "#FCC422" : "#bebebe",
            }}
          />
        </IconButton>
        <Typography variant="body2">{likes} likes</Typography>
      </Box>
      <Box sx={commentBoxStyle}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Box key={`${comment.id}-${index}`} sx={commentItemStyle}>
              <Typography variant="body1" sx={commentTextStyle}>
                {comment.author}
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "gray",
                    marginLeft: ".5rem",
                  }}
                >
                  {comment.createDate}
                </span>
              </Typography>
              <Typography variant="body2">{comment.content}</Typography>
              <Button
                variant="text"
                sx={{
                  position: "absolute",
                  right: "8px",
                  top: "30px",
                  fontSize: "0.75rem",
                  padding: "4px",
                }}
                onClick={() => handleReplyClick(comment.id)}
              >
                답글
              </Button>
              {userNickname === comment.author && (
                <Button
                  variant="text"
                  sx={{
                    position: "absolute",
                    right: "48px",
                    top: "30px",
                    fontSize: "0.75rem",
                    padding: "4px",
                    color: "red",
                  }}
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  삭제
                </Button>
              )}
              {replyVisible[comment.id] && (
                <Box sx={{ paddingTop: "16px", paddingLeft: "16px" }}>
                  <TextField
                    fullWidth
                    label="답글을 남겨주세요"
                    variant="outlined"
                    value={replyTexts[comment.id] || ""}
                    onChange={(e) => handleReplyChange(e, comment.id)}
                    sx={{ marginBottom: "8px" }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      position: "absolute",
                      right: "26px",
                      top: "86px",
                      fontSize: "0.75rem",
                      padding: "6px 12px",
                      backgroundColor: "#FCC422",
                      "&:hover": {
                        backgroundColor: "#F2A800",
                      },
                    }}
                    onClick={() => handleReplySubmit(comment.id)}
                  >
                    답글 남기기
                  </Button>
                  {loading && <Typography>댓글 제출중...</Typography>}
                </Box>
              )}
              {comment.children > 0 && !showReplies[comment.id] && (
                <Button
                  variant="text"
                  sx={{
                    fontSize: "0.75rem",
                    paddingLeft: "0",
                    textTransform: "none",
                    color: "#555",
                  }}
                  onClick={() => toggleShowReplies(comment.id)}
                >
                  [{comment.children}개] 답글 더보기
                </Button>
              )}
              {showReplies[comment.id] &&
                replies[comment.id]?.map((reply, index) => (
                  <Box
                    key={`${reply.id}-${index}`}
                    sx={{ marginBottom: "0.5rem" }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {reply.author}
                    </Typography>
                    <Typography variant="body2">{reply.content}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.8rem", color: "gray" }}
                    >
                      {reply.createDate}
                    </Typography>
                    {userNickname === reply.author && (
                      <Button
                        variant="text"
                        sx={{
                          position: "absolute",
                          right: "8px",
                          top: "80px",
                          fontSize: "0.75rem",
                          padding: "4px",
                        }}
                        onClick={() =>
                          handleDeleteReplyComment(reply.id, comment.id)
                        }
                      >
                        삭제
                      </Button>
                    )}
                  </Box>
                ))}
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            아직 댓글이 없습니다.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          padding: "16px",
          borderTop: "1px solid #ddd",
          borderBottom: "10px solid #ddd",
          marginTop: "4rem",
        }}
      >
        {accessToken && username ? (
          <>
            <TextField
              fullWidth
              label="댓글을 입력하세요"
              variant="outlined"
              value={comment}
              onChange={handleCommentChange}
              sx={{
                marginBottom: "16px",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
              sx={{
                backgroundColor: "#FCC422",
                "&:hover": {
                  backgroundCOlor: "#F2A800",
                  color: "#000000",
                },
                width: "100%",
                padding: "0.75rem",
                marginTop: "1rem",
              }}
            >
              댓글 달기
            </Button>
            {loading && <Typography>댓글 작성 중...</Typography>}
            {/* 로딩 메시지 */}
          </>
        ) : (
          <>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="right"
              mb={1}
            >
              댓글을 달려면 로그인이 필요합니다.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={redirectToLogin}
            >
              로그인 페이지로 이동
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DiaryDetail;
