"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function SubLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const noMarginPaths = ["/", "/artist"]; // 제외 경로 추가~

  const applyMarginTop = !noMarginPaths.includes(pathname);

  return (
    <div style={{ marginTop: applyMarginTop ? "100px" : "0px" }}>
      {children}
    </div>
  );
}
