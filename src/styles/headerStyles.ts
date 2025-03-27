// styles/headerStyles.ts
export const appBarStyle = (scrolling: boolean, isMainPage: boolean) => ({
  position: isMainPage ? "absolute" : "fixed",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0)",
  height: "100px",
  zIndex: 1000,
  boxShadow: "none",
  transform: scrolling ? "translateY(-10px)" : "translateY(10px)",
  transition: "transform 0.3s ease-in-out",
});

export const toolbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  height: "100%",
  px: 3,
};

export const logoBoxStyle = {
  width: "120px",
  height: "120px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "400px",
};

export const menuBoxStyle = {
  display: "flex",
  gap: 5,
  marginLeft: "400px",
};

export const iconButtonStyle = {
  display: "flex",
  gap: 2,
};
