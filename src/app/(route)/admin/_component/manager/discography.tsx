import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  createAlbum,
  deleteAlbum,
  createTrack,
  getAlbumList,
} from "@/api/discography";
import { AlbumInfo } from "@/types/idiscography";
import ManagerTable from "../managerTable";
import FormModal from "../formModal";
import TrackAddFormModal from "../trackAddFormModal";
import Pagination from "@/components/pagination";

const DiscographyManager = () => {
  const [albums, setAlbums] = useState<AlbumInfo[] | null>(null);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    description: "",
    releaseDate: "",
    tags: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<AlbumInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openTrackModal, setOpenTrackModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumInfo | null>(null);
  const [openDescDialog, setOpenDescDialog] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState("");

  const handleOpenDescDialog = (desc: string) => {
    setSelectedDesc(desc);
    setOpenDescDialog(true);
  };

  const handleCloseDescDialog = () => {
    setOpenDescDialog(false);
  };

  const fetchAlbumList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchAlbums = await getAlbumList({
        page: currentPage,
        size: 10,
      });
      setAlbums(fetchAlbums.albumResponseDTOList);
      setTotalPages(fetchAlbums.totalPages);
    } catch (err) {
      console.error(err);
      setError("앨범 리스트를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setNewAlbum({ title: "", description: "", releaseDate: "", tags: "" });
    setImage(null);
    setIsEditMode(false);
    setOpenModal(true);
  };

  const handleOpenEditModal = (album: AlbumInfo) => {
    setNewAlbum({
      title: album.title,
      description: album.description,
      releaseDate: album.releaseDate,
      tags: album.tags,
    });
    setImage(null);
    setIsEditMode(true);
    setEditingAlbum(album);
    setOpenModal(true);
  };

  const handleDelete = async (id: string | number) => {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;

    if (isNaN(numericId)) {
      alert("삭제할 수 없는 ID입니다.");
      return;
    }

    const isConfirmed = window.confirm("정말로 이 앨범을 삭제하시겠습니까?");
    if (isConfirmed) {
      await deleteAlbum(numericId);
      fetchAlbumList();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const releaseDate = new Date(newAlbum.releaseDate);
    if (
      !newAlbum.title ||
      !newAlbum.description ||
      !newAlbum.releaseDate ||
      !newAlbum.tags ||
      !image
    ) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      if (isEditMode && editingAlbum) {
        alert("수정은 현재 불가능합니다.");
        return;
      } else {
        await createAlbum(
          newAlbum.title,
          newAlbum.description,
          releaseDate,
          newAlbum.tags,
          image
        );
      }
      setOpenModal(false);
      fetchAlbumList();
    } catch (err) {
      console.error(err);
      alert("앨범 업로드에 실패했습니다.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAlbum((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleAddTrack = (album: AlbumInfo) => {
    setSelectedAlbum(album);
    setOpenTrackModal(true);
  };

  const handleAddTrackSubmit = async (track: {
    title: string;
    description: string;
    youtubeUrl: string;
  }) => {
    if (!selectedAlbum) return;

    try {
      await createTrack(
        selectedAlbum.id,
        track.title,
        track.description,
        track.youtubeUrl
      );
      alert("트랙이 추가되었습니다!");
      setOpenTrackModal(false);
    } catch (error) {
      console.error("트랙 추가 실패:", error);
      alert("트랙 추가 실패 😢");
    }
  };

  useEffect(() => {
    fetchAlbumList();
  }, [currentPage]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">앨범 관리</Typography>
        <Button variant="outlined" onClick={handleOpenAddModal}>
          앨범 추가
        </Button>
      </Box>

      <ManagerTable
        data={albums}
        columns={[
          {
            label: "앨범 제목",
            render: (a) => (
              <Tooltip title={a.title}>
                <Typography
                  noWrap
                  sx={{
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {a.title}
                </Typography>
              </Tooltip>
            ),
          },
          { label: "발매일", render: (a) => a.releaseDate },
          { label: "태그", render: (a) => a.tags },
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
        getId={(a) => a.id}
        extraActions={(album) => (
          <Button
            size="small"
            sx={{ color: "green", mr: 1 }}
            onClick={() => handleAddTrack(album)}
          >
            트랙 추가
          </Button>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* 앨범 추가/수정 모달 */}
      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmit}
        isEditMode={isEditMode}
        title={isEditMode ? "앨범 수정" : "앨범 추가"}
        fields={[
          { name: "title", label: "앨범 제목", value: newAlbum.title },
          {
            name: "description",
            label: "상세정보",
            value: newAlbum.description,
            type: "textarea",
          },
          {
            name: "releaseDate",
            label: "발매일",
            value: newAlbum.releaseDate,
            type: "date",
          },
          {
            name: "tags",
            label: "태그",
            value: newAlbum.tags,
            type: "select",
            options: [
              { label: "Regular", value: "Regular" },
              { label: "Single", value: "Single" },
              { label: "Mini", value: "Mini" },
              { label: "OST", value: "OST" },
              { label: "Others", value: "Others" },
            ],
          },
        ]}
        onInputChange={handleInputChange}
        image={image}
        onImageChange={handleImageChange}
      />

      {/* 트랙 추가 모달 */}
      <TrackAddFormModal
        open={openTrackModal}
        onClose={() => setOpenTrackModal(false)}
        onSubmit={handleAddTrackSubmit}
      />

      {/* 상세정보 다이얼로그 */}
      <Dialog open={openDescDialog} onClose={handleCloseDescDialog}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          상세 정보
          <IconButton onClick={handleCloseDescDialog} size="small">
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

export default DiscographyManager;
