"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const TicketsPagination = ({
    currentPage,
    totalPages,
    totalItems,
    perPage,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setPage = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage);
        router.push(`/all-tickets?${params.toString()}`);
    };

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("ellipsis");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("ellipsis");
            pages.push(totalPages);
        }
        return pages;
    };

    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);

    if (totalPages <= 1) return null;

    return (
        <div className="mt-10 flex justify-center">
            <Pagination>
                <Pagination.Summary>
                    Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>
                <Pagination.Content>
                    <Pagination.Item>
                        <Pagination.Previous
                            isDisabled={currentPage === 1}
                            onPress={() => setPage(currentPage - 1)}
                        >
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                        </Pagination.Previous>
                    </Pagination.Item>

                    {getPageNumbers().map((p, i) =>
                        p === "ellipsis" ? (
                            <Pagination.Item key={`ellipsis-${i}`}>
                                <Pagination.Ellipsis />
                            </Pagination.Item>
                        ) : (
                            <Pagination.Item key={p}>
                                <Pagination.Link
                                    isActive={p === currentPage}
                                    onPress={() => setPage(p)}
                                >
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        ),
                    )}

                    <Pagination.Item>
                        <Pagination.Next
                            isDisabled={currentPage === totalPages}
                            onPress={() => setPage(currentPage + 1)}
                        >
                            <span>Next</span>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Pagination.Item>
                </Pagination.Content>
            </Pagination>
        </div>
    );
};

export default TicketsPagination;
