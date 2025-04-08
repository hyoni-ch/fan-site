// components/auth/AuthTabs.tsx
import { Tab, Tabs } from "@mui/material";

interface AuthTabsProps {
  activeTab: "login" | "register";
  onChangeTab: (newValue: "login" | "register") => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onChangeTab }) => (
  <Tabs
    value={activeTab}
    onChange={(_, newValue) => onChangeTab(newValue)}
    textColor="inherit"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      "& .MuiTabs-indicator": {
        backgroundColor: "#FCC422",
      },
      mb: 6,
    }}
  >
    <Tab
      value="login"
      label="로그인"
      sx={{
        color: activeTab === "login" ? "#FCC422" : "gray",
        fontWeight: activeTab === "login" ? "bold" : "normal",
        transition: "color 0.3s",
        flex: 1,
        textAlign: "center",
      }}
    />
    <Tab
      value="register"
      label="회원가입"
      sx={{
        color: activeTab === "register" ? "#FCC422" : "gray",
        fontWeight: activeTab === "register" ? "bold" : "normal",
        transition: "color 0.3s",
        flex: 1,
        textAlign: "center",
      }}
    />
  </Tabs>
);

export default AuthTabs;
