import { useState } from "react";
import { useRouter } from "next/navigation";
import { join, login } from "@/api/auth";

interface AuthFields {
  username: string;
  password: string;
  nickname: string;
}

const useUserAuth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [credentials, setCredentials] = useState<AuthFields>({
    username: "",
    password: "",
    nickname: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !credentials.username ||
      !credentials.password ||
      (activeTab === "register" && !credentials.nickname)
    ) {
      setErrorMessage("모든 필드를 입력해주세요.");
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    setLoading(true);
    setOpenBackdrop(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const result =
      activeTab === "login"
        ? await login(credentials.username, credentials.password)
        : await join({ ...credentials });

    setTimeout(() => {
      setLoading(false);
      setOpenBackdrop(false);
    }, 100);

    if (!result?.success) {
      setErrorMessage(result?.message || "알 수 없는 에러 발생");
      return;
    }

    if (activeTab === "login") {
      router.push("/");
    } else {
      setSuccessMessage("입력하신 이메일로 인증요청을 보냈습니다.");
      setActiveTab("login");
      setTimeout(() => setSuccessMessage(null), 7000);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return {
    activeTab,
    credentials,
    loading,
    errorMessage,
    successMessage,
    openBackdrop,
    setActiveTab,
    setCredentials,
    handleInputChange,
    handleAuthSubmit,
    handleBack,
  };
};

export default useUserAuth;
