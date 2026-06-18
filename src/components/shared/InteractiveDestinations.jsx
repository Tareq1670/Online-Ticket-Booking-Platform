"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import SectionHeader from "@/components/shared/SectionHeader";
import {
    BsGeoAltFill,
    BsArrowRight,
    BsStarFill,
    BsCompass,
    BsAirplane,
} from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaMapMarkedAlt } from "react-icons/fa";

const DESTINATIONS = [
    {
        id: 1,
        name: "Cox's Bazar",
        tagline: "World's Longest Beach",
        image: "https://images.unsplash.com/photo-1591017403286-fd8493524e1d?w=800",
        rating: 4.9,
        ticketsFrom: 850,
        position: { top: "78%", left: "62%" },
        attractions: ["Beach", "Sunset", "Seafood"],
        reviews: "12.5K",
        bestTime: "Nov - Feb",
        gradient: "from-orange-500 to-pink-600",
    },
    {
        id: 2,
        name: "Sundarbans",
        tagline: "Mangrove Forest",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
        rating: 4.8,
        ticketsFrom: 1200,
        position: { top: "70%", left: "32%" },
        attractions: ["Wildlife", "Royal Bengal Tiger", "Boating"],
        reviews: "8.3K",
        bestTime: "Oct - Mar",
        gradient: "from-green-600 to-teal-700",
    },
    {
        id: 3,
        name: "Sylhet",
        tagline: "Tea Garden Paradise",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        rating: 4.7,
        ticketsFrom: 650,
        position: { top: "22%", left: "75%" },
        attractions: ["Tea Gardens", "Hills", "Waterfalls"],
        reviews: "15.7K",
        bestTime: "Mar - Aug",
        gradient: "from-emerald-500 to-green-700",
    },
    {
        id: 4,
        name: "Bandarban",
        tagline: "Hill Tracts Beauty",
        image: "https://images.unsplash.com/photo-1601999974712-9a4ee219b1bb?w=800",
        rating: 4.8,
        ticketsFrom: 950,
        position: { top: "60%", left: "78%" },
        attractions: ["Mountains", "Tribes", "Adventure"],
        reviews: "9.1K",
        bestTime: "Nov - Feb",
        gradient: "from-purple-500 to-indigo-700",
    },
    {
        id: 5,
        name: "Sajek Valley",
        tagline: "Queen of Hills",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        rating: 4.9,
        ticketsFrom: 1100,
        position: { top: "48%", left: "82%" },
        attractions: ["Clouds", "Hills", "Tribal Culture"],
        reviews: "11.2K",
        bestTime: "Oct - Feb",
        gradient: "from-blue-500 to-cyan-700",
    },
];

