"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Table } from "@heroui/react";
import { BiSearch, BiReceipt } from "react-icons/bi";
import {
    FiRefreshCw,
    FiCalendar,
    FiCreditCard,
    FiDollarSign,
    FiHash,
    FiFileText,
    FiCopy,
    FiCheckCircle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "৳0.00";
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(num)) return "৳0.00";
    return `৳${num.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDate = (date) => {
    if (!date) return "N/A";
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const formatDateTime = (date) => {
    if (!date) return "N/A";
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const truncateId = (id, length = 16) => {
    if (!id || typeof id !== "string") return "N/A";
    if (id.length <= length) return id;
    return `${id.slice(0, length)}...`;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
        },
    },
};

const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -4,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 20,
        },
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
        },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
        },
    },
};

const StatCard = ({
    title,
    value,
    Icon,
    numberClass,
    iconClass,
    cardClass,
    borderClass,
    index = 0,
}) => (
    <motion.div
        variants={itemVariants}
        initial="rest"
        whileHover="hover"
        className="group relative overflow-hidden rounded-[20px] border sm:rounded-[24px] lg:rounded-[26px]"
    >
        <motion.div
            variants={cardHoverVariants}
            className={`relative overflow-hidden rounded-[20px] border ${borderClass} bg-gradient-to-br ${cardClass} p-4 shadow-[0_18px_50px_rgba(6,78,59,0.08)] transition-shadow duration-300 hover:shadow-[0_26px_80px_rgba(6,78,59,0.16)] sm:rounded-[24px] sm:p-5 lg:rounded-[26px]`}
        >
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-white/50 sm:h-24 sm:w-24 dark:bg-white/5" />
            <motion.div
                className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-emerald-400/10 blur-xl sm:h-20 sm:w-20"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                }}
            />
            <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p
                        className={`text-xl font-black xs:text-2xl sm:text-3xl lg:text-4xl ${numberClass} truncate`}
                    >
                        {value}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-gray-500 sm:mt-1 sm:text-sm dark:text-gray-400">
                        {title}
                    </p>
                </div>
                <motion.div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-xl sm:h-12 sm:w-12 sm:rounded-2xl lg:h-14 lg:w-14 ${iconClass}`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <Icon className="text-lg sm:text-xl lg:text-2xl" />
                </motion.div>
            </div>
        </motion.div>
    </motion.div>
);

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* ignore */
        }
    };

    return (
        <motion.button
            type="button"
            onClick={handleCopy}
            className="ml-1.5 inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100 hover:text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 dark:hover:bg-emerald-900/60"
            title={copied ? "Copied!" : "Copy to clipboard"}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span
                        key="check"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FiCheckCircle className="text-sm" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FiCopy className="text-sm" />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

const TransactionHistoryTable = ({
    transactions: initialTransactions = [],
}) => {
    const [transactions, setTransactions] = useState(() =>
        Array.isArray(initialTransactions) ? initialTransactions : [],
    );
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        setTransactions(
            Array.isArray(initialTransactions) ? initialTransactions : [],
        );
    }, [initialTransactions]);

    const totalTransactions = transactions.length;
    const totalAmountSpent = useMemo(
        () =>
            transactions.reduce((sum, t) => {
                const amt =
                    typeof t?.amount === "number"
                        ? t.amount
                        : parseFloat(t?.amount || 0);
                return sum + (isNaN(amt) ? 0 : amt);
            }, 0),
        [transactions],
    );
    const latestPayment = useMemo(() => {
        if (transactions.length === 0) return "N/A";
        const sorted = [...transactions].sort(
            (a, b) =>
                new Date(b?.paymentDate || b?.createdAt || 0).getTime() -
                new Date(a?.paymentDate || a?.createdAt || 0).getTime(),
        );
        return formatDate(sorted[0]?.paymentDate || sorted[0]?.createdAt);
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        const query = search.trim().toLowerCase();
        let filtered = transactions.filter((t) => {
            if (!query) return true;
            const txId = (t?.transactionId || "").toLowerCase();
            const ticketTitle = (t?.ticketTitle || "").toLowerCase();
            const amount = String(t?.amount || "").toLowerCase();
            return (
                txId.includes(query) ||
                ticketTitle.includes(query) ||
                amount.includes(query)
            );
        });

        filtered.sort((a, b) => {
            const dateA = new Date(
                a?.paymentDate || a?.createdAt || 0,
            ).getTime();
            const dateB = new Date(
                b?.paymentDate || b?.createdAt || 0,
            ).getTime();

            if (sortOrder === "newest") return dateB - dateA;
            if (sortOrder === "oldest") return dateA - dateB;
            if (sortOrder === "high") {
                const amtA =
                    typeof a?.amount === "number"
                        ? a.amount
                        : parseFloat(a?.amount || 0);
                const amtB =
                    typeof b?.amount === "number"
                        ? b.amount
                        : parseFloat(b?.amount || 0);
                return amtB - amtA;
            }
            if (sortOrder === "low") {
                const amtA =
                    typeof a?.amount === "number"
                        ? a.amount
                        : parseFloat(a?.amount || 0);
                const amtB =
                    typeof b?.amount === "number"
                        ? b.amount
                        : parseFloat(b?.amount || 0);
                return amtA - amtB;
            }
            return 0;
        });

        return filtered;
    }, [transactions, search, sortOrder]);

    const getRowKey = (t, i) =>
        t?._id || t?.transactionId || `transaction-${i}`;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen space-y-4 rounded-[24px] bg-[#F0FDF4] p-3 sm:space-y-5 sm:rounded-[28px] sm:p-5 lg:space-y-7 lg:p-6 dark:bg-[#06130D]"
        >
            {/* Header Banner */}
            <motion.div
                variants={fadeInUp}
                className="relative hidden overflow-hidden rounded-[26px] bg-gradient-to-r from-[#052E16] via-[#16A34A] to-[#34D399] p-5 shadow-[0_24px_70px_rgba(22,163,74,0.28)] sm:rounded-[30px] sm:p-6 md:block lg:p-8"
            >
                <motion.div
                    className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl"
                    animate={{
                        x: [0, 15, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-lime-300/30 blur-3xl"
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 15, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                            Transaction History
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-green-50">
                            View all your Stripe payment transactions. Track
                            every ticket purchase with detailed transaction
                            records including IDs, amounts and dates.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="grid grid-cols-2 gap-3 rounded-2xl border border-white/20 bg-white/15 p-3 backdrop-blur-xl sm:min-w-[280px]"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="rounded-2xl bg-white/95 p-4 text-center shadow-lg dark:bg-[#07111F]/90"
                        >
                            <p className="text-2xl font-black text-emerald-600">
                                {filteredTransactions.length}
                            </p>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                Showing
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="rounded-2xl bg-white/95 p-4 text-center shadow-lg dark:bg-[#07111F]/90"
                        >
                            <p className="text-2xl font-black text-lime-600">
                                {totalTransactions}
                            </p>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                Total
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Stat Cards - Responsive */}
            <motion.div
                variants={containerVariants}
                className="grid  gap-3 grid-cols-2 sm:gap-4 xl:grid-cols-3"
            >
                <StatCard
                    title="Total Transactions"
                    value={totalTransactions}
                    Icon={BiReceipt}
                    numberClass="text-emerald-600"
                    iconClass="bg-gradient-to-br from-emerald-600 to-green-400"
                    cardClass="from-emerald-50 via-white to-green-50 dark:from-emerald-950/50 dark:via-[#07111F] dark:to-green-950/30"
                    borderClass="border-emerald-100 dark:border-emerald-900/50"
                    index={0}
                />
                <StatCard
                    title="Total Amount Spent"
                    value={formatCurrency(totalAmountSpent)}
                    Icon={FiDollarSign}
                    numberClass="text-green-700"
                    iconClass="bg-gradient-to-br from-green-700 to-emerald-500"
                    cardClass="from-green-50 via-white to-emerald-50 dark:from-green-950/50 dark:via-[#07111F] dark:to-emerald-950/30"
                    borderClass="border-green-100 dark:border-green-900/50"
                    index={1}
                />
                <StatCard
                    title="Latest Payment"
                    value={latestPayment}
                    Icon={FiCalendar}
                    numberClass="text-lime-600 !text-lg xs:!text-xl sm:!text-2xl"
                    iconClass="bg-gradient-to-br from-lime-600 to-emerald-500"
                    cardClass="from-lime-50 via-white to-emerald-50 dark:from-lime-950/40 dark:via-[#07111F] dark:to-emerald-950/30"
                    borderClass="border-lime-100 dark:border-lime-900/50"
                    index={2}
                />
            </motion.div>

            {/* Table Section */}
            <motion.div
                variants={fadeInUp}
                className="overflow-hidden rounded-[22px] border border-emerald-100 bg-white shadow-[0_25px_80px_rgba(6,78,59,0.1)] sm:rounded-[26px] lg:rounded-[30px] dark:border-emerald-900/50 dark:bg-[#07111F]"
            >
                {/* Filters Header */}
                <div className="border-b border-emerald-100 bg-gradient-to-r from-white via-emerald-50/60 to-green-50 p-3 sm:p-4 lg:p-5 dark:border-emerald-900/50 dark:from-[#07111F] dark:via-[#052E16] dark:to-[#064E3B]">
                    <div className="flex flex-col gap-3 sm:gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-base font-black text-[#064E3B] sm:text-lg lg:text-xl dark:text-white">
                                Payment Records
                            </h2>
                            <p className="mt-0.5 text-xs text-gray-500 sm:mt-1 sm:text-sm dark:text-gray-400">
                                All your Stripe transaction details in one
                                place.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:w-[680px] xl:grid-cols-[1fr_180px_100px] xl:items-center"
                        >
                            {/* Search */}
                            <div className="relative sm:col-span-2 xl:col-span-1">
                                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-emerald-600 sm:text-xl dark:text-emerald-300" />
                                <input
                                    type="text"
                                    placeholder="Search by Transaction ID, Ticket Title..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-emerald-200/90 bg-white/95 pl-9 pr-3 text-xs font-semibold text-[#052E16] caret-emerald-600 outline-none transition placeholder:text-emerald-600/55 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 sm:h-11 sm:rounded-2xl sm:pl-10 sm:pr-4 sm:text-sm dark:border-emerald-800/70 dark:bg-[#081C13] dark:text-emerald-50"
                                />
                            </div>
                            {/* Sort */}
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="h-10 w-full cursor-pointer rounded-xl border border-emerald-200/90 bg-white/95 px-3 text-xs font-bold text-[#052E16] outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 sm:h-11 sm:rounded-2xl sm:px-4 sm:text-sm dark:border-emerald-800/70 dark:bg-[#081C13] dark:text-emerald-50"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="high">Amount: High → Low</option>
                                <option value="low">Amount: Low → High</option>
                            </select>
                            {/* Reset */}
                            <motion.button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setSortOrder("newest");
                                }}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                                className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#064E3B] via-emerald-600 to-green-500 px-3 text-sm font-black text-white shadow-lg shadow-emerald-700/25 transition-opacity hover:opacity-90 sm:col-span-2 sm:h-11 sm:gap-2 sm:rounded-2xl sm:px-4 xl:col-span-1"
                            >
                                <FiRefreshCw className="text-sm" /> Reset
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Cards View */}
                <div className="block bg-gradient-to-br from-[#ECFDF5] via-[#F8FFF9] to-[#F7FEE7] p-3 sm:p-4 lg:hidden dark:from-[#04130B] dark:via-[#071A12] dark:to-[#102A0D]">
                    {filteredTransactions.length === 0 ? (
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 sm:rounded-3xl sm:p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 sm:h-12 sm:w-12 sm:rounded-2xl dark:bg-[#06130D]">
                                <BiReceipt className="text-xl sm:text-2xl" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#064E3B] sm:text-base dark:text-white">
                                    No transactions found
                                </p>
                                <p className="text-xs text-gray-500 sm:text-sm">
                                    Your payment history will appear here after
                                    your first purchase.
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredTransactions.map(
                                    (transaction, index) => {
                                        const rowKey = getRowKey(
                                            transaction,
                                            index,
                                        );
                                        const amount =
                                            typeof transaction?.amount ===
                                            "number"
                                                ? transaction.amount
                                                : parseFloat(
                                                      transaction?.amount || 0,
                                                  );
                                        return (
                                            <motion.div
                                                key={`m-${rowKey}`}
                                                variants={itemVariants}
                                                layout
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                    y: -10,
                                                }}
                                                whileHover={{
                                                    y: -3,
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 400,
                                                    },
                                                }}
                                                className="relative overflow-hidden rounded-[22px] border border-emerald-200/80 bg-gradient-to-br from-white via-[#F0FDF4] to-[#ECFCCB] p-3 shadow-[0_18px_55px_rgba(6,78,59,0.13)] sm:rounded-[28px] sm:p-4 dark:border-emerald-800/70 dark:from-[#06130D] dark:via-[#082016] dark:to-[#142C10]"
                                            >
                                                <motion.div
                                                    className="absolute -right-14 -top-14 h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl sm:h-32 sm:w-32"
                                                    animate={{
                                                        scale: [1, 1.15, 1],
                                                        opacity: [
                                                            0.2, 0.4, 0.2,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        delay: index * 0.3,
                                                    }}
                                                />

                                                {/* Card Header */}
                                                <div className="relative z-10 flex items-start justify-between gap-2 sm:gap-3">
                                                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                                                        <motion.div
                                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-400 text-white shadow-lg sm:h-10 sm:w-10 sm:rounded-2xl"
                                                            whileHover={{
                                                                rotate: [
                                                                    0, -5, 5, 0,
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration: 0.4,
                                                            }}
                                                        >
                                                            <FiCreditCard className="text-base sm:text-lg" />
                                                        </motion.div>
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-black text-[#064E3B] sm:text-base dark:text-white">
                                                                {transaction?.ticketTitle ||
                                                                    "Unknown Ticket"}
                                                            </p>
                                                            <p className="text-[10px] font-semibold text-gray-400 sm:text-xs">
                                                                #{index + 1}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <motion.span
                                                        className="shrink-0 rounded-lg bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-700 sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-sm dark:bg-emerald-950 dark:text-emerald-300"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                    >
                                                        {formatCurrency(amount)}
                                                    </motion.span>
                                                </div>

                                                {/* Card Details */}
                                                <div className="relative z-10 mt-3 grid grid-cols-1 gap-2.5 rounded-xl border border-emerald-100/80 bg-white/85 p-3 text-xs shadow-inner backdrop-blur sm:mt-4 sm:gap-3 sm:rounded-2xl sm:p-4 sm:text-sm dark:border-emerald-900/60 dark:bg-[#04130B]/75">
                                                    <div className="min-w-0">
                                                        <p className="mb-0.5 text-[10px] font-black uppercase text-emerald-700 sm:mb-1 sm:text-xs dark:text-emerald-300">
                                                            Transaction ID
                                                        </p>
                                                        <div className="flex min-w-0 items-center gap-1 font-semibold text-gray-600 dark:text-gray-300">
                                                            <FiHash className="shrink-0 text-xs text-emerald-600 sm:text-sm" />
                                                            <span className="break-all font-mono text-[10px] sm:text-xs">
                                                                {truncateId(
                                                                    transaction?.transactionId,
                                                                    20,
                                                                )}
                                                            </span>
                                                            <CopyButton
                                                                text={
                                                                    transaction?.transactionId
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0.5 text-[10px] font-black uppercase text-emerald-700 sm:mb-1 sm:text-xs dark:text-emerald-300">
                                                            Amount
                                                        </p>
                                                        <div className="flex items-center gap-1.5 font-semibold text-gray-600 sm:gap-2 dark:text-gray-300">
                                                            <FiDollarSign className="shrink-0 text-xs text-green-600 sm:text-sm" />
                                                            <span className="text-sm font-black text-[#064E3B] sm:text-base dark:text-emerald-300">
                                                                {formatCurrency(
                                                                    amount,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0.5 text-[10px] font-black uppercase text-emerald-700 sm:mb-1 sm:text-xs dark:text-emerald-300">
                                                            Ticket Title
                                                        </p>
                                                        <div className="flex items-center gap-1.5 font-semibold text-gray-600 sm:gap-2 dark:text-gray-300">
                                                            <FiFileText className="shrink-0 text-xs text-lime-600 sm:text-sm" />
                                                            <span className="text-xs sm:text-sm">
                                                                {transaction?.ticketTitle ||
                                                                    "N/A"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0.5 text-[10px] font-black uppercase text-emerald-700 sm:mb-1 sm:text-xs dark:text-emerald-300">
                                                            Payment Date
                                                        </p>
                                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 sm:gap-2 sm:text-sm dark:text-gray-300">
                                                            <FiCalendar className="shrink-0 text-xs text-emerald-600 sm:text-sm" />
                                                            {formatDateTime(
                                                                transaction?.paymentDate ||
                                                                    transaction?.createdAt,
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Payment Status Badge */}
                                                <div className="relative z-10 mt-2.5 flex justify-end sm:mt-3">
                                                    <motion.span
                                                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[10px] font-black text-white shadow-md sm:gap-1.5 sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-xs"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.98,
                                                        }}
                                                    >
                                                        <FiCheckCircle /> Paid
                                                    </motion.span>
                                                </div>
                                            </motion.div>
                                        );
                                    },
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>

                {/* Desktop Table View */}
                <motion.div
                    className="hidden lg:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content
                                aria-label="Transaction history table"
                                className="min-w-[900px]"
                            >
                                <Table.Header>
                                    <Table.Column isRowHeader>#</Table.Column>
                                    <Table.Column>Transaction ID</Table.Column>
                                    <Table.Column>Ticket Title</Table.Column>
                                    <Table.Column>Amount</Table.Column>
                                    <Table.Column>Payment Date</Table.Column>
                                    <Table.Column>Status</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {filteredTransactions.length === 0 ? (
                                        <Table.Row>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3 py-8">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50">
                                                        <BiReceipt className="text-2xl text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-[#064E3B] dark:text-white">
                                                            No transactions
                                                            found
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Your payment history
                                                            will appear here
                                                            after your first
                                                            purchase.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>{""}</Table.Cell>
                                            <Table.Cell>{""}</Table.Cell>
                                            <Table.Cell>{""}</Table.Cell>
                                            <Table.Cell>{""}</Table.Cell>
                                            <Table.Cell>{""}</Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        filteredTransactions.map(
                                            (transaction, index) => {
                                                const rowKey = getRowKey(
                                                    transaction,
                                                    index,
                                                );
                                                const amount =
                                                    typeof transaction?.amount ===
                                                    "number"
                                                        ? transaction.amount
                                                        : parseFloat(
                                                              transaction?.amount ||
                                                                  0,
                                                          );
                                                return (
                                                    <Table.Row
                                                        key={`d-${rowKey}`}
                                                    >
                                                        {/* Serial Number */}
                                                        <Table.Cell>
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 font-black text-emerald-700 dark:from-emerald-950 dark:to-green-950 dark:text-emerald-300">
                                                                {index + 1}
                                                            </div>
                                                        </Table.Cell>

                                                        {/* Transaction ID */}
                                                        <Table.Cell>
                                                            <div className="flex items-center gap-1.5">
                                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-400 text-white shadow-md">
                                                                    <FiHash className="text-sm" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="truncate font-mono text-xs font-bold text-[#064E3B] dark:text-emerald-200">
                                                                        {truncateId(
                                                                            transaction?.transactionId,
                                                                            20,
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <CopyButton
                                                                    text={
                                                                        transaction?.transactionId
                                                                    }
                                                                />
                                                            </div>
                                                        </Table.Cell>

                                                        {/* Ticket Title */}
                                                        <Table.Cell>
                                                            <div className="flex items-center gap-2">
                                                                <FiFileText className="shrink-0 text-lime-600" />
                                                                <span className="font-bold text-[#064E3B] dark:text-white">
                                                                    {transaction?.ticketTitle ||
                                                                        "Unknown Ticket"}
                                                                </span>
                                                            </div>
                                                        </Table.Cell>

                                                        {/* Amount */}
                                                        <Table.Cell>
                                                            <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 dark:bg-emerald-950/40">
                                                                <FiDollarSign className="text-emerald-600" />
                                                                <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">
                                                                    {formatCurrency(
                                                                        amount,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </Table.Cell>

                                                        {/* Payment Date */}
                                                        <Table.Cell>
                                                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                                                <FiCalendar className="text-emerald-600" />
                                                                {formatDateTime(
                                                                    transaction?.paymentDate ||
                                                                        transaction?.createdAt,
                                                                )}
                                                            </div>
                                                        </Table.Cell>

                                                        {/* Status */}
                                                        <Table.Cell>
                                                            <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                                                <FiCheckCircle />{" "}
                                                                Paid
                                                            </span>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            },
                                        )
                                    )}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default TransactionHistoryTable;