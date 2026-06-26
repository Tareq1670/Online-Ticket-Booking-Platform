"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 280, damping: 26 },
    },
};

const NotFoundPage = () => {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-8 sm:px-6 sm:py-10 lg:py-12 dark:from-[#0a0f0d] dark:via-[#06100b] dark:to-[#0a0f0d]">

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.3, 0.15],
                    x: [0, 30, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-20 top-10 h-[280px] w-[280px] rounded-full bg-emerald-200/40 blur-[80px] sm:-left-32 sm:h-[400px] sm:w-[400px] sm:blur-[100px] lg:h-[500px] lg:w-[500px] lg:blur-[120px] dark:bg-emerald-900/20"
            />
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.15, 0.28, 0.15],
                    x: [0, -30, 0],
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="pointer-events-none absolute -right-20 bottom-10 h-[280px] w-[280px] rounded-full bg-lime-200/40 blur-[80px] sm:-right-32 sm:h-[400px] sm:w-[400px] sm:blur-[100px] lg:h-[500px] lg:w-[500px] lg:blur-[120px] dark:bg-teal-900/20"
            />

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="pointer-events-none absolute hidden h-1.5 w-1.5 rounded-full bg-emerald-400/60 sm:block sm:h-2 sm:w-2 dark:bg-emerald-500/40"
                    style={{
                        top: `${15 + i * 12}%`,
                        left: `${10 + (i % 2) * 80}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                    }}
                />
            ))}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
            >
                <div className="relative mb-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex items-center justify-center gap-0"
                    >
                        <motion.span
                            initial={{ x: -60, opacity: 0, rotate: -10 }}
                            animate={{ x: 0, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.3 }}
                            className="select-none text-[110px] font-black leading-none tracking-tighter text-gray-200 drop-shadow-[0_4px_20px_rgba(16,185,129,0.1)] xs:text-[130px] sm:text-[180px] md:text-[240px] lg:text-[300px] dark:text-gray-800"
                            style={{
                                fontFamily: "'Inter', system-ui, sans-serif",
                                WebkitTextStroke: "1px rgba(16,185,129,0.05)",
                            }}
                        >
                            4
                        </motion.span>

                        <motion.span
                            initial={{ y: -80, opacity: 0, scale: 0.5 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.4 }}
                            className="select-none text-[110px] font-black leading-none tracking-tighter text-gray-200 drop-shadow-[0_4px_20px_rgba(16,185,129,0.1)] xs:text-[130px] sm:text-[180px] md:text-[240px] lg:text-[300px] dark:text-gray-800"
                            style={{
                                fontFamily: "'Inter', system-ui, sans-serif",
                                WebkitTextStroke: "1px rgba(16,185,129,0.05)",
                            }}
                        >
                            0
                        </motion.span>

                        <motion.span
                            initial={{ x: 60, opacity: 0, rotate: 10 }}
                            animate={{ x: 0, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.5 }}
                            className="select-none text-[110px] font-black leading-none tracking-tighter text-gray-200 drop-shadow-[0_4px_20px_rgba(16,185,129,0.1)] xs:text-[130px] sm:text-[180px] md:text-[240px] lg:text-[300px] dark:text-gray-800"
                            style={{
                                fontFamily: "'Inter', system-ui, sans-serif",
                                WebkitTextStroke: "1px rgba(16,185,129,0.05)",
                            }}
                        >
                            4
                        </motion.span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.9 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <DetectiveSVG />
                        </motion.div>
                    </motion.div>
                </div>

                <motion.h1
                    variants={itemVariants}
                    className="mt-4 bg-gradient-to-b from-gray-800 to-gray-600 bg-clip-text text-4xl font-black tracking-tight text-transparent xs:text-5xl sm:mt-6 sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-gray-400"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                    OOPS!
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="mt-4 flex flex-col items-center gap-1.5 sm:mt-6"
                >
                    <p className="max-w-xs px-2 text-sm leading-relaxed text-gray-500 sm:max-w-md sm:text-base md:text-lg dark:text-gray-400">
                        The page you requested could not be found. Our detective is on the case!
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:mt-10 sm:max-w-md sm:flex-row sm:justify-center"
                >
                    <Link href="/" className="group block w-full sm:flex-1">
                        <motion.div
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="relative inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 sm:gap-2.5 sm:px-6"
                        >
                            <FiHome className="text-base transition-transform group-hover:-translate-x-0.5" />
                            Back to Home
                            <motion.span
                                className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.div>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => typeof window !== "undefined" && window.history.back()}
                        className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 sm:flex-1 sm:gap-2.5 sm:px-6 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300"
                    >
                        <FiArrowLeft className="text-base" />
                        Go Back
                    </motion.button>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-xs text-gray-400 sm:mt-8 dark:text-gray-500"
                >
                    <FiSearch className="h-3.5 w-3.5" />
                    <span>Lost your way?</span>
                    <Link
                        href="/"
                        className="font-bold text-emerald-600 underline decoration-emerald-300 decoration-2 underline-offset-4 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                        Search Ticketix
                    </Link>
                    <span>or</span>
                    <Link
                        href="/"
                        className="font-bold text-emerald-600 underline decoration-emerald-300 decoration-2 underline-offset-4 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                        contact support
                    </Link>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:mt-12 sm:text-xs sm:tracking-[0.25em] dark:text-gray-600"
                >
                    <FaTicketAlt className="h-3 w-3 text-emerald-500 sm:h-3.5 sm:w-3.5" />
                    <span>Ticketix Platform</span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="font-mono">v2.0</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

const DetectiveSVG = () => {
    return (
        <svg
            viewBox="0 0 200 280"
            className="h-[100px] w-auto drop-shadow-2xl xs:h-[120px] sm:h-[165px] md:h-[220px] lg:h-[275px]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
        >
            <ellipse cx="100" cy="270" rx="50" ry="6" fill="rgba(0,0,0,0.15)" />

            <path
                d="M 70 130 Q 70 120 80 118 L 120 118 Q 130 120 130 130 L 135 240 Q 135 250 125 250 L 75 250 Q 65 250 65 240 Z"
                fill="#1f2937"
            />

            <rect x="68" y="175" width="64" height="6" fill="#0f172a" />
            <rect x="95" y="172" width="10" height="12" fill="#facc15" rx="1" />

            <circle cx="100" cy="155" r="2" fill="#0f172a" />
            <circle cx="100" cy="200" r="2" fill="#0f172a" />
            <circle cx="100" cy="225" r="2" fill="#0f172a" />

            <rect x="82" y="245" width="12" height="22" fill="#1f2937" rx="2" />
            <rect x="106" y="245" width="12" height="22" fill="#1f2937" rx="2" />

            <ellipse cx="88" cy="268" rx="9" ry="3" fill="#0f172a" />
            <ellipse cx="112" cy="268" rx="9" ry="3" fill="#0f172a" />

            <path
                d="M 70 135 Q 60 145 58 165 Q 56 185 62 200 L 72 198 Q 68 180 70 165 Q 72 150 78 142 Z"
                fill="#1f2937"
            />

            <path
                d="M 130 135 Q 145 130 158 120 Q 168 115 172 108 L 165 100 Q 158 108 148 115 Q 138 122 128 125 Z"
                fill="#1f2937"
            />

            <circle cx="168" cy="105" r="5" fill="#f4c2a1" />

            <rect
                x="158"
                y="98"
                width="18"
                height="5"
                rx="2"
                fill="#0f172a"
                transform="rotate(-30 167 100)"
            />

            <circle
                cx="142"
                cy="78"
                r="22"
                fill="none"
                stroke="#0f172a"
                strokeWidth="5"
            />

            <circle cx="142" cy="78" r="18" fill="rgba(220, 38, 38, 0.15)" />
            <circle cx="142" cy="78" r="18" fill="url(#glassGradient)" opacity="0.6" />

            <ellipse
                cx="135"
                cy="72"
                rx="6"
                ry="4"
                fill="white"
                opacity="0.7"
                transform="rotate(-30 135 72)"
            />

            <circle cx="100" cy="90" r="22" fill="#f4c2a1" />

            <path
                d="M 78 85 Q 100 95 122 85 L 122 78 L 78 78 Z"
                fill="#d4a584"
                opacity="0.4"
            />

            <circle cx="93" cy="92" r="1.8" fill="#1f2937" />
            <circle cx="107" cy="92" r="1.8" fill="#1f2937" />

            <path
                d="M 100 95 Q 99 100 100 103 Q 102 102 102 99 Z"
                fill="#d4a584"
                opacity="0.5"
            />

            <path
                d="M 95 105 Q 100 108 105 105"
                stroke="#1f2937"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
            />

            <ellipse cx="100" cy="68" rx="18" ry="10" fill="#0f172a" />
            <rect x="82" y="60" width="36" height="14" rx="2" fill="#0f172a" />

            <ellipse cx="100" cy="74" rx="28" ry="5" fill="#0f172a" />

            <rect x="82" y="70" width="36" height="3" fill="#1f2937" />

            <defs>
                <radialGradient id="glassGradient" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="white" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default NotFoundPage;