const InteractiveDestinations = () => {
    const [activeDest, setActiveDest] = useState(DESTINATIONS[0]);
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-green-300/20 dark:bg-green-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-300/15 dark:bg-emerald-900/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <SectionHeader
                    badge="🗺️ Explore Bangladesh"
                    title="Discover"
                    highlight="Amazing Places"
                    description="Tap on any destination pin to explore the most beautiful spots in Bangladesh"
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8  mx-auto items-stretch">
                    {/* Map Side - Takes 3 columns */}
                    <div className="lg:col-span-3 relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-2xl" />

                        <Card
                            radius="lg"
                            className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-zinc-900 dark:via-emerald-950/30 dark:to-zinc-900 border-2 border-green-200/50 dark:border-green-800/30 aspect-square overflow-hidden shadow-2xl shadow-green-500/10"
                        >
                            <div className="absolute inset-0">
                                {/* Topographic Map Pattern */}
                                <svg
                                    className="absolute inset-0 w-full h-full opacity-30"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <pattern
                                            id="topo"
                                            x="0"
                                            y="0"
                                            width="60"
                                            height="60"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <circle
                                                cx="30"
                                                cy="30"
                                                r="20"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="0.5"
                                                className="text-green-400 dark:text-green-700"
                                            />
                                            <circle
                                                cx="30"
                                                cy="30"
                                                r="10"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="0.5"
                                                className="text-green-400 dark:text-green-700"
                                            />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#topo)" />
                                </svg>

                                {/* Grid Pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

                                {/* Bangladesh Country Shape */}
                                <div className="absolute inset-6 md:inset-10">
                                    <div className="relative w-full h-full">
                                        {/* Country Outline */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-200/60 via-emerald-200/50 to-teal-200/40 dark:from-green-800/30 dark:via-emerald-800/25 dark:to-teal-800/20 rounded-[40%_30%_50%_25%/30%_40%_35%_45%] border-2 border-green-400/60 dark:border-green-600/50 shadow-2xl shadow-green-500/20 backdrop-blur-sm" />

                                        {/* Country Label */}
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
                                            <Chip
                                                startContent={
                                                    <FaMapMarkedAlt
                                                        size={14}
                                                        className="text-green-600"
                                                    />
                                                }
                                                classNames={{
                                                    base: "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-xl h-9 px-3",
                                                    content:
                                                        "text-sm font-black text-green-700 dark:text-green-400",
                                                }}
                                            >
                                                🇧🇩 Bangladesh
                                            </Chip>
                                        </div>

                                        {/* Compass */}
                                        <div className="absolute top-4 right-4 z-30 w-12 h-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center border-2 border-green-200 dark:border-green-800">
                                            <BsCompass
                                                className="text-green-600 dark:text-green-400 animate-spin"
                                                size={22}
                                                style={{ animationDuration: "8s" }}
                                            />
                                        </div>

                                        {/* Flying Plane Animation */}
                                        <div
                                            className="absolute z-30 animate-bounce"
                                            style={{
                                                top: "15%",
                                                left: "20%",
                                                animationDuration: "3s",
                                            }}
                                        >
                                            <BsAirplane
                                                className="text-green-600 dark:text-green-400 rotate-45"
                                                size={20}
                                            />
                                        </div>

                                        {/* Destination Pins */}
                                        {DESTINATIONS.map((dest) => {
                                            const isActive = activeDest.id === dest.id;
                                            const isHovered = hoveredId === dest.id;
                                            return (
                                                <button
                                                    key={dest.id}
                                                    onClick={() => setActiveDest(dest)}
                                                    onMouseEnter={() =>
                                                        setHoveredId(dest.id)
                                                    }
                                                    onMouseLeave={() => setHoveredId(null)}
                                                    style={{
                                                        top: dest.position.top,
                                                        left: dest.position.left,
                                                    }}
                                                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                                                >
                                                    <div
                                                        className={`relative transition-all duration-500 ${
                                                            isActive
                                                                ? "scale-125 z-30"
                                                                : isHovered
                                                                  ? "scale-110 z-25"
                                                                  : "scale-100 z-20"
                                                        }`}
                                                    >
                                                        {/* Pulse Animation */}
                                                        {isActive && (
                                                            <>
                                                                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                                                                <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse" />
                                                            </>
                                                        )}

                                                        {/* Pin Shadow */}
                                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 dark:bg-black/40 rounded-full blur-md" />

                                                        {/* Pin Body */}
                                                        <div
                                                            className={`relative w-12 h-12 rounded-full ${
                                                                isActive
                                                                    ? `bg-gradient-to-br ${dest.gradient} shadow-2xl`
                                                                    : "bg-white dark:bg-zinc-900 shadow-xl group-hover:bg-green-50 dark:group-hover:bg-green-900/30"
                                                            } flex items-center justify-center border-[3px] ${
                                                                isActive
                                                                    ? "border-white"
                                                                    : "border-green-500 dark:border-green-400"
                                                            } transition-all duration-300`}
                                                        >
                                                            <BsGeoAltFill
                                                                className={
                                                                    isActive
                                                                        ? "text-white"
                                                                        : "text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform"
                                                                }
                                                                size={20}
                                                            />
                                                        </div>

                                                        {/* Pin Tooltip */}
                                                        <div
                                                            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap transition-all duration-300 ${
                                                                isActive || isHovered
                                                                    ? "opacity-100 translate-y-0"
                                                                    : "opacity-0 -translate-y-2 pointer-events-none"
                                                            }`}
                                                        >
                                                            <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg shadow-2xl">
                                                                <p className="text-xs font-black">
                                                                    {dest.name}
                                                                </p>
                                                                <p className="text-[10px] opacity-80">
                                                                    From ৳{dest.ticketsFrom}
                                                                </p>
                                                            </div>
                                                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-white rotate-45" />
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}

                                        {/* Connection Lines (Decorative) */}
                                        <svg
                                            className="absolute inset-0 w-full h-full pointer-events-none z-10"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="lineGrad"
                                                    x1="0%"
                                                    y1="0%"
                                                    x2="100%"
                                                    y2="100%"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="#10b981"
                                                        stopOpacity="0.3"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#14b8a6"
                                                        stopOpacity="0.1"
                                                    />
                                                </linearGradient>
                                            </defs>
                                            {DESTINATIONS.slice(0, -1).map((dest, i) => {
                                                const next = DESTINATIONS[i + 1];
                                                return (
                                                    <line
                                                        key={i}
                                                        x1={dest.position.left}
                                                        y1={dest.position.top}
                                                        x2={next.position.left}
                                                        y2={next.position.top}
                                                        stroke="url(#lineGrad)"
                                                        strokeWidth="2"
                                                        strokeDasharray="4,4"
                                                        className="animate-pulse"
                                                    />
                                                );
                                            })}
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Map Stats */}
                            <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl p-3 shadow-xl">
                                <div className="text-center">
                                    <p className="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                                        {DESTINATIONS.length}
                                    </p>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                        Destinations
                                    </p>
                                </div>
                                <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-700" />
                                <div className="text-center">
                                    <p className="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                                        50+
                                    </p>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                        Routes
                                    </p>
                                </div>
                                <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-700" />
                                <div className="text-center">
                                    <p className="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                                        24/7
                                    </p>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                        Available
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Details Side - Takes 2 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/* Main Destination Card */}
                        <Card
                            radius="lg"
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl shadow-green-500/10 flex-1"
                        >
                            <div className="p-0 h-full flex flex-col">
                                {/* Image Section */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={activeDest.image}
                                        alt={activeDest.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                        priority
                                        key={activeDest.id}
                                    />

                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${activeDest.gradient} opacity-40 mix-blend-multiply z-10`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                                    {/* Top Badges */}
                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                                        <Chip
                                            startContent={
                                                <HiOutlineSparkles
                                                    size={12}
                                                    className="text-yellow-300"
                                                />
                                            }
                                            classNames={{
                                                base: "bg-white/20 backdrop-blur-md border border-white/30 h-7",
                                                content: "text-xs font-bold text-white",
                                            }}
                                        >
                                            Featured
                                        </Chip>

                                        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 flex items-center gap-1.5">
                                            <BsStarFill
                                                className="text-yellow-400"
                                                size={12}
                                            />
                                            <span className="text-xs font-black text-white">
                                                {activeDest.rating}
                                            </span>
                                            <span className="text-[10px] text-white/80">
                                                ({activeDest.reviews})
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                                        <p className="text-sm font-medium opacity-90 mb-1 drop-shadow-lg">
                                            {activeDest.tagline}
                                        </p>
                                        <h3 className="text-3xl font-black drop-shadow-2xl">
                                            {activeDest.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 flex-1 flex flex-col">
                                    {/* Price & Best Time */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-3 border border-green-200/50 dark:border-green-800/30">
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                                                Starting From
                                            </p>
                                            <p className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                                                ৳{activeDest.ticketsFrom}
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-3 border border-orange-200/50 dark:border-orange-800/30">
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                                                Best Time
                                            </p>
                                            <p className="text-sm font-black text-orange-700 dark:text-orange-400">
                                                {activeDest.bestTime}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Attractions */}
                                    <div className="mb-4 flex-1">
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                            Top Attractions
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {activeDest.attractions.map((attr) => (
                                                <Chip
                                                    key={attr}
                                                    variant="flat"
                                                    classNames={{
                                                        base: "bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/30",
                                                        content:
                                                            "text-xs font-bold text-green-700 dark:text-green-400",
                                                    }}
                                                >
                                                    {attr}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        as={Link}
                                        href={`/all-tickets?to=${activeDest.name}`}
                                        fullWidth
                                        size="lg"
                                        radius="lg"
                                        endContent={<BsArrowRight />}
                                        className={`bg-gradient-to-r ${activeDest.gradient} text-white font-bold shadow-lg hover:shadow-2xl transition-all`}
                                    >
                                        Explore {activeDest.name}
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Stats Card */}
                        <Card
                            radius="lg"
                            className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 overflow-hidden shadow-xl shadow-green-500/30 p-5"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-white">
                                    <p className="text-xs font-medium opacity-90 mb-1">
                                        Total Bookings
                                    </p>
                                    <p className="text-2xl font-black">847K+</p>
                                    <p className="text-[10px] opacity-80 mt-1">
                                        Across all destinations
                                    </p>
                                </div>
                                <div className="text-white">
                                    <p className="text-xs font-medium opacity-90 mb-1">
                                        Top Choice
                                    </p>
                                    <p className="text-2xl font-black">
                                        {activeDest.name}
                                    </p>
                                    <p className="text-[10px] opacity-80 mt-1">
                                        ⭐ {activeDest.rating} Rating
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Quick Access Pills */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {DESTINATIONS.map((dest) => (
                        <button
                            key={dest.id}
                            onClick={() => setActiveDest(dest)}
                            className={`group px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                                activeDest.id === dest.id
                                    ? `bg-gradient-to-r ${dest.gradient} text-white shadow-xl scale-105`
                                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-green-400 dark:hover:border-green-500 hover:scale-105"
                            }`}
                        >
                            <span className="flex items-center gap-1.5">
                                <BsGeoAltFill size={12} />
                                {dest.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InteractiveDestinations;