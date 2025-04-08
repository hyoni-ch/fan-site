import { ErrorAlertProps } from "@/types/ialertProp";
import { Alert } from "@mui/material";
import React from "react";

function ErrorAlert({ success, message }: ErrorAlertProps) {
  if (!success || !message) return null;
  return (
    //! 실제로 DOM에 불필요한 래퍼 엘리먼트를 추가하지 않고 여러 자식 엘리먼트를 그룹화 가능.
    //! 즉, React 컴포넌트가 하나의 최상위 엘리먼트만 반환해야 한다는 규칙을 지키고, 불필요한 DOM 노드 추가 방지
    //! 이때 <> </> 이걸로 축약 가능, 이걸 쓰는 이유를 적어봄.
    <React.Fragment>
      <Alert severity="error" sx={{ mb: 2 }}>
        {/* <AlertTitle>Error {success}</AlertTitle> */}
        {message}
      </Alert>
    </React.Fragment>
  );
}

export default ErrorAlert;
