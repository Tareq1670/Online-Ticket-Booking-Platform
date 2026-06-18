"use client";

import Image from "next/image";
import Link from "next/link";
import {
    BsArrowRight,
    BsArrowUpRight,
    BsStarFill,
    BsGoogle,
} from "react-icons/bs";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

const SERVICES = [
    {
        icon: FaBus,
        title: "Bus Tickets",
        description:
            "Book AC & Non-AC bus tickets from 200+ trusted operators across Bangladesh.",
        gradient: "from-green-500 to-emerald-600",
        bgLight: "bg-green-50 dark:bg-green-900/20",
        textColor: "text-green-600 dark:text-green-400",
    },
    {
        icon: FaTrain,
        title: "Train Tickets",
        description:
            "Reserve seats on intercity & express trains with real-time availability.",
        gradient: "from-blue-500 to-cyan-600",
        bgLight: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-600 dark:text-blue-400",
    },
    {
        icon: FaPlane,
        title: "Flight Booking",
        description:
            "Domestic & international flights at the best prices guaranteed.",
        gradient: "from-purple-500 to-indigo-600",
        bgLight: "bg-purple-50 dark:bg-purple-900/20",
        textColor: "text-purple-600 dark:text-purple-400",
    },
    {
        icon: FaShip,
        title: "Launch Tickets",
        description:
            "Cabin & deck tickets for river routes including Dhaka-Barisal.",
        gradient: "from-teal-500 to-cyan-600",
        bgLight: "bg-teal-50 dark:bg-teal-900/20",
        textColor: "text-teal-600 dark:text-teal-400",
    },
];

const ProfessionalServices = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-white via-emerald-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-72 h-72 bg-green-200/30 dark:bg-green-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-200/25 dark:bg-emerald-900/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16  mx-auto items-center">
                    {/* LEFT SIDE - Image with Badges */}
                    <div className="relative h-[500px] md:h-[600px] order-2 lg:order-1">
                        {/* Background Decorative Shape */}
                        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl opacity-20 blur-2xl" />
                        <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full opacity-20 blur-2xl" />

                        {/* Main Image Container */}
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-green-500/20 group">
                            <Image
                                src="https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=800&h=900&fit=crop"
                                alt="Professional Travel Service"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Grid Pattern Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                        </div>

                        {/* Google Rating Badge - Top Left */}
                        <div className="absolute top-6 left-6 z-20 animate-in fade-in slide-in-from-left-4 duration-700">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 hover:scale-105 transition-transform">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="text-3xl font-black text-zinc-800 dark:text-zinc-100">
                                            4.9
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <BsStarFill
                                                        key={i}
                                                        className="text-yellow-400"
                                                        size={10}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <BsGoogle
                                                    size={10}
                                                    className="text-zinc-600 dark:text-zinc-400"
                                                />
                                                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                                                    Google
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
                                        From 10K+ Reviews
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Visit Site Button - Bottom Left */}
                        <Link
                            href="/all-tickets"
                            className="absolute bottom-6 left-6 z-20 group"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-full px-5 py-3 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 hover:scale-105 hover:shadow-green-500/30 transition-all">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                    <BsArrowUpRight
                                        className="text-white"
                                        size={14}
                                    />
                                </div>
                                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                                    Browse Tickets
                                </span>
                            </div>
                        </Link>

                        {/* Search Icon - Bottom Right */}
                        <div className="absolute bottom-6 right-6 z-20">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all cursor-pointer group">
                                <HiOutlineSparkles
                                    className="text-green-500 group-hover:text-emerald-600 transition-colors"
                                    size={22}
                                />
                            </div>
                        </div>

                        {/* Floating Stats Card - Top Right */}
                        <div className="absolute top-6 right-6 z-20">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl px-4 py-3 shadow-2xl shadow-green-500/40 hover:scale-105 transition-transform">
                                <div className="flex items-center gap-2 text-white">
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    <span className="text-xs font-bold">
                                        500K+ Bookings
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Content */}
                    <div className="space-y-6 order-1 lg:order-2">
                        

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-800 dark:text-zinc-100 leading-tight tracking-tight">
                            Professional Service
                            <br />
                            Ready For Your{" "}
                            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                                Journey
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Whether you're traveling for business or pleasure,
                            we've got you covered with the most reliable and
                            affordable ticket booking platform in Bangladesh.
                            Choose your preferred mode of transport below.
                        </p>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {SERVICES.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <div
                                        key={service.title}
                                        className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden"
                                    >
                                        {/* Hover Background */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500`}
                                        />

                                        {/* Icon */}
                                        <div
                                            className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                                        >
                                            <Icon
                                                className="text-white"
                                                size={20}
                                            />
                                        </div>

                                        {/* Content */}
                                        <h3 className="relative text-base md:text-lg font-black text-zinc-800 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                            {service.title}
                                            <BsArrowRight
                                                className={`${service.textColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}
                                                size={14}
                                            />
                                        </h3>

                                        <p className="relative text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Bottom Indicator */}
                                        <div
                                            className={`absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r ${service.gradient} transition-all duration-500`}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link
                                href="/all-tickets"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-7 py-3.5 rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 active:scale-95 transition-all"
                            >
                                Explore All Services
                                <span className="w-7 h-7 rounded-full bg-white text-green-600 flex items-center justify-center group-hover:rotate-45 transition-transform">
                                    <BsArrowRight size={14} />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalServices;
