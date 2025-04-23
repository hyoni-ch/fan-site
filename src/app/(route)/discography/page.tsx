"use client";
// 앨범 리스트 및 디테일 관리
// 앨범 리스트, 선택된 앨범, 페이지네이션 상태 관리
// 앨범 리스트 및 상세 정보 api 호출
// 하위 컴포넌트에 각각에 필요한 데이터 전달.

import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AlbumLists from "./_components/albumLists";
import { AlbumDetailInfo, AlbumInfo } from "@/types/idiscography";
import AlbumDetail from "./_components/albumDetail";
import { getAlbumDetail, getAlbumList } from "@/api/discography";

const categories = ["All", "Regular", "Single", "Mini", "OST", "Others"];

function Discography() {
  const [albums, setAlbums] = useState<AlbumInfo[] | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("All");
  const [tabValue, setTabValue] = useState<number>(0);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumDetailInfo | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // ref 생성 --> DOM 노드에 접근
  const albumDetailRef = useRef<HTMLDivElement>(null);

  // 앨범 리스트 GET 요청!
  useEffect(() => {
    async function fetchData() {
      // setLoading(true);
      try {
        const albumListData = await getAlbumList({ page: 0, size: 999 }); // 초기 페이지 데이터 가져오기
        setAlbums(albumListData);

        //* 초기 로딩 || 카테고리 변경 후 첫 번째 앨범 선택
        if (albumListData && albumListData.length > 0) {
          setSelectedAlbumId(albumListData[0].id);
        } else {
          setSelectedAlbumId(null);
          setSelectedAlbum(null);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("데이터를 불러오는 중 오류가 발생했습니다.")
        );
        setAlbums(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setCategory(categories[newValue]);
  };

  const handleAlbumClick = (id: number) => {
    console.log(`Album ${id} clicked`);
    setSelectedAlbumId(id);
    // 상세 정보 렌더링 후 스크롤 실행
    setTimeout(() => {
      if (albumDetailRef.current) {
        albumDetailRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // 앨범 디테일 GET 요청!
  useEffect(() => {
    async function fetchAlbumDetail() {
      if (selectedAlbumId) {
        try {
          const detailData = await getAlbumDetail(selectedAlbumId);
          setSelectedAlbum(detailData);
        } catch (err) {
          setError(
            err instanceof Error
              ? err
              : new Error("앨범 상세 정보를 불러오는 중 오류가 발생했습니다.")
          );
          setSelectedAlbum(null);
        }
      } else {
        setSelectedAlbum(null);
      }
    }

    fetchAlbumDetail();
  }, [selectedAlbumId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error.message}</Typography>;
  if (!albums) return <Typography>데이터를 불러오는 중입니다.</Typography>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <Box>
        <Typography variant="h3" fontWeight={500}>
          DISCOGRAPHY
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        ref={albumDetailRef}
      >
        {selectedAlbum && <AlbumDetail album={selectedAlbum} />}
        {!selectedAlbum && <Typography>앨범을 선택해주세요. </Typography>}
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="album category tabs"
        sx={{
          mt: 6,
          "& .MuiTabs-indicator": {
            backgroundColor: "#FCC422",
          },
          "& .MuiTab-root": {
            color: "gray",
            "&.Mui-selected": {
              color: "#FCC422",
              fontWeight: "bold",
            },
          },
        }}
      >
        {categories.map((categorie, index) => (
          <Tab key={index} label={categorie} />
        ))}
      </Tabs>
      <AlbumLists
        albums={albums}
        category={category}
        onAlbumClick={handleAlbumClick}
      />
    </Box>
  );
}

export default Discography;
