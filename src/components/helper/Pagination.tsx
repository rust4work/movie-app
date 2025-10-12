"use client";

import { Pagination } from "antd";
import { useRouter } from "next/navigation";

interface PaginationClientProps {
  current: number;
  total: number;
  pageSize?: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
}

export default function PaginationClient({
  current,
  total,
  pageSize = 20,
  basePath,
  onPageChange,
}: PaginationClientProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else if (basePath) {
      router.push(`${basePath}?page=${page}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagination
      current={current}
      total={Math.min(total, 1000)}
      pageSize={pageSize}
      onChange={handlePageChange}
      showSizeChanger={false}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} movies`}
    />
  );
}
