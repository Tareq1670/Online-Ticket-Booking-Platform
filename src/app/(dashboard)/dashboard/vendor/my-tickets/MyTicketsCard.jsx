"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
// import { deleteMyAddedTicket } from "@/lib/actions/ticket";
import { IoTicketSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { MdBlock } from "react-icons/md";
import MyAddedTicketCard from "./TicketsCard";

const MyTicketsCard = ({ initialTickets, vendorId, isFraud = false }) => {
    const [tickets, setTickets] = useState(
        Array.isArray(initialTickets) ? initialTickets.filter(Boolean) : [],
    );
    const [deletingId, setDeletingId] = useState("");

    const handleDelete = async (id) => {
        if (!vendorId) {
            toast.error("Vendor id not found");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ticket?",
        );

        if (!confirmDelete) return;

        setDeletingId(id);

        try {
            const result = await deleteMyAddedTicket(id, vendorId);

            if (result?.success) {
                toast.success(result.message || "Ticket deleted successfully");
                setTickets((prev) =>
                    prev.filter((ticket) => {
                        const ticketId = ticket?._id?.$oid || ticket?._id;
                        return ticketId !== id;
                    }),
                );
            } else {
                toast.error(result?.message || "Failed to delete ticket");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setDeletingId("");
        }
    };

    const stats = useMemo(() => {
        const total = tickets.length;
        const pending = tickets.filter(
            (ticket) => ticket?.verificationStatus === "pending",
        ).length;
        const approved = tickets.filter(
            (ticket) => ticket?.verificationStatus === "approved",
        ).length;
        const rejected = tickets.filter(
            (ticket) => ticket?.verificationStatus === "rejected",
        ).length;

        return { total, pending, approved, rejected };
    }, [tickets]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-8 dark:from-[#070B14] dark:via-[#0A0F1C] dark:to-[#06140C] md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="relative mb-8 overflow-hidden rounded-[30px] bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.45)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

                    <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-md">
                                <IoTicketSharp size={30} />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-2xl font-black text-white md:text-3xl">
                                        My Added Tickets
                                    </h1>
                                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                                        {stats.total} Tickets
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-white/80">
                                    Manage all your listed travel tickets in one place
                                </p>
                            </div>
                        </div>

                        {isFraud ? (
                            <button
                                disabled
                                className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-white/20 px-5 font-bold text-white/70 backdrop-blur-md"
                            >
                                <MdBlock size={18} />
                                Add Disabled
                            </button>
                        ) : (
                            <Link
                                href="/dashboard/vendor/add-ticket"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 font-bold text-green-700 shadow-lg transition hover:scale-[1.02]"
                            >
                                <FaPlus size={14} />
                                Add New Ticket
                            </Link>
                        )}
                    </div>
                </div>

                {isFraud && (
                    <div className="mb-8 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm font-medium text-rose-700 shadow-sm dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-300">
                        Your vendor account has been marked as fraud. You cannot add new tickets, and your public tickets should remain hidden according to platform rules.
                    </div>
                )}

                <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard title="Total Tickets" value={stats.total} color="green" />
                    <StatCard title="Pending" value={stats.pending} color="amber" />
                    <StatCard title="Approved" value={stats.approved} color="emerald" />
                    <StatCard title="Rejected" value={stats.rejected} color="rose" />
                </div>

                {tickets.length === 0 ? (
                    <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white/80 p-12 text-center shadow-lg backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/40">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                            <HiMiniSquares2X2 size={32} />
                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-zinc-900 dark:text-white">
                            No tickets added yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Start adding your first ticket and manage it here.
                        </p>

                        {!isFraud && (
                            <Link
                                href="/dashboard/vendor/add-ticket"
                                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 font-semibold text-white shadow-lg"
                            >
                                <FaPlus size={14} />
                                Add Ticket
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {tickets.map((ticket) => {
                            const ticketId = ticket?._id?.$oid || ticket?._id;

                            return (
                                <MyAddedTicketCard
                                    key={ticketId}
                                    ticket={ticket}
                                    onDelete={handleDelete}
                                    deletingId={deletingId}
                                    isFraud={isFraud}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color = "green" }) => {
    const styles = {
        green: "from-green-50 to-emerald-50 text-green-700 dark:from-green-900/10 dark:to-emerald-900/10 dark:text-green-400",
        amber: "from-amber-50 to-yellow-50 text-amber-700 dark:from-amber-900/10 dark:to-yellow-900/10 dark:text-amber-400",
        emerald: "from-emerald-50 to-teal-50 text-emerald-700 dark:from-emerald-900/10 dark:to-teal-900/10 dark:text-emerald-400",
        rose: "from-rose-50 to-red-50 text-rose-700 dark:from-rose-900/10 dark:to-red-900/10 dark:text-rose-400",
    };

    return (
        <div
            className={`rounded-[24px] border border-zinc-200 bg-gradient-to-br p-5 shadow-md dark:border-zinc-800 ${styles[color]}`}
        >
            <p className="text-sm font-medium opacity-80">{title}</p>
            <h3 className="mt-2 text-3xl font-black">{value}</h3>
        </div>
    );
};

export default MyTicketsCard;