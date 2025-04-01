import React, { Suspense } from "react";
import VerifyEmailServer from "./_components/verifyEmailServer";

function VerifyEmail() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmailServer />
    </Suspense>
  );
}

export default VerifyEmail;
