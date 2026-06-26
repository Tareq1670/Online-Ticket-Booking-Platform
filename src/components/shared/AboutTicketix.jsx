"use client";

import Image from "next/image";
import Link from "next/link";
import {
    BsArrowRight,
    BsPlayCircleFill,
    BsCheckCircleFill,
    BsTicketPerforated,
} from "react-icons/bs";
import { FaBus, FaPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const FEATURES = [
    "100% Verified Vendors & Tickets",
    "Secure Payment via Stripe",
    "24/7 Customer Support",
    "Best Price Guarantee",
];

const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.45,
            delay: 0.5 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const imageRevealVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const floatingCardVariants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -8 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 240,
            damping: 18,
            delay: 0.8,
        },
    },
};

const missionCardVariants = {
    hidden: { opacity: 0, scale: 0.6, x: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 240,
            damping: 18,
            delay: 1,
        },
    },
};

const decorIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay = 1.1) => ({
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 16,
            delay,
        },
    }),
};

const underlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const AboutTicketix = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-zinc-50 via-white to-emerald-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-20 right-20 w-64 h-64 bg-green-200/30 dark:bg-green-900/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                    }}
                    className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-200/25 dark:bg-emerald-900/10 rounded-full blur-3xl"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-10 right-10 text-green-300/30 dark:text-green-700/20 hidden md:block"
            >
                <BsTicketPerforated size={60} />
            </motion.div>
            <motion.div
                animate={{ y: [0, -18, 0], rotate: [45, 35, 45] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.7,
                }}
                className="absolute bottom-20 right-1/3 text-emerald-300/20 dark:text-emerald-700/15 hidden md:block"
            >
                <FaPlane size={45} />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mx-auto items-center">
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-6 order-2 lg:order-1"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-800 dark:text-zinc-100 leading-tight tracking-tight"
                        >
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
                                    <motion.path
                                        d="M2 5.5C50 2 100 2 198 5.5"
                                        stroke="url(#underline)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        variants={underlineVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
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
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
                        >
                            At{" "}
                            <span className="font-bold text-green-600 dark:text-green-400">
                                Ticketix
                            </span>
                            , we believe travel should be simple, secure, and
                            seamless. We connect millions of travelers with
                            verified vendors across Bangladesh, offering the
                            best prices on bus, train, plane, and launch
                            tickets — all in one place.
                        </motion.p>

                        <div className="space-y-3 pt-2">
                            {FEATURES.map((feature, i) => (
                                <motion.div
                                    key={feature}
                                    custom={i}
                                    variants={featureVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    whileHover={{ x: 6 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 320,
                                        damping: 20,
                                    }}
                                    className="flex items-center gap-3 group"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 8 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 320,
                                            damping: 14,
                                        }}
                                        className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                                    >
                                        <BsCheckCircleFill
                                            className="text-white"
                                            size={14}
                                        />
                                    </motion.div>
                                    <span className="text-sm md:text-base font-semibold text-zinc-700 dark:text-zinc-300">
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="pt-4 w-fit"
                        >
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                            >
                                Learn More
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{
                                        duration: 1.6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="w-7 h-7 rounded-full bg-white text-green-600 flex items-center justify-center"
                                >
                                    <BsArrowRight size={14} />
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <div className="relative order-1 lg:order-2 h-[500px] md:h-[600px]">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl" />

                        <motion.div
                            variants={imageRevealVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="absolute top-0 right-0 w-[65%] h-[55%] rounded-3xl overflow-hidden shadow-2xl shadow-green-500/20 group"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=800"
                                alt="Travel Bus"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                                className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-xl flex items-center gap-2"
                            >
                                <motion.span
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [1, 0.5, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                    }}
                                    className="w-2 h-2 rounded-full bg-green-500"
                                />
                                <span className="text-xs font-bold text-zinc-800">
                                    Live Tracking
                                </span>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ scale: 1.02 }}
                            className="absolute bottom-0 left-0 w-[55%] h-[45%] rounded-3xl overflow-hidden shadow-2xl shadow-green-500/20 group border-4 border-white dark:border-zinc-900"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
                                alt="Travel Destination"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </motion.div>

                        <motion.div
                            variants={floatingCardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            whileHover={{ scale: 1.06, y: -4 }}
                            className="absolute top-[35%] left-0 z-20"
                        >
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-5 md:p-6 shadow-2xl shadow-green-500/40 border-4 border-white dark:border-zinc-900 group">
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

                                    <div className="flex -space-x-2 mt-3">
                                        {[15, 16, 17].map((id, i) => (
                                            <motion.div
                                                key={id}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    delay: 1.2 + i * 0.1,
                                                    type: "spring",
                                                    stiffness: 280,
                                                    damping: 16,
                                                }}
                                                className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-zinc-200"
                                            >
                                                <Image
                                                    src={`https://i.pravatar.cc/100?img=${id}`}
                                                    alt="user"
                                                    width={28}
                                                    height={28}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        ))}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: 1.5,
                                                type: "spring",
                                                stiffness: 280,
                                                damping: 16,
                                            }}
                                            className="w-7 h-7 rounded-full bg-white text-green-600 border-2 border-white flex items-center justify-center text-[10px] font-black"
                                        >
                                            +
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={missionCardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            whileHover={{ scale: 1.04, y: -4 }}
                            className="absolute bottom-[5%] right-0 z-20 w-[55%] md:w-[50%]"
                        >
                            <div className="bg-zinc-900 dark:bg-zinc-800 rounded-3xl p-5 md:p-6 shadow-2xl border-4 border-white dark:border-zinc-900 relative overflow-hidden">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.4, 0.7, 0.4],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
                                />

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
                                    <motion.button
                                        whileHover={{ scale: 1.15, rotate: 8 }}
                                        whileTap={{ scale: 0.92 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 320,
                                            damping: 14,
                                        }}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/40 group"
                                    >
                                        <BsPlayCircleFill
                                            className="text-white"
                                            size={24}
                                        />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            custom={1.1}
                            variants={decorIconVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.15, rotate: 12 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="absolute top-2 right-2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white dark:bg-zinc-900 shadow-2xl flex items-center justify-center z-30 border-2 border-green-200 dark:border-green-800"
                        >
                            <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <FaBus className="text-green-500" size={24} />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            custom={1.3}
                            variants={decorIconVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.15, rotate: 15 }}
                            animate={{
                                y: [0, -6, 0],
                                rotate: [0, 8, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-[35%] left-[40%] w-12 h-12 rounded-full bg-orange-500 shadow-2xl shadow-orange-500/40 flex items-center justify-center z-30"
                        >
                            <BsTicketPerforated
                                className="text-white"
                                size={20}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTicketix;