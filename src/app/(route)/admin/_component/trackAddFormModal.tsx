import React, { useState } from "react";
import FormModal from "./formModal";
import { TextField, Box } from "@mui/material";

type TrackAddFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (track: {
    title: string;
    youtubeUrl: string;
    description: string;
  }) => void;
};

const TrackAddFormModal = ({
  open,
  onClose,
  onSubmit,
}: TrackAddFormModalProps) => {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeUrl || !description) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    onSubmit({ title, description, youtubeUrl });
    setTitle("");
    setYoutubeUrl("");
    setDescription("");
    onClose();
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="트랙 추가"
      onSubmit={handleSubmit}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="트랙 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="YouTube 링크"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          fullWidth
        />
        <TextField
          label="트랙 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
      </Box>
    </FormModal>
  );
};

export default TrackAddFormModal;
