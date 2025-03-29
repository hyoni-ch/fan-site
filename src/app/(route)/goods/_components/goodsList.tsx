"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import { API_BASED_URL } from "@/constants/apiUrl";
import Link from "next/link";
import Image from "next/image";

interface GoodsImage {
  id: number;
  url: string;
}

interface Goods {
  id: number;
  goodsName: string;
  price: number;
  goodsImages: GoodsImage[];
}

type GoodsList = Goods[];

function GoodsListPage() {
  const [goodsList, setGoodsList] = useState<GoodsList | null>(null);
  const [sort, setSort] = useState<"last" | "asc" | "desc">("last");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const size = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getGoodsList = () => {
    api
      .get(`/goods/list`, {
        params: {
          sort,
          name: searchTerm,
          page: currentPage,
          size,
        },
      })
      .then((response) => {
        setGoodsList(response.data.content);
        setTotalPages(response.data.totalPages);
      });
  };

  useEffect(() => {
    getGoodsList();
  }, [currentPage, sort, searchTerm, size]);

  const SearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(0);
    getGoodsList();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
              onSubmit={SearchHandler}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputProps={{ "aria-label": "search google maps" }}
                type="text"
                value={searchTerm}
                placeholder="원하는 굿즈를 검색하세요"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.currentTarget.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter")
                    SearchHandler(
                      e as unknown as React.FormEvent<HTMLFormElement>
                    );
                }}
              />
              <IconButton aria-label="search">
                <SearchIcon sx={{ color: "black" }} />
              </IconButton>
            </Paper>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonGroup
              variant="text"
              aria-label="sort button group"
              color="gray"
            >
              <Button
                onClick={() => {
                  setSort("last");
                }}
                sx={{
                  color: sort === "last" ? "black" : "gray",
                }}
                startIcon={sort === "last" ? <CheckIcon /> : null}
              >
                최신등록순
              </Button>
              <Button
                onClick={() => {
                  setSort("asc");
                }}
                sx={{
                  color: sort === "asc" ? "black" : "gray",
                }}
                startIcon={sort === "asc" ? <CheckIcon /> : null}
              >
                낮은가격순
              </Button>
              <Button
                onClick={() => {
                  setSort("desc");
                }}
                sx={{
                  color: sort === "desc" ? "black" : "gray",
                }}
                startIcon={sort === "desc" ? <CheckIcon /> : null}
              >
                높은가격순
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {goodsList?.map((goods, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {goods.goodsImages.length > 0 && (
              <Link href={`/goods/${goods.id}`}>
                <Box key={goods.goodsImages[0].id}>
                  <Image
                    src={API_BASED_URL + goods.goodsImages[0].url}
                    alt={`굿즈 ${goods.id}`}
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </Box>
              </Link>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>{goods.goodsName}</Box>
              <Box sx={{ color: "#757575" }}>
                ₩{goods.price.toLocaleString()}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </Button>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음
        </Button>
      </Box>
    </Box>
  );
}

export default GoodsListPage;
