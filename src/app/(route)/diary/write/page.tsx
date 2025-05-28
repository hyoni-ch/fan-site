"use client";

import React from "react";
import DiaryForm from "./_components/DiaryForm";
import { useCheckArtistRole } from "@/hooks/useCheckArtistRole";

function Write() {
  useCheckArtistRole();
  return <DiaryForm />;
}

export default Write;
