import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getGoodsList,
  createGoods,
  updateGoods,
  deleteGoods,
} from "@/api/goods";
import { Goods } from "@/types/igoods";
import ManagerTable from "../managerTable";
import FormModal from "../formModal";
import Pagination from "@/components/pagination";

const GoodsManager = () => {
  const [goods, setGoods] = useState<Goods[] | null>(null);
  const [newGoods, setNewGoods] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingGoods, setEditingGoods] = useState<Goods | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openDescDialog, setOpenDescDialog] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState("");

  const handleOpenDescDialog = (desc: string) => {
    setSelectedDesc(desc);
    setOpenDescDialog(true);
  };

  const handleCloseDescDialog = () => {
    setOpenDescDialog(false);
  };

  const fetchGoodsList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchGoods = await getGoodsList({
        sort: "last",
        name: "",
        page: currentPage,
        size: 10,
      });
      setGoods(fetchGoods.content);
      setTotalPages(fetchGoods.totalPages);
    } catch (err) {
      console.error(err);
      setError("굿즈 리스트를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setNewGoods({ name: "", price: "", description: "" });
    setImage(null);
    setIsEditMode(false);
    setOpenModal(true);
  };

  const handleOpenEditModal = (goods: Goods) => {
    setNewGoods({
      name: goods.goodsName,
      price: goods.price.toString(),
      description: goods.description,
    });
    setImage(null);
    setIsEditMode(true);
    setEditingGoods(goods);
    setOpenModal(true);
  };

  const handleDelete = async (id: string | number) => {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(numericId)) {
      alert("삭제할 수 없는 ID입니다.");
      return;
    }

    const isConfirmed = window.confirm("정말로 이 굿즈를 삭제하시겠습니까?");
    if (isConfirmed) {
      await deleteGoods(numericId);
      fetchGoodsList();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(newGoods.price, 10);
    if (!newGoods.name || isNaN(price) || !newGoods.description) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      if (isEditMode && editingGoods) {
        await updateGoods(
          editingGoods.id,
          newGoods.name,
          price,
          newGoods.description,
          image
        );
      } else {
        await createGoods(newGoods.name, price, newGoods.description, image!);
      }
      setOpenModal(false);
      fetchGoodsList();
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGoods((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  useEffect(() => {
    fetchGoodsList();
  }, [currentPage]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">굿즈 관리</Typography>
        <Button variant="outlined" onClick={handleOpenAddModal}>
          굿즈 추가
        </Button>
      </Box>

      <ManagerTable
        data={goods}
        columns={[
          { label: "이름", render: (g) => g.goodsName },
          { label: "가격", render: (g) => `₩${g.price.toLocaleString()}` },
          {
            label: "상세정보",
            render: (g) => (
              <Typography
                noWrap
                sx={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "primary.main",
                }}
                onClick={() => handleOpenDescDialog(g.description)}
              >
                {g.description}
              </Typography>
            ),
          },
        ]}
        isLoading={isLoading}
        error={error}
        onEdit={handleOpenEditModal}
        onDelete={handleDelete}
        getId={(g) => g.id}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmit}
        isEditMode={isEditMode}
        title={isEditMode ? "굿즈 수정" : "굿즈 추가"}
        fields={[
          { name: "name", label: "이름", value: newGoods.name },
          {
            name: "price",
            label: "가격",
            value: newGoods.price,
            type: "number",
          },
          {
            name: "description",
            label: "상세정보",
            value: newGoods.description,
            type: "textarea",
          },
        ]}
        onInputChange={handleInputChange}
        image={image}
        onImageChange={handleImageChange}
      />

      <Dialog open={openDescDialog} onClose={handleCloseDescDialog}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          상세 정보
          <IconButton onClick={handleCloseDescDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {selectedDesc}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GoodsManager;
