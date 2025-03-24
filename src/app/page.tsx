"use client";

import api from "@/utils/api";
import { logout } from "@/utils/auth";

function Home() {
  api.get("/home").then((response) => {
    console.log(response.data);
  });

  return (
    <button type="button" onClick={logout}>
      로그아웃
    </button>
  );
}

export default Home;
