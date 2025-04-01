"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slideStyles.css";
import Slider from "react-slick";
import Image from "next/image";
import { getAlbumList } from "@/api/discography";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { API_BASED_URL } from "@/constants/apiUrl";

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
    centerPadding: "100px",
    slidesToShow: 3,
    speed: 500,
    // focusOnSelect: true, centerMonde와 충돌
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const album = await getAlbumList();
        setAlbumList(album);
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
              {album.albumImages.map((image) => (
                <Box key={image.id}>
                  <Box className="slide-image-wrapper">
                    <Image
                      src={API_BASED_URL + image.url}
                      alt={`앨범 ${album.id}`}
                      width={300}
                      height={300}
                    />
                  </Box>

                  <Box className="slide-album-info">
                    <Box>{album.title}</Box>
                    <Box sx={{ color: "#757575" }}>{album.releaseDate}</Box>
                  </Box>
                </Box>
              ))}
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
