import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  createGoods,
  deleteGoods,
  getGoodsList,
  updateGoods,
} from "@/api/goods";
import { Goods, GoodsList } from "@/types/igoods";
import GoodsModal from "./goodsModal";

const GoodsManager = () => {
  const [goods, setGoods] = useState<GoodsList | null>(null);
  const [newGoods, setNewGoods] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingGoods, setEditingGoods] = useState<Goods | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const splitByLength = (text: string, length: number) => {
    const result = [];
    for (let i = 0; i < text.length; i += length) {
      result.push(text.slice(i, i + length));
    }
    return result;
  };

  const handleToggleDescription = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setEditingGoods(null);
    setNewGoods({
      name: "",
      price: "",
      description: "",
    });
    setImage(null);
    setOpenModal(true);
  };

  const handleOpenEditModal = (goods: Goods) => {
    setIsEditMode(true);
    setEditingGoods(goods);
    setNewGoods({
      name: goods.goodsName,
      price: goods.price.toString(),
      description: goods.description,
    });
    setImage(null);
    setOpenModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const fetchGoodsList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchGoods = await getGoodsList({
        sort: "last",
        name: "",
        page: currentPage,
        size: 9,
      });
      setGoods(fetchGoods.content);
      setTotalPages(fetchGoods.totalPages);
    } catch (error) {
      console.error("굿즈 리스트를 불러오지 못했습니다.", error);
      setError("굿즈 리스트를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm("정말로 이 굿즈를 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        await deleteGoods(id);
        alert("삭제되었습니다.");
        fetchGoodsList();
      } catch (error) {
        alert("삭제에 실패했습니다.");
        console.error(error);
      }
    } else {
      alert("삭제가 취소되었습니다.");
    }
  };

  useEffect(() => {
    fetchGoodsList();
  }, [currentPage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGoods((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newGoods.name || !newGoods.price || !newGoods.description) {
      alert("모두 채워주세요!");
      return;
    }

    const priceAsNumber = parseInt(newGoods.price, 10);

    if (isNaN(priceAsNumber)) {
      alert("가격은 숫자로 입력해야 합니다.");
      return;
    }

    try {
      if (isEditMode && editingGoods) {
        // 수정 API 호출
        await updateGoods(
          editingGoods.id,
          newGoods.name,
          priceAsNumber,
          newGoods.description,
          image || null
        );
        alert("굿즈가 수정되었습니다!");
      } else {
        // 추가 API 호출
        await createGoods(
          newGoods.name,
          priceAsNumber,
          newGoods.description,
          image!
        );
        alert("굿즈가 추가되었습니다!");
      }
      setOpenModal(false);
      fetchGoodsList();
    } catch (error) {
      console.error(error);
      alert(isEditMode ? "굿즈 수정 실패" : "굿즈 업로드 실패");
    }
  };

  return (
    <Box>
      {/* Product List */}
      <Box flex={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: " center",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            굿즈 관리
          </Typography>
          <Button variant="outlined" onClick={handleOpenAddModal}>
            굿즈 추가
          </Button>
        </Box>
        <Box sx={{ minHeight: 650 }}>
          <Paper elevation={1} sx={{ overflow: "hidden", borderRadius: 2 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
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
                  margin: "0 auto",
                }}
              >
                {error}
              </Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>가격</TableCell>
                    <TableCell>상세정보</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {goods?.map((g, i) => (
                    <TableRow key={i}>
                      <TableCell>{g.goodsName}</TableCell>
                      <TableCell>₩{g.price.toLocaleString()}</TableCell>
                      <TableCell>
                        {g.description.length > 20 ? (
                          expandedRow === g.id ? (
                            <>
                              {splitByLength(g.description, 20).map(
                                (line, idx) => (
                                  <Typography
                                    key={idx}
                                    sx={{ fontSize: "14px" }}
                                  >
                                    {line}
                                  </Typography>
                                )
                              )}
                              <Button
                                onClick={() => handleToggleDescription(g.id)}
                                size="small"
                                sx={{
                                  p: 0,
                                  minWidth: "auto",
                                  fontSize: "0.8rem",
                                }}
                              >
                                접기
                              </Button>
                            </>
                          ) : (
                            <>
                              <Typography
                                component="span"
                                sx={{ fontSize: "14px" }}
                              >
                                {g.description.slice(0, 20)}
                                <Typography
                                  component="span"
                                  sx={{
                                    color: "gray",
                                    cursor: "pointer",
                                    fontSize: "0.8rem",
                                  }}
                                  onClick={() => handleToggleDescription(g.id)}
                                >
                                  ...더보기
                                </Typography>
                              </Typography>
                            </>
                          )
                        ) : (
                          g.description
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          sx={{ color: "blue" }}
                          onClick={() => handleOpenEditModal(g)}
                        >
                          수정
                        </Button>
                        <Button
                          size="small"
                          sx={{ color: "red" }}
                          onClick={() => handleDelete(g.id)}
                        >
                          삭제
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Box>
      </Box>

      {/* 굿즈 추가 모달 */}
      <GoodsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmit}
        isEditMode={isEditMode}
        newGoods={newGoods}
        onInputChange={handleInputChange}
        image={image}
        onImageChange={handleImageChange}
      />

      {/* 페이지네이션 */}
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
};

export default GoodsManager;
