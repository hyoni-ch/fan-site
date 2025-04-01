"use client";
import { AlbumDetailInfo } from "@/types/mockAlbumList";
import { createYouTubeIframe, getYouTubeVideoId } from "@/utils/youtube";
import { Box, Container, IconButton, Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";
// 선택된 앨범의 상세 정보 렌더링
// 앨범 제목, 설명, 목록 , 유튜브 링크 등 표시
// selectedAlbum 상태를 통해 데이터 전달받기.

import React from "react";
import { API_BASED_URL } from "@/constants/apiUrl";

interface AlbumDetailProps {
  album: AlbumDetailInfo | null;
}

function AlbumDetail({ album }: AlbumDetailProps) {
  if (!album) {
    return <Typography>앨범을 선택해주세요.</Typography>;
  }

  const firstTrack = album.tracks[0];

  return (
    <Container sx={{ mt: 10 }}>
      <Box display={"flex"}>
        <Box>
          <Box //이미지 쪽 박스1
            sx={{
              width: "460px",
              height: "460px",
              position: "relative",
              borderRadius: "40px",
            }}
          >
            <Image
              src={`${API_BASED_URL}${album.albumImages[0]?.url}`}
              alt={album.title}
              fill
              objectFit="cover"
              style={{ borderRadius: 8 }}
            />
          </Box>
        </Box>
        {/* 텍스트 부분 박스2 */}
        <Box sx={{ ml: 10 }}>
          <Typography variant="h6">TITLE</Typography>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Typography variant="subtitle1">{album.title}, </Typography>
            <Typography variant="subtitle2">{album.description}</Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }}>
            INTRO
          </Typography>
          <Typography variant="subtitle2">{album.description}</Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            DATE
          </Typography>
          <Typography variant="subtitle2">{album.releaseDate}</Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            트랙 목록
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {album.tracks.map((track) => (
              <Box
                key={track.id}
                sx={{ display: "flex", mr: 3, alignItems: "center" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ wordBreak: "break-word" }}
                >
                  {track.title}
                </Typography>
                {track.youtubeUrl && (
                  <IconButton
                    href={track.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTubeIcon color="error" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box>
        <Box //유튜브 영상 박스3
          sx={{ display: "flex", justifyContent: "center", mt: 6 }}
        >
          <Typography variant="h6" sx={{ mb: 4 }}>
            Official Streaming
          </Typography>
        </Box>
        {album.tracks.map((track) => (
          <Box key={track.id}>
            {/* 첫 번째 트랙일 경우에만 유튜브 영상 렌더링 */}
            {track.id === firstTrack.id &&
              track.youtubeUrl &&
              getYouTubeVideoId(track.youtubeUrl) && (
                <Box
                  dangerouslySetInnerHTML={{
                    __html: createYouTubeIframe(
                      getYouTubeVideoId(track.youtubeUrl) as string
                    ),
                  }}
                />
              )}
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default AlbumDetail;
