"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TextField, Button, Typography, Box } from "@mui/material";
import useFetchArticle from "@/hooks/useFetchArticle";
import { updateDiary } from "@/api/diary/diaryDelUpdate";
import Image from "next/image";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";

const DiaryEditPage = () => {
  const { id } = useParams();
  const articleId = Number(id);
  const article = useFetchArticle(articleId);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
    }
  }, [article]);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     setImageFile(e.target.files[0]);
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      await updateDiary(articleId, { title, content, imageFile });
      router.push(`/diary/${articleId}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("수정 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!article) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        다이어리 수정하기
      </Typography>
      <TextField
        fullWidth
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="내용"
        multiline
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
      />
      <Box sx={{ mt: 2 }}>
        {article.images && article.images.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography>기존 이미지</Typography>
            {article.images && article.images.length > 0 && (
              <Image
                src={`${S3_IMAGE_BASE_URL}${article.images[0].url}`}
                alt="Current Image"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            )}
          </Box>
        )}
        {/* 이미지 부분 */}
        <Typography>수정할 이미지</Typography>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width={100}
            height={100}
            style={{ objectFit: "contain", marginTop: "1rem" }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: 16 }}
        />
        {/* {imageFile && <Typography>{imageFile.name}</Typography>} */}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleUpdate} disabled={loading}>
          수정 완료
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => router.push(`/diary/${articleId}`)}
        >
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default DiaryEditPage;
