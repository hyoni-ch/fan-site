"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slideStyles.css";
import Slider from "react-slick";
import api from "@/utils/api";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

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
    api.get("/album/list").then((response) => {
      setAlbumList(response.data);
    });
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
                    <img
                      src={`http://61.99.26.112:3001${image.url}`}
                      alt={`앨범 ${album.id}`}
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
