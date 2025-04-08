"use client";
import React, { Suspense } from "react";
import VerifyEmailServer from "./_components/verifyEmailServer";
import LoadingIndicator from "@/components/LoadingIndicator";

function VerifyEmail() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <VerifyEmailServer />
    </Suspense>
  );
}

export default VerifyEmail;
