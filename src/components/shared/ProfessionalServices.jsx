"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    BsArrowRight,
    BsArrowUpRight,
    BsStarFill,
    BsGoogle,
} from "react-icons/bs";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Skeleton } from "@heroui/react";

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

const containerVariants = {
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

const imageVariants = {
    hidden: { opacity: 0, scale: 0.92, x: -40 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
};

const serviceCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: 0.4 + i * 0.1,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const floatingBadgeVariants = {
    hidden: { opacity: 0, scale: 0, y: -20 },
    visible: (delay = 0.8) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay,
            type: "spring",
            stiffness: 260,
            damping: 18,
        },
    }),
};

export const ProfessionalServicesSkeleton = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-white via-emerald-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mx-auto items-center">
                    <div className="relative h-[500px] md:h-[600px] order-2 lg:order-1">
                        <Skeleton
                            animationType="shimmer"
                            className="absolute inset-0 w-full h-full rounded-3xl"
                        />
                        <div className="absolute top-6 left-6 z-20">
                            <Skeleton
                                animationType="shimmer"
                                className="h-[72px] w-[160px] rounded-2xl"
                            />
                        </div>
                        <div className="absolute top-6 right-6 z-20">
                            <Skeleton
                                animationType="shimmer"
                                className="h-9 w-36 rounded-2xl"
                            />
                        </div>
                        <div className="absolute bottom-6 left-6 z-20">
                            <Skeleton
                                animationType="shimmer"
                                className="h-12 w-44 rounded-full"
                            />
                        </div>
                        <div className="absolute bottom-6 right-6 z-20">
                            <Skeleton
                                animationType="shimmer"
                                className="h-14 w-14 rounded-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="space-y-3">
                            <Skeleton
                                animationType="shimmer"
                                className="h-10 w-3/4 rounded-xl"
                            />
                            <Skeleton
                                animationType="shimmer"
                                className="h-10 w-full rounded-xl"
                            />
                            <Skeleton
                                animationType="shimmer"
                                className="h-10 w-2/3 rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Skeleton
                                animationType="shimmer"
                                className="h-4 w-full rounded-lg"
                            />
                            <Skeleton
                                animationType="shimmer"
                                className="h-4 w-full rounded-lg"
                            />
                            <Skeleton
                                animationType="shimmer"
                                className="h-4 w-4/5 rounded-lg"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5"
                                >
                                    <Skeleton
                                        animationType="shimmer"
                                        className="h-12 w-12 rounded-xl mb-3"
                                    />
                                    <Skeleton
                                        animationType="shimmer"
                                        className="h-5 w-2/3 rounded-md mb-2"
                                    />
                                    <Skeleton
                                        animationType="shimmer"
                                        className="h-3 w-full rounded-md mb-1.5"
                                    />
                                    <Skeleton
                                        animationType="shimmer"
                                        className="h-3 w-4/5 rounded-md"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Skeleton
                                animationType="shimmer"
                                className="h-12 w-56 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProfessionalServices = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-white via-emerald-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-10 right-10 w-72 h-72 bg-green-200/30 dark:bg-green-900/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                    }}
                    className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-200/25 dark:bg-emerald-900/10 rounded-full blur-3xl"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mx-auto items-center">
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative h-[500px] md:h-[600px] order-2 lg:order-1"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.2, 0.35, 0.2],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-2xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.2, 0.35, 0.2],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.2,
                            }}
                            className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-2xl"
                        />

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-green-500/20 group"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=800&h=900&fit=crop"
                                alt="Professional Travel Service"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatDelay: 3,
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                            />
                        </motion.div>

                        <motion.div
                            custom={0.6}
                            variants={floatingBadgeVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.06, y: -3 }}
                            className="absolute top-6 left-6 z-20"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 transition-shadow">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="text-3xl font-black text-zinc-800 dark:text-zinc-100">
                                            4.9
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.span
                                                        key={i}
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0,
                                                        }}
                                                        whileInView={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.9 + i * 0.08,
                                                            type: "spring",
                                                            stiffness: 320,
                                                            damping: 16,
                                                        }}
                                                    >
                                                        <BsStarFill
                                                            className="text-yellow-400"
                                                            size={10}
                                                        />
                                                    </motion.span>
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
                        </motion.div>

                        <motion.div
                            custom={0.7}
                            variants={floatingBadgeVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.06 }}
                            className="absolute top-6 right-6 z-20"
                        >
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl px-4 py-3 shadow-2xl shadow-green-500/40">
                                <div className="flex items-center gap-2 text-white">
                                    <motion.span
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [1, 0.6, 1],
                                        }}
                                        transition={{
                                            duration: 1.6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="w-2 h-2 rounded-full bg-white"
                                    />
                                    <span className="text-xs font-bold">
                                        500K+ Bookings
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            custom={0.9}
                            variants={floatingBadgeVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="absolute bottom-6 left-6 z-20"
                        >
                            <Link href="/all-tickets" className="group">
                                <div className="bg-white dark:bg-zinc-900 rounded-full px-5 py-3 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 hover:shadow-green-500/30 transition-shadow">
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
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={floatingBadgeVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.15, rotate: 12 }}
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                                y: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                            }}
                            className="absolute bottom-6 right-6 z-20"
                        >
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center cursor-pointer group">
                                <HiOutlineSparkles
                                    className="text-green-500 group-hover:text-emerald-600 transition-colors"
                                    size={22}
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-6 order-1 lg:order-2"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-800 dark:text-zinc-100 leading-tight tracking-tight"
                        >
                            Professional Service
                            <br />
                            Ready For Your{" "}
                            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                                Journey
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
                        >
                            Whether you're traveling for business or pleasure,
                            we've got you covered with the most reliable and
                            affordable ticket booking platform in Bangladesh.
                            Choose your preferred mode of transport below.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {SERVICES.map((service, i) => {
                                const Icon = service.icon;
                                return (
                                    <motion.div
                                        key={service.title}
                                        custom={i}
                                        variants={serviceCardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        whileHover={{
                                            y: -8,
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 22,
                                            },
                                        }}
                                        className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-xl transition-shadow duration-500 cursor-pointer overflow-hidden"
                                    >
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500`}
                                        />

                                        <motion.div
                                            whileHover={{
                                                scale: 1.15,
                                                rotate: 8,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 320,
                                                damping: 14,
                                            }}
                                            className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-3`}
                                        >
                                            <Icon
                                                className="text-white"
                                                size={20}
                                            />
                                        </motion.div>

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

                                        <div
                                            className={`absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r ${service.gradient} transition-all duration-500`}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="pt-4 w-fit"
                        >
                            <Link
                                href="/all-tickets"
                                className="group inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-7 py-3.5 rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-shadow"
                            >
                                Explore All Services
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
                </div>
            </div>
        </section>
    );
};

export default ProfessionalServices;