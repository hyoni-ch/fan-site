"use client";

import RetryErrorBox from "@/components/commonProfileTab/refetchButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import useFetchAlbums from "@/hooks/useProfileTabApi/useFetchAlbum";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const ITEMS_PER_PAGE = 6;

function AlbumTab() {
  const { data: albumsData, loading, error, refetch } = useFetchAlbums();
  // const { albumsData, loading, error } = useFetchAlbums();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  if (loading) {
    return <LoadingIndicator message="앨범 정보를 불러오는 중입니다..." />;
  }

  if (error) {
    return (
      <RetryErrorBox
        message="앨범 정보를 불러오는 중 오류가 발생했습니다"
        onRetry={refetch}
      />
    );
  }

  // null 체크 (초기 로딩 이후에도 data가 없을 수 있으니까)
  if (!albumsData) return null;
  const visibleAlbums = albumsData.slice(0, visibleCount);
  const hasMore = visibleCount < albumsData.length;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          maxWidth: "800px",
        }}
      >
        <AnimatePresence>
          {visibleAlbums.map((album) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                width: "calc(33.333% - 20px)",
                minWidth: "200px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
                borderRadius={2}
                bgcolor="#fafafa"
              >
                <Image
                  src={`/api${album.albumImages[0]?.url}`}
                  alt={album.title}
                  width={200}
                  height={200}
                  style={{ borderRadius: 8, objectFit: "cover" }}
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  mt={2}
                  textAlign="center"
                >
                  {album.title}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={400}
                  mt={1}
                  textAlign="center"
                >
                  {album.description}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#9c9c9c",
                    mt: 1,
                    textAlign: "center",
                  }}
                >
                  {album.releaseDate}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {hasMore && (
        <Button
          variant="outlined"
          onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
          sx={{ mt: 4, mb: 6, fontWeight: 600 }}
        >
          더 보기
        </Button>
      )}
    </Box>
  );
}

export default AlbumTab;

{
  /* <Box sx={{ marginTop: "80px", display: "flex", justifyContent: "center" }}>
  <iframe
    style={{ borderRadius: "12px" }}
    src="https://open.spotify.com/embed/playlist/3f9oODTECIUKiQweioS0mS?utm_source=generator&theme=0"
    width="300"
    height="380"
    allowFullScreen
    allow="encrypted-media"
    loading="lazy"
  />
</Box>; */
}
