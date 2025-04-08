// styles/headerStyles.ts
export const appBarStyle = (scrolling: boolean, isMainPage: boolean) => ({
  position: isMainPage ? "absolute" : "fixed",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  height: "100px",
  zIndex: 1100,
  boxShadow: "none",
  transform: scrolling ? "translateY(-10px)" : "translateY(10px)",
  transition: "transform 0.3s ease-in-out",
});

export const toolbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
  px: { xs: 2, md: 4 },
};

export const logoBoxStyle = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

export const menuBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

export const iconButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
};
