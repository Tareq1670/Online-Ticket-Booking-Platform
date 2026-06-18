"use client";

import Image from "next/image";
import Link from "next/link";
import {
    BsArrowRight,
    BsPlayCircleFill,
    BsCheckCircleFill,
    BsTicketPerforated,
} from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaBus, FaPlane } from "react-icons/fa";

const FEATURES = [
    "100% Verified Vendors & Tickets",
    "Secure Payment via Stripe",
    "24/7 Customer Support",
    "Best Price Guarantee",
];

const AboutTicketix = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-zinc-50 via-white to-emerald-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 bg-green-200/30 dark:bg-green-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-200/25 dark:bg-emerald-900/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Floating Decorative Icons */}
            <div className="absolute top-10 right-10 text-green-300/30 dark:text-green-700/20 animate-bounce duration-[3000ms] hidden md:block">
                <BsTicketPerforated size={60} />
            </div>
            <div className="absolute bottom-20 right-1/3 text-emerald-300/20 dark:text-emerald-700/15 animate-bounce delay-700 duration-[4000ms] hidden md:block">
                <FaPlane size={45} className="rotate-45" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mx-auto items-center">
                    {/* LEFT SIDE - Content */}
                    <div className="space-y-6 order-2 lg:order-1">
                       

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-800 dark:text-zinc-100 leading-tight tracking-tight">
                            Crafting Excellence
                            <br />
                            in Every{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                                    Journey
                                </span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 200 8"
                                    fill="none"
                                >
                                    <path
                                        d="M2 5.5C50 2 100 2 198 5.5"
                                        stroke="url(#underline)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="underline"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="0%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#10b981"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#059669"
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            At{" "}
                            <span className="font-bold text-green-600 dark:text-green-400">
                                Ticketix
                            </span>
                            , we believe travel should be simple, secure, and
                            seamless. We connect millions of travelers with
                            verified vendors across Bangladesh, offering the
                            best prices on bus, train, plane, and launch
                            tickets — all in one place.
                        </p>

                        {/* Features List */}
                        <div className="space-y-3 pt-2">
                            {FEATURES.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                                        <BsCheckCircleFill
                                            className="text-white"
                                            size={14}
                                        />
                                    </div>
                                    <span className="text-sm md:text-base font-semibold text-zinc-700 dark:text-zinc-300">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 active:scale-95 transition-all"
                            >
                                Learn More
                                <span className="w-7 h-7 rounded-full bg-white text-green-600 flex items-center justify-center">
                                    <BsArrowRight size={14} />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Images & Cards */}
                    <div className="relative order-1 lg:order-2 h-[500px] md:h-[600px]">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl" />

                        {/* Top Image */}
                        <div className="absolute top-0 right-0 w-[65%] h-[55%] rounded-3xl overflow-hidden shadow-2xl shadow-green-500/20 group">
                            <Image
                                src="https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=800"
                                alt="Travel Bus"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                            {/* Floating Badge on Image */}
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-xl flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-zinc-800">
                                    Live Tracking
                                </span>
                            </div>
                        </div>

                        {/* Bottom Left Image */}
                        <div className="absolute bottom-0 left-0 w-[55%] h-[45%] rounded-3xl overflow-hidden shadow-2xl shadow-green-500/20 group border-4 border-white dark:border-zinc-900">
                            <Image
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
                                alt="Travel Destination"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Stats Card - Floating Top Left */}
                        <div className="absolute top-[35%] left-0 z-20">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-5 md:p-6 shadow-2xl shadow-green-500/40 border-4 border-white dark:border-zinc-900 hover:scale-105 transition-transform duration-300 group">
                                <div className="text-white">
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-4xl md:text-5xl font-black">
                                            10
                                        </span>
                                        <span className="text-2xl md:text-3xl font-black">
                                            K+
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm font-bold opacity-90">
                                        Happy
                                        <br />
                                        Travelers
                                    </p>

                                    {/* Mini avatars */}
                                    <div className="flex -space-x-2 mt-3">
                                        {[15, 16, 17].map((id) => (
                                            <div
                                                key={id}
                                                className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-zinc-200"
                                            >
                                                <Image
                                                    src={`https://i.pravatar.cc/100?img=${id}`}
                                                    alt="user"
                                                    width={28}
                                                    height={28}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                        <div className="w-7 h-7 rounded-full bg-white text-green-600 border-2 border-white flex items-center justify-center text-[10px] font-black">
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mission Card - Floating Bottom Right */}
                        <div className="absolute bottom-[5%] right-0 z-20 w-[55%] md:w-[50%]">
                            <div className="bg-zinc-900 dark:bg-zinc-800 rounded-3xl p-5 md:p-6 shadow-2xl border-4 border-white dark:border-zinc-900 hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                                {/* Decorative Pattern */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />

                                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mb-4 relative z-10">
                                    Empowering travelers with seamless booking
                                    experiences and unmatched convenience.
                                </p>

                                <div className="flex items-center justify-between gap-3 relative z-10">
                                    <div>
                                        <h4 className="text-base md:text-lg font-black text-white">
                                            Our Mission
                                        </h4>
                                    </div>
                                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/40 hover:scale-110 active:scale-95 transition-all group">
                                        <BsPlayCircleFill
                                            className="text-white group-hover:scale-110 transition-transform"
                                            size={24}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Bus Icon - Top Right */}
                        <div className="absolute top-2 right-2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white dark:bg-zinc-900 shadow-2xl flex items-center justify-center z-30 group hover:scale-110 transition-transform border-2 border-green-200 dark:border-green-800">
                            <FaBus
                                className="text-green-500 group-hover:rotate-12 transition-transform"
                                size={24}
                            />
                        </div>

                        {/* Decorative Ticket Icon - Bottom Left */}
                        <div className="absolute bottom-[35%] left-[40%] w-12 h-12 rounded-full bg-orange-500 shadow-2xl shadow-orange-500/40 flex items-center justify-center z-30 hover:scale-110 hover:rotate-12 transition-all">
                            <BsTicketPerforated
                                className="text-white"
                                size={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTicketix;