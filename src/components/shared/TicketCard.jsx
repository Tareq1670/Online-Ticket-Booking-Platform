"use client";

import Link from "next/link";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Image,
    Chip,
    Divider,
} from "@heroui/react";
import { BsGeoAltFill, BsArrowRight, BsCalendarEvent } from "react-icons/bs";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi2";

const TRANSPORT_ICONS = {
    bus: FaBus,
    train: FaTrain,
    plane: FaPlane,
    launch: FaShip,
};

const TicketCard = ({ ticket }) => {
    const Icon =
        TRANSPORT_ICONS[ticket?.transportType?.toLowerCase()] ||
        HiOutlineTicket;

    return (
        <Card
            isPressable
            className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-500"
            radius="lg"
        >
            <CardBody className="p-0 overflow-hidden">
                <div className="relative">
                    <Image
                        src={
                            ticket?.image ||
                            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600"
                        }
                        alt={ticket?.title}
                        radius="none"
                        removeWrapper
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 z-0"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

                    <Chip
                        startContent={<Icon size={12} />}
                        size="sm"
                        radius="full"
                        classNames={{
                            base: "absolute top-3 left-3 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg",
                            content:
                                "text-xs font-bold text-zinc-800 dark:text-zinc-200 capitalize",
                        }}
                    >
                        {ticket?.transportType}
                    </Chip>

                    <Chip
                        size="sm"
                        radius="full"
                        classNames={{
                            base: "absolute top-3 right-3 z-20 bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg",
                            content: "text-xs font-bold text-white",
                        }}
                    >
                        ৳{ticket?.price}
                    </Chip>

                    <div className="absolute bottom-3 left-3 right-3 z-20">
                        <h3 className="text-white font-bold text-lg line-clamp-1 drop-shadow-lg">
                            {ticket?.title}
                        </h3>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex-1">
                            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                                From
                            </p>
                            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                                <BsGeoAltFill className="text-green-500" size={12} />
                                {ticket?.from}
                            </p>
                        </div>
                        <BsArrowRight className="text-zinc-300 dark:text-zinc-600" />
                        <div className="flex-1 text-right">
                            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                                To
                            </p>
                            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-end gap-1">
                                <BsGeoAltFill className="text-emerald-500" size={12} />
                                {ticket?.to}
                            </p>
                        </div>
                    </div>

                    <Divider className="my-3" />

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <BsCalendarEvent className="text-zinc-400" size={14} />
                            <div>
                                <p className="text-[10px] text-zinc-400 font-medium">
                                    Departure
                                </p>
                                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                    {ticket?.departureDate
                                        ? new Date(ticket.departureDate).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineTicket className="text-zinc-400" size={14} />
                            <div>
                                <p className="text-[10px] text-zinc-400 font-medium">
                                    Available
                                </p>
                                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                    {ticket?.quantity || 0} Seats
                                </p>
                            </div>
                        </div>
                    </div>

                    {ticket?.perks?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {ticket.perks.slice(0, 3).map((perk) => (
                                <Chip
                                    key={perk}
                                    size="sm"
                                    variant="flat"
                                    classNames={{
                                        base: "bg-green-50 dark:bg-green-900/20 h-6",
                                        content:
                                            "text-[10px] font-semibold text-green-700 dark:text-green-400",
                                    }}
                                >
                                    {perk}
                                </Chip>
                            ))}
                        </div>
                    )}
                </div>
            </CardBody>

            <CardFooter className="px-5 pb-5 pt-0">
                <Button
                    as={Link}
                    href={`/tickets/${ticket?._id || "demo"}`}
                    fullWidth
                    radius="lg"
                    endContent={<BsArrowRight size={16} />}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
                >
                    See Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TicketCard;