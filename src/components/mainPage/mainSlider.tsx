"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slideStyles.css";
import Slider from "react-slick";
import Image from "next/image";
import { getAlbumList } from "@/api/discography";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Link from "next/link";

interface AlbumImage {
  id: number;
  url: string;
}

interface Album {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  albumImages: AlbumImage[];
}

type AlbumList = Album[];

function MainSlider() {
  const [albumList, setAlbumList] = useState<AlbumList | null>(null);

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
            (a: Album, b: Album) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime()
          )
          .slice(0, 7);

        setAlbumList(sorted);
      } catch (err) {
        alert("앨범 리스트를 불러오는데 실패했습니다.");
        console.error(err);
      }
    };
    fetchAlbum();
  }, []);

  return (
    <Box className="slider-container">
      {albumList ? (
        <Slider {...settings}>
          {albumList?.map((album) => (
            <Box key={album.id} className="slide-items">
              {album.albumImages.length > 0 && (
                <Link href="/discography">
                  <Box className="slide-image-wrapper">
                    <Image
                      src={`/api${album.albumImages[0].url}`}
                      alt={`앨범 ${album.id}`}
                      fill
                      sizes="(max-width: 768px) 80vw, 300px"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Box className="slide-album-info">
                    <Box>{album.title}</Box>
                    <Box>{album.releaseDate}</Box>
                  </Box>
                </Link>
              )}
            </Box>
          ))}
        </Slider>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
        </Box>
      )}
    </Box>
  );
}

export default MainSlider;
