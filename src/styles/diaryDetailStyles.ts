import { SxProps, Theme } from "@mui/system";

/** 📌 전체 페이지 레이아웃 */
export const boxStyle: SxProps<Theme> = {
  width: "100%",
  maxWidth: "1000px",
  height: "100%",
  margin: "6rem auto",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

/** 📌 다이어리 본문 스타일 */
export const contentStyle: SxProps<Theme> = {
  padding: "6rem",
};

export const bodyTextStyle: SxProps<Theme> = {
  color: "#333",
  fontSize: "1rem",
  letterSpacing: "0.5px",
  lineHeight: "1.8",
};

/** 📌 다이어리 이미지 관련 스타일 */
export const imageBoxStyle: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  height: "800px",
};

export const imageOverlayStyle: SxProps<Theme> = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "rgba(0, 0, 0, 0.6)",
  color: "white",
  padding: "40px",
  textAlign: "right",
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: "bold",
  letterSpacing: "1px",
};

export const subtitleStyle: SxProps<Theme> = {
  fontSize: "14px",
};

/** 📌 댓글 목록 스타일 */
export const commentBoxStyle: SxProps<Theme> = {
  borderTop: "1px solid #ddd",
  padding: "4rem",
};

export const commentItemStyle: SxProps<Theme> = {
  position: "relative",
  marginBottom: "1rem",
  borderBottom: "1px solid #ddd",
  padding: "1rem",
};

export const commentTextStyle: SxProps<Theme> = {
  fontWeight: "bold",
};

export const commentDateStyle: SxProps<Theme> = {
  fontSize: "0.8rem",
  color: "gray",
};

/** 📌 댓글 입력 스타일 */
