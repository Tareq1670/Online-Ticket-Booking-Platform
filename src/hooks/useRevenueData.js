"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const useRevenueData = (vendorId) => {
    const router = useRouter();

    const [revenueData, setRevenueData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRevenue = useCallback(
        async (signal) => {
            if (!vendorId) {
                setRevenueData(null);
                setLoading(false);
                setError(null);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `/api/protected/vendor/revenue-overview?vendorId=${encodeURIComponent(vendorId)}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                        },
                        credentials: "include",
                        cache: "no-store",
                        signal,
                    },
                );

                const data = await res.json().catch(() => ({
                    success: false,
                    message: "Invalid server response",
                }));

                if (res.status === 401) {
                    router.push("/unauthorized");
                    return;
                }

                if (res.status === 403) {
                    router.push("/forbidden");
                    return;
                }

                if (!res.ok || !data?.success) {
                    throw new Error(
                        data?.message || "Failed to load revenue data",
                    );
                }

                setRevenueData(data.data);
            } catch (err) {
                if (err.name === "AbortError") return;

                setError(err.message || "Failed to load revenue data");
            } finally {
                if (!signal?.aborted) {
                    setLoading(false);
                }
            }
        },
        [vendorId, router],
    );

    useEffect(() => {
        const controller = new AbortController();
        fetchRevenue(controller.signal);

        return () => controller.abort();
    }, [fetchRevenue]);

    const refetch = useCallback(() => {
        const controller = new AbortController();
        fetchRevenue(controller.signal);
        return () => controller.abort();
    }, [fetchRevenue]);

    return {
        revenueData,
        loading,
        error,
        refetch,
    };
};

export default useRevenueData;