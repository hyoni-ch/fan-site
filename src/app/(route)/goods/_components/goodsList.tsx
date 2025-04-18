import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import Image from "next/image";
import { getGoodsList } from "@/api/goods";
import useAuthStore from "@/store/authStore";
import { GoodsList } from "@/types/igoods";

function GoodsListPage() {
  const [goodsList, setGoodsList] = useState<GoodsList | null>(null);
  const [sort, setSort] = useState<"last" | "asc" | "desc">("last");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sortData = [
    { label: "최신등록순", value: "last" },
    { label: "낮은가격순", value: "asc" },
    { label: "높은가격순", value: "desc" },
  ];
  const roles = useAuthStore((state) => state.roles);

  const fetchGoodsList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchGoods = await getGoodsList({
        sort,
        name: searchTerm,
        page: currentPage,
        size: 8,
      });
      setGoodsList(fetchGoods.content);
      setTotalPages(fetchGoods.totalPages);
    } catch (error) {
      console.error("굿즈 리스트를 불러오지 못했습니다.", error);
      setError("굿즈 리스트를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoodsList();
  }, [currentPage, sort, searchTerm]);

  const SearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchGoodsList();
  };

  return (
    <Box sx={{ pl: 4, pr: 4, pb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {roles && roles.includes("ROLE_ARTIST") ? (
            <Link href="/goods/create">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FCC422",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  p: "8px 16px",
                  ":hover": {
                    backgroundColor: "#f8b602",
                  },
                }}
              >
                굿즈 추가
              </Button>
            </Link>
          ) : (
            <Box></Box>
          )}

          <Paper
            component="form"
            sx={{
              p: "8px 16px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 500,
              borderRadius: "25px",
              boxShadow: 1,
            }}
            onSubmit={SearchHandler}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: "16px",
                color: "#333",
              }}
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
            <IconButton aria-label="search" sx={{ p: 1 }}>
              <SearchIcon sx={{ color: "black" }} />
            </IconButton>
          </Paper>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup variant="text" aria-label="sort button group">
            {sortData.map((button) => (
              <Button
                key={button.value}
                onClick={() => setSort(button.value as "last" | "asc" | "desc")}
                sx={{
                  borderColor: sort === button.value ? "black" : "transparent",
                  color: sort === button.value ? "black" : "gray",
                }}
                startIcon={sort === button.value ? <CheckIcon /> : null}
              >
                {button.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Typography
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
            }}
          >
            {error}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {goodsList?.map((goods) => (
            <Grid item xs={12} sm={6} md={3} key={goods.id}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  boxShadow: 2,
                  overflow: "hidden",
                  textAlign: "center",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 4,
                  },
                }}
              >
                {goods.goodsImages.length > 0 && (
                  <Link href={`/goods/${goods.id}`}>
                    <Box
                      key={goods.goodsImages[0].id}
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 300,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={`/api${goods.goodsImages[0].url}`}
                        alt={`굿즈 ${goods.id}`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </Link>
                )}
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    {goods.goodsName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#757575", fontSize: "16px" }}
                  >
                    ₩{goods.price.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <IconButton
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="body2" sx={{ alignSelf: "center" }}>
          {currentPage + 1} / {totalPages}
        </Typography>
        <IconButton
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default GoodsListPage;
