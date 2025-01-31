import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationCardProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export const PaginationCard: React.FC<PaginationCardProps> = ({
  page,
  limit,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="text-gray-700">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className=" cursor-pointer"
                onClick={() => onPageChange(Math.max(1, page - 1))}
              />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                className=" cursor-pointer"
                size="sm"
                onClick={() => onPageChange(i + 1)}
                isActive={i + 1 === page}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext
                className=" cursor-pointer"
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
