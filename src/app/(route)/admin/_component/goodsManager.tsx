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
  TextField,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  createGoods,
  deleteGoods,
  getGoodsList,
  updateGoods,
} from "@/api/goods";

interface GoodsImage {
  id: number;
  url: string;
}

interface Goods {
  id: number;
  goodsName: string;
  description: string;
  price: number;
  goodsImages: GoodsImage[];
}

type GoodsList = Goods[];

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

    try {
      if (isEditMode && editingGoods) {
        // 수정 API 호출
        await updateGoods(
          editingGoods.id,
          newGoods.name,
          newGoods.price,
          newGoods.description,
          image || null
        );
        alert("굿즈가 수정되었습니다!");
      } else {
        // 추가 API 호출
        await createGoods(
          newGoods.name,
          newGoods.price,
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

        <Paper>
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
                          {splitByLength(g.description, 20).map((line, idx) => (
                            <Typography key={idx} sx={{ fontSize: "14px" }}>
                              {line}
                            </Typography>
                          ))}
                          <Button
                            onClick={() => handleToggleDescription(g.id)}
                            size="small"
                            sx={{ p: 0, minWidth: "auto", fontSize: "0.8rem" }}
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
        </Paper>
      </Box>

      {/* Add Product Form */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={onSubmit}>
          <DialogTitle>{isEditMode ? "굿즈 수정" : "굿즈 추가"}</DialogTitle>

          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
              >
                Upload an image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {image && (
                <Typography variant="body2">
                  선택된 사진: {image.name}
                </Typography>
              )}

              <TextField
                label="이름"
                name="name"
                fullWidth
                value={newGoods.name}
                onChange={handleInputChange}
              />

              <TextField
                label="가격"
                name="price"
                fullWidth
                value={newGoods.price}
                onChange={handleInputChange}
              />

              <TextField
                label="상세정보"
                name="description"
                fullWidth
                value={newGoods.description}
                onChange={handleInputChange}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>취소</Button>
            <Button type="submit" variant="contained">
              {isEditMode ? "수정하기" : "추가하기"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
