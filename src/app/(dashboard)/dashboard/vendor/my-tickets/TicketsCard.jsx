"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import {
    MdArrowForward,
    MdOutlineModeEdit,
    MdDeleteOutline,
    MdAccessTime,
} from "react-icons/md";
import { Button } from "@heroui/react";

const transportIcons = {
    Bus: FaBus,
    Train: FaTrain,
    Plane: FaPlane,
    Launch: FaShip,
};

const statusStyle = {
    pending:
        "border border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
    approved:
        "border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
    rejected:
        "border border-rose-200 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-400",
};

const formatDate = (dateString) => {
    if (!dateString) return "Date not available";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const MyAddedTicketCard = ({
    ticket,
    onDelete,
    deletingId,
    isFraud = false,
}) => {
    if (!ticket) return null;

    const ticketId = ticket?._id?.$oid || ticket?._id || "";
    const transportType = ticket?.transportType || "Bus";
    const Icon = transportIcons[transportType] || FaBus;
    const status = ticket?.verificationStatus || "pending";
    const isRejected = status === "rejected";
    const disableActions = isRejected || isFraud;

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-[0_15px_40px_-20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(16,185,129,0.25)] dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative h-44 w-full overflow-hidden">
                {ticket?.image ? (
                    <Image
                        src={ticket.image}
                        alt={ticket?.title || "Ticket image"}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                        <Icon className="text-4xl text-zinc-400" />
                    </div>
                )}

                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-green-700 shadow backdrop-blur-sm dark:bg-zinc-900/90 dark:text-green-400">
                    <Icon size={12} />
                    {transportType}
                </div>

                <div
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold capitalize shadow-sm ${
                        statusStyle[status] || statusStyle.pending
                    }`}
                >
                    {status}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="space-y-3">
                    <h3 className="line-clamp-2 text-lg font-black leading-snug text-zinc-900 dark:text-white">
                        {ticket?.title || "Untitled Ticket"}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        <span className="rounded-lg bg-zinc-100 px-2.5 py-1 dark:bg-zinc-800">
                            {ticket?.from || "Unknown"}
                        </span>
                        <MdArrowForward className="text-green-500" />
                        <span className="rounded-lg bg-zinc-100 px-2.5 py-1 dark:bg-zinc-800">
                            {ticket?.to || "Unknown"}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                        <InfoBox
                            label="Price"
                            value={
                                <span className="flex items-center text-green-600 dark:text-green-400">
                                    <TbCurrencyTaka size={16} />
                                    {ticket?.price || 0}
                                </span>
                            }
                        />
                        <InfoBox label="Qty" value={ticket?.quantity || 0} />
                        <InfoBox
                            label="Sold"
                            value={ticket?.soldQuantity || 0}
                        />
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2.5 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        <MdAccessTime
                            className="shrink-0 text-green-500"
                            size={17}
                        />
                        <span className="line-clamp-1">
                            {formatDate(ticket?.departureDate)}
                        </span>
                    </div>

                    {ticket?.perks?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {ticket.perks.slice(0, 3).map((perk) => (
                                <span
                                    key={perk}
                                    className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                >
                                    {perk}
                                </span>
                            ))}
                            {ticket.perks.length > 3 && (
                                <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                    +{ticket.perks.length - 3} more
                                </span>
                            )}
                        </div>
                    )}

                    {isRejected && (
                        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-400">
                            Rejected tickets cannot be updated or deleted.
                        </div>
                    )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    {disableActions ? (
                        <Button
                        variant="none"
                            disabled
                            className="flex h-11  w-auto items-center justify-center gap-2 rounded-2xl bg-zinc-200 font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
                        >
                            <MdOutlineModeEdit size={18} />
                            Update
                        </Button>
                    ) : (
                        <Link
                            href={`/dashboard/vendor/update-ticket/${ticketId}`}
                            className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-zinc-900 font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-zinc-900"
                        >
                            <MdOutlineModeEdit size={18} />
                            Update
                        </Link>
                    )}

                    <Button
                        variant="none"
                        onClick={() => onDelete(ticketId)}
                        disabled={disableActions || deletingId === ticketId}
                        className={`flex h-11 items-center justify-center gap-2 rounded-2xl font-semibold text-white transition w-auto ${
                            disableActions
                                ? "cursor-not-allowed bg-rose-300 dark:bg-rose-900/40"
                                : "bg-rose-500 hover:bg-rose-600"
                        }`}
                    >
                        <MdDeleteOutline size={18} />
                        {deletingId === ticketId ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const InfoBox = ({ label, value }) => {
    return (
        <div className="rounded-xl bg-zinc-50 p-2.5 dark:bg-zinc-800">
            <p className="text-[11px] text-zinc-500">{label}</p>
            <p className="mt-1 text-base font-bold text-zinc-900 dark:text-white">
                {value}
            </p>
        </div>
    );
};

export default MyAddedTicketCard;
