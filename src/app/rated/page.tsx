"use client";

import React, { Suspense } from "react";
import RatedPage from "@/components/RatedPage";
import { Spin } from "antd";

export default function PageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center flex-1 mt-10">
          <Spin size="large" />
        </div>
      }
    >
      <RatedPage />
    </Suspense>
  );
}
