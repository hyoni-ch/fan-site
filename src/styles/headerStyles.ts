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
  display: "flex",
  flex: "20%",
  width: "140px",
  height: "140px",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
};

export const menuBoxStyle = {
  display: "flex",
  flex: "70%",
  gap: 5,
  flexDirection: "row-reverse",
};

export const iconButtonStyle = {
  display: "flex",
  flex: "10%",
  gap: 2,
  flexDirection: "row-reverse",
};
