"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiHome,
    FiRefreshCw,
    FiAlertTriangle,
    FiMail,
    FiShield,
} from "react-icons/fi";
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

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Application Error:", error);
    }, [error]);

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-8 sm:px-6 sm:py-10 lg:py-12 dark:from-[#0a0f0d] dark:via-[#06100b] dark:to-[#0a0f0d]">

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.3, 0.15],
                    x: [0, 30, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-20 top-10 h-[280px] w-[280px] rounded-full bg-rose-200/40 blur-[80px] sm:-left-32 sm:h-[400px] sm:w-[400px] sm:blur-[100px] lg:h-[500px] lg:w-[500px] lg:blur-[120px] dark:bg-rose-900/20"
            />
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.15, 0.28, 0.15],
                    x: [0, -30, 0],
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="pointer-events-none absolute -right-20 bottom-10 h-[280px] w-[280px] rounded-full bg-amber-200/40 blur-[80px] sm:-right-32 sm:h-[400px] sm:w-[400px] sm:blur-[100px] lg:h-[500px] lg:w-[500px] lg:blur-[120px] dark:bg-amber-900/20"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.22, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/30 blur-[100px] dark:bg-orange-900/15"
            />

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(to right, #f43f5e 1px, transparent 1px), linear-gradient(to bottom, #f43f5e 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="pointer-events-none absolute hidden h-1.5 w-1.5 rounded-full bg-rose-400/60 sm:block sm:h-2 sm:w-2 dark:bg-rose-500/40"
                    style={{
                        top: `${10 + i * 10}%`,
                        left: `${5 + (i % 3) * 45}%`,
                    }}
                    animate={{
                        y: [0, -25, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + i * 0.4,
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
                className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.3 }}
                    className="relative mb-8 flex items-center justify-center sm:mb-10"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute h-44 w-44 rounded-full border-2 border-dashed border-rose-300/50 sm:h-52 sm:w-52 dark:border-rose-700/40"
                    />

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute h-56 w-56 rounded-full border border-dotted border-amber-300/40 sm:h-64 sm:w-64 dark:border-amber-700/30"
                    />

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute h-44 w-44 sm:h-52 sm:w-52"
                    >
                        {[0, 90, 180, 270].map((deg, i) => (
                            <div
                                key={i}
                                className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 shadow-lg shadow-rose-500/40 dark:from-rose-500 dark:to-orange-500"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transform: `rotate(${deg}deg) translateY(-88px) sm:translateY(-104px) translate(-50%, -50%)`,
                                }}
                            />
                        ))}
                    </motion.div>

                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                                "0 20px 50px -10px rgba(244, 63, 94, 0.3)",
                                "0 25px 60px -8px rgba(244, 63, 94, 0.55)",
                                "0 20px 50px -10px rgba(244, 63, 94, 0.3)",
                            ],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 sm:h-36 sm:w-36"
                    >
                        <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

                        <motion.div
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                            className="relative z-10"
                        >
                            <FiAlertTriangle className="h-14 w-14 text-white drop-shadow-2xl sm:h-18 sm:w-18" strokeWidth={2.5} />
                        </motion.div>

                        <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                            className="absolute inset-0 skew-x-12 overflow-hidden rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 px-4 py-1.5 shadow-sm backdrop-blur-sm dark:border-rose-800/40 dark:from-rose-950/50 dark:to-orange-950/40"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-rose-700 dark:text-rose-300">
                        Unexpected Error
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl dark:from-white dark:via-gray-200 dark:to-gray-400"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                    Oops! Something
                    <br className="sm:hidden" />
                    <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-orange-400">
                        {" "}Broke Down
                    </span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mt-5 max-w-md px-2 text-sm leading-relaxed text-gray-500 sm:max-w-lg sm:text-base md:text-lg dark:text-gray-400"
                >
                    We hit an unexpected bump on the road. Don&apos;t worry — our team has been notified and we&apos;re already on it. Please try again in a moment.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="mt-6 grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-3"
                >
                    {[
                        { icon: FiShield, label: "Data Safe", color: "emerald" },
                        { icon: FiRefreshCw, label: "Auto Retry", color: "blue" },
                        { icon: FiMail, label: "Team Notified", color: "purple" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/40"
                        >
                            <item.icon className={`h-3.5 w-3.5 text-${item.color}-500 dark:text-${item.color}-400`} />
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-md sm:flex-row sm:justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => reset()}
                        className="group relative inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 sm:flex-1 sm:px-6"
                    >
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                            className="inline-flex"
                        >
                            <FiRefreshCw className="text-base" />
                        </motion.span>
                        Try Again
                        <motion.span
                            className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.button>

                    <Link href="/" className="block w-full sm:flex-1">
                        <motion.div
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-2 border-gray-200 bg-white px-5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 sm:px-6 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300"
                        >
                            <FiHome className="text-base" />
                            Back to Home
                        </motion.div>
                    </Link>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-xs text-gray-400 dark:text-gray-500"
                >
                    <FiMail className="h-3.5 w-3.5" />
                    <span>Still having trouble?</span>
                    <Link
                        href="/"
                        className="font-bold text-emerald-600 underline decoration-emerald-300 decoration-2 underline-offset-4 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                        Contact Support
                    </Link>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:mt-12 sm:text-xs sm:tracking-[0.25em] dark:text-gray-600"
                >
                    <FaTicketAlt className="h-3 w-3 text-emerald-500 sm:h-3.5 sm:w-3.5" />
                    <span>Ticketix Platform</span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="font-mono">v2.0</span>
                </motion.div>
            </motion.div>
        </div>
    );
}