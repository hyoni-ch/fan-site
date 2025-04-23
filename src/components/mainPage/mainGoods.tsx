"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "@/store/cartStore";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  CircularProgress,
  Skeleton,
  IconButton,
  Button,
} from "@mui/material";
import Image from "next/image";
import { getGoodsList } from "@/api/goods";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingCart, Search } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Goods, GoodsList } from "@/types/igoods";
import { S3_IMAGE_BASE_URL } from "@/constants/s3Image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = () => ({
  hidden: {
    opacity: 0,
    y: 50, // 아래에서 위로 올라오는 효과로 변경 (또는 x: index % 2 === 0 ? -100 : 100 유지)
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

function MainGoods() {
  const [goodsList, setGoodsList] = useState<GoodsList | null>(null);
  const [recentGoods, setRecentGoods] = useState<GoodsList>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  const addItemToCart = useCartStore((state) => state.addItemToCart);

  // --- Intersection Observer 설정 ---
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // 10% 보일 때 트리거 (조절 가능)
  });

  useEffect(() => {
    const fetchGoods = async () => {
      setLoading(true); // 데이터 요청 시작 시 로딩 true
      try {
        const params = {
          sort: "last",
          name: "",
          page: 0,
          size: 10, // 필요한 만큼 가져오되,
        };
        const goods = await getGoodsList(params);
        setGoodsList(goods.content);
      } catch (err) {
        console.error(err);
        // 에러 발생 시에도 로딩 상태는 해제
        setLoading(false);
      }
      // try 블록이 성공적으로 끝나면 여기서 로딩 해제
      // finally를 사용하면 성공/실패 무관하게 항상 실행됨
      // finally { setLoading(false); } // 또는 이렇게
    };
    fetchGoods();
  }, []);

  useEffect(() => {
    if (goodsList) {
      const recent = goodsList.slice(0, 4); // 메인에는 3개만 표시
      setRecentGoods(recent);
      setLoading(false); // 데이터 처리 완료 후 로딩 false
    }
    // goodsList가 null에서 빈 배열([])로 바로 올 경우 대비
    else if (goodsList === null && !loading) {
      // fetchGoods에서 이미 에러처리가 되었거나, 초기 상태면 loading이 true일 것
      // 만약 fetch 후 goodsList가 여전히 null이면 여기서도 로딩 해제
      setLoading(false);
    }
  }, [goodsList, loading]);

  const handleAddToCart = (goods: Goods) => {
    const imageUrl =
      goods.goodsImages.length > 0 ? `/api${goods.goodsImages[0].url}` : "";

    const cartItem = {
      id: goods.id,
      goodsName: goods.goodsName,
      price: goods.price,
      quantity: 1,
      imageUrl: imageUrl,
    };

    addItemToCart(cartItem);
    alert("장바구니에 추가 되었습니다.");
  };

  // --- 로딩 중 표시 ---
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!loading && recentGoods.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          최근 상품이 없습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 200 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          sx={{
            width: "80%",
            m: "0 auto",
            p: 10,
            borderRadius: "1rem",
            background: "linear-gradient(135deg, #FDFBF6 0%, #F2E7E6 100%)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
            }}
          >
            NEW GOODS
          </Typography>

          <Box
            ref={ref}
            sx={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                href="/goods"
                sx={{
                  borderRadius: 20,
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
                endIcon={<ArrowForwardIosIcon />}
              >
                더보기
              </Button>
            </Box>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ width: "100%" }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                justifyContent="center"
                alignItems="stretch"
              >
                {" "}
                {recentGoods.map((goods, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    key={goods.id}
                    sx={{ display: "flex", mt: 2 }}
                  >
                    {" "}
                    <motion.div
                      variants={itemVariants()}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Card
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          "&:hover .hover-overlay": {
                            opacity: 1,
                          },
                          transition:
                            "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        }}
                      >
                        <CardMedia
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: "200px", sm: "230px", md: "400px" },
                            aspectRatio: "3 / 4",
                          }}
                        >
                          {goods.goodsImages.length > 0 ? (
                            <Image
                              // src={`/api${goods.goodsImages[0].url}`}
                              src={`${S3_IMAGE_BASE_URL}${goods.goodsImages[0].url}`}
                              alt={`굿즈 ${goods.goodsName}`}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
                              priority={index < 3}
                            />
                          ) : (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              sx={{
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                              }}
                            />
                          )}

                          <Box
                            className="hover-overlay"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              bgcolor: "rgba(0,0,0,0.6)",
                              opacity: 0,
                              color: "#fff",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              px: 2,
                              transition: "opacity 0.3s ease-in-out",
                            }}
                          >
                            <Typography variant="h6" textAlign="center" noWrap>
                              {goods.goodsName}
                            </Typography>
                            <Typography
                              variant="body2"
                              textAlign="center"
                              fontWeight="bold"
                            >
                              ₩{goods.price.toLocaleString()}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                                mt: 1,
                              }}
                            >
                              <IconButton
                                onClick={() => handleAddToCart(goods)}
                                aria-label="장바구니에 추가"
                                sx={{ color: "#fff", border: 1 }}
                              >
                                <ShoppingCart />
                              </IconButton>
                              <IconButton
                                href={`/goods/${goods.id}`} // Link 컴포넌트 대신 IconButton에 href 사용
                                aria-label="상품 상세 보기"
                                sx={{
                                  color: "#fff",
                                  border: 1,
                                }}
                              >
                                <Search />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardMedia>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default MainGoods;
