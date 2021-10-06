import React from "react";
import { PaginationRequestType } from "types/movie.type";

export default function usePagination(_page: number, _size: number): any {
    const [resPagination, setPagination] = React.useState<PaginationRequestType>({
        page: _page,
        size: _size,
    });

    const handlePageChange = (currentPage: number) => {
        setPagination({ ...resPagination, page: currentPage });
    };

    return { resPagination, handlePageChange };
}
