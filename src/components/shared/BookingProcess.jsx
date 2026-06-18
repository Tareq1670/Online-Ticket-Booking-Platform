"use client";

import Image from "next/image";
import {
    BsSearch,
    BsTicketPerforated,
    BsCreditCard2Front,
    BsCheckCircleFill,
} from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";

const STEPS = [
    {
        number: "01",
        icon: BsSearch,
        title: "Search Ticket",
        description:
            "Find your perfect ticket by entering your destination, date, and transport preference.",
        gradient: "from-green-500 to-emerald-600",
        shadowColor: "shadow-green-500/40",
        glowColor: "bg-green-500/30",
        textColor: "text-green-600 dark:text-green-400",
        bgLight: "bg-green-50 dark:bg-green-900/20",
        borderHover: "hover:border-green-500 dark:hover:border-green-500",
    },
    {
        number: "02",
        icon: BsTicketPerforated,
        title: "Select & Book",
        description:
            "Choose from a variety of verified vendors and book your preferred seat instantly.",
        gradient: "from-blue-500 to-cyan-600",
        shadowColor: "shadow-blue-500/40",
        glowColor: "bg-blue-500/30",
        textColor: "text-blue-600 dark:text-blue-400",
        bgLight: "bg-blue-50 dark:bg-blue-900/20",
        borderHover: "hover:border-blue-500 dark:hover:border-blue-500",
    },
    {
        number: "03",
        icon: BsCreditCard2Front,
        title: "Secure Payment",
        description:
            "Complete your booking with our secure Stripe payment gateway in just seconds.",
        gradient: "from-purple-500 to-indigo-600",
        shadowColor: "shadow-purple-500/40",
        glowColor: "bg-purple-500/30",
        textColor: "text-purple-600 dark:text-purple-400",
        bgLight: "bg-purple-50 dark:bg-purple-900/20",
        borderHover: "hover:border-purple-500 dark:hover:border-purple-500",
    },
    {
        number: "04",
        icon: BsCheckCircleFill,
        title: "Enjoy Journey",
        description:
            "Get your e-ticket instantly and embark on your hassle-free travel adventure.",
        gradient: "from-orange-500 to-pink-600",
        shadowColor: "shadow-orange-500/40",
        glowColor: "bg-orange-500/30",
        textColor: "text-orange-600 dark:text-orange-400",
        bgLight: "bg-orange-50 dark:bg-orange-900/20",
        borderHover: "hover:border-orange-500 dark:hover:border-orange-500",
    },
];

const BookingProcess = () => {
    return (
        <section className="py-16 md:py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-br from-green-100/40 to-emerald-100/40 dark:from-green-900/10 dark:to-emerald-900/10 rounded-full blur-3xl" />
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
                        Book Tickets In{" "}
                        <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                            4 Easy Steps
                        </span>
                    </h2>

                    <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        From searching to traveling - we've simplified the
                        entire ticket booking journey for you
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Animated Connecting Line - Desktop Only */}
                    <div className="hidden lg:block absolute top-10 left-0 right-0 px-[12.5%] z-0">
                        <svg
                            className="w-full h-1"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 2"
                        >
                            <line
                                x1="0"
                                y1="1"
                                x2="100"
                                y2="1"
                                stroke="url(#processGradient)"
                                strokeWidth="2"
                                strokeDasharray="3,3"
                                className="animate-pulse"
                            />
                            <defs>
                                <linearGradient
                                    id="processGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="33%" stopColor="#06b6d4" />
                                    <stop offset="66%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#f97316" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-6 relative">
                        {STEPS.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.number}
                                    className="relative group"
                                >
                                    {/* Card */}
                                    <div
                                        className={`relative bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 ${step.borderHover} rounded-2xl p-6 pt-14 hover:shadow-2xl ${step.shadowColor} hover:-translate-y-2 transition-all duration-500 h-full `}
                                    >
                                        {/* Gradient Background on Hover */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none`}
                                        />

                                        {/* Icon Circle (positioned at top center) */}
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20">
                                            <div className="relative">
                                                {/* Glow Effect */}
                                                <div
                                                    className={`absolute inset-0 ${step.glowColor} rounded-full blur-xl scale-110 group-hover:scale-150 transition-all duration-500`}
                                                />

                                                {/* Main Circle */}
                                                <div
                                                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl ${step.shadowColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                                                >
                                                    <Icon
                                                        className="text-white"
                                                        size={32}
                                                    />
                                                </div>

                                                {/* Number Badge */}
                                                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 shadow-lg border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                                    <span
                                                        className={`text-xs font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`}
                                                    >
                                                        {step.number}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="text-center relative z-10">
                                            {/* Step Label */}
                                            <div
                                                className={`inline-block px-3 py-1 rounded-full ${step.bgLight} mb-3`}
                                            >
                                                <span
                                                    className={`text-[10px] font-bold ${step.textColor} uppercase tracking-wider`}
                                                >
                                                    Step {step.number}
                                                </span>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 transition-colors duration-300">
                                                {step.title}
                                            </h3>

                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Decorative Number (Background) */}
                                        <div
                                            className={`absolute -bottom-2 -right-2 text-6xl md:text-7xl font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none select-none leading-none`}
                                        >
                                            {step.number}
                                        </div>

                                        {/* Bottom Indicator Bar */}
                                        <div
                                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-1 bg-gradient-to-r ${step.gradient} rounded-t-full transition-all duration-500`}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="mt-16 md:mt-20 max-w-5xl mx-auto">
                        <div className="relative bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl shadow-green-500/30 overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4 text-white text-center md:text-left">
                                    <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md items-center justify-center shadow-lg flex-shrink-0 border border-white/30">
                                        <HiOutlineSparkles size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black mb-1">
                                            Ready to Start Your Journey?
                                        </h3>
                                        <p className="text-sm md:text-base text-white/90">
                                            Join 500K+ travelers who book with
                                            Ticketix every day
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <div className="flex -space-x-3">
                                        {[10, 11, 12, 13].map((id) => (
                                            <div
                                                key={id}
                                                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-gradient-to-br from-zinc-200 to-zinc-400 overflow-hidden hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                                            >
                                                <Image
                                                    height={100}
                                                    width={100}
                                                    src={`https://i.pravatar.cc/100?img=${id}`}
                                                    alt="user"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-green-600 border-2 border-white flex items-center justify-center text-xs md:text-sm font-black hover:scale-110 hover:z-10 transition-transform cursor-pointer">
                                            +5K
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingProcess;
