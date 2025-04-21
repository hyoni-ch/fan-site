"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slideStyles.css";
import Slider from "react-slick";
import Image from "next/image";
import { getAlbumList } from "@/api/discography";
import { useState, useEffect } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { AlbumInfo } from "@/types/idiscography";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";

type AlbumList = AlbumInfo[];

function MainSlider() {
  const [albumList, setAlbumList] = useState<AlbumList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 5,
    speed: 500,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "100px",
        },
      },
    ],
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const album = await getAlbumList();

        const sorted = album
          .sort(
            (a: AlbumInfo, b: AlbumInfo) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime()
          )
          .slice(0, 7);

        setAlbumList(sorted);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("앨범 정보를 불러오지 못했습니다.");
        setIsLoading(false);
      }
    };
    fetchAlbum();
  }, []);

  return (
    <Box className="slider-container">
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            color: "#d32f2f",
            fontWeight: "bold",
            backgroundColor: "#ffe5e5",
            borderRadius: "8px",
            padding: "12px 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <Typography>{error}</Typography>
        </Box>
      ) : albumList ? (
        <Slider {...settings}>
          {albumList.map((album) => (
            <Box key={album.id} className="slide-items">
              {album.albumImages.length > 0 && (
                <Box>
                  <Box className="slide-image-wrapper">
                    <Image
                      // src={`/api${album.albumImages[0].url}`}
                      src={`${S3_IMAGE_BASE_URL}${album.albumImages[0].url}`}
                      alt={`앨범 ${album.id}`}
                      fill
                      sizes="(max-width: 768px) 80vw, 300px"
                      style={{ objectFit: "cover" }}
                    />
                    <Box className="slide-overlay">
                      <IconButton
                        href={`/discography`}
                        aria-label="앨범 상세 보기"
                        sx={{
                          color: "#fff",
                          border: 1,
                        }}
                      >
                        <Search />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box className="slide-album-info">
                    <Box>{album.title}</Box>
                    <Box>{album.releaseDate}</Box>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Slider>
      ) : null}
    </Box>
  );
}

export default MainSlider;
