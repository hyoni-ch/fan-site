"use client";

import api from "@/utils/api";

// import { logout } from "@/utils/auth";
import { Box, Container, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import NextLink from "next/link";

function Home() {
  api.get("/home").then((response) => {
    console.log(response.data);
  });

  return (
    // <button type="button" onClick={logout}>
    //   로그아웃
    // </button>
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in TypeScript
        </Typography>
        <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
      </Box>
    </Container>
  );
}

export default Home;
