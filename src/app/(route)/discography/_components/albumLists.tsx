"use client";
// 앨범 리스트 렌더링 사용자 인터랙션 처리.
// 앨범 썸네일, 제목, 카테고리 정보 표시
// 페이지 네이션, 카테고리 필터링 예정 (검색은 미예정)
// 앨범 클릭시 상위 컴포넌트의 albumclick 함수 호출하기
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AlbumInfo } from "@/types/mockAlbumList";
import { Box, Container, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { API_BASED_URL } from "@/constants/apiUrl";

interface AlbumListsProps {
  albums: AlbumInfo[] | null;
  category: string;
  onAlbumClick: (id: number) => void;
}

function AlbumLists({ albums, category, onAlbumClick }: AlbumListsProps) {
  // 페이지네이션 선언 및 함수
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const filteredAlbums =
    albums && Array.isArray(albums)
      ? albums.filter((album) => {
          if (category === "All") return true;
          return album.tags === category;
        })
      : [];
  const pageCount = Math.ceil(filteredAlbums.length / itemsPerPage);
  const currentAlbums = filteredAlbums.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );
  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, pageCount - 1));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // 태그 변경할때마다 페이지 초기화
  useEffect(() => {
    setPage(0);
  }, [category]);

  // 마우스 hover시 효과
  const [hoveredAlbumId, setHoveredAlbumId] = useState<number | null>(null);
  const handleMouseEnter = (id: number) => {
    setHoveredAlbumId(id);
  };
  const handleMouseLeave = () => {
    setHoveredAlbumId(null);
  };

  if (!albums) return <Typography>데이터를 불러오는 중입니다.</Typography>;

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={handlePrevPage} disabled={page === 0}>
          <ArrowBackIosIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={page === pageCount - 1}>
          <ArrowForwardIosIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          mt: 2,
        }}
      >
        {currentAlbums.map((album) => (
          <Box
            key={album.id}
            onClick={() => onAlbumClick(album.id)}
            sx={{ width: "340px", mb: 10, mx: 2, cursor: "pointer" }}
            onMouseEnter={() => handleMouseEnter(album.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              sx={{
                width: "340px",
                height: "340px",
                position: "relative",
                backgroundColor: "#414141",
                zIndex: 1,
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "260px",
                  height: "260px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Image
                  src={`${API_BASED_URL}${album.albumImages[0]?.url}`}
                  alt={album.title}
                  fill
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  opacity: hoveredAlbumId === album.id ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 100,
                }}
              >
                <Typography variant="h6" component="div">
                  {album.title}
                </Typography>
                <Typography variant="body2" color="inherit">
                  {album.releaseDate}
                </Typography>
                <Typography variant="body2" color="inherit">
                  {album.tags}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default AlbumLists;
