"use client";

import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BsCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";

const FEATURES = [
    "Book tickets in 30 seconds",
    "Real-time tracking",
    "Exclusive mobile-only deals",
    "Offline ticket access",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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

const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: 0.9 + i * 0.12,
            type: "spring",
            stiffness: 280,
            damping: 18,
        },
    }),
};

const phoneVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 60, rotate: -8 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
        },
    },
};

const MobileAppPromo = () => {
    return (
        <section className="py-20 bg-white dark:bg-zinc-950 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-emerald-950 to-green-950 p-8 md:p-16 shadow-2xl shadow-green-500/20"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.6, 0.9, 0.6],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-20 -right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
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
                        className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
                    />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="text-white"
                        >
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 cursor-default"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <HiOutlineSparkles
                                        size={14}
                                        className="text-green-400"
                                    />
                                </motion.div>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">
                                    Coming Soon
                                </span>
                            </motion.div>

                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl md:text-5xl font-black mb-6 leading-tight"
                            >
                                Get the{" "}
                                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                    Ticketix App
                                </span>
                                <br />
                                On Your Phone
                            </motion.h2>

                            <motion.p
                                variants={itemVariants}
                                className="text-white/80 text-base md:text-lg mb-8 leading-relaxed"
                            >
                                Book tickets faster, get exclusive deals, and
                                travel smarter with our mobile app. Available
                                on iOS and Android.
                            </motion.p>

                            <div className="space-y-3 mb-8">
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
                                        className="flex items-center gap-3 group cursor-default"
                                    >
                                        <motion.div
                                            whileHover={{
                                                scale: 1.25,
                                                rotate: 12,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                            }}
                                        >
                                            <BsCheckCircleFill className="text-green-400 flex-shrink-0" />
                                        </motion.div>
                                        <span className="text-white/90 font-medium">
                                            {feature}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <motion.button
                                    custom={0}
                                    variants={buttonVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    whileHover={{
                                        scale: 1.06,
                                        y: -3,
                                        boxShadow:
                                            "0 20px 40px -10px rgba(255,255,255,0.3)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 bg-white text-zinc-900 hover:bg-zinc-100 font-bold px-6 py-3 rounded-full shadow-xl transition-colors"
                                >
                                    <FaApple size={22} />
                                    <div className="text-left">
                                        <p className="text-[10px] font-medium">
                                            Download on the
                                        </p>
                                        <p className="text-sm font-bold">
                                            App Store
                                        </p>
                                    </div>
                                </motion.button>

                                <motion.button
                                    custom={1}
                                    variants={buttonVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    whileHover={{
                                        scale: 1.06,
                                        y: -3,
                                        boxShadow:
                                            "0 20px 40px -10px rgba(16,185,129,0.4)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 bg-zinc-800 text-white hover:bg-zinc-700 border border-white/20 font-bold px-6 py-3 rounded-full shadow-xl transition-colors"
                                >
                                    <FaGooglePlay size={20} />
                                    <div className="text-left">
                                        <p className="text-[10px] font-medium">
                                            Get it on
                                        </p>
                                        <p className="text-sm font-bold">
                                            Google Play
                                        </p>
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>

                        <div className="relative flex justify-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.15, 1],
                                    opacity: [0.6, 0.9, 0.6],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-3xl"
                            />

                            <motion.div
                                variants={phoneVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                whileHover={{
                                    scale: 1.04,
                                    rotate: 2,
                                    transition: { duration: 0.4 },
                                }}
                                className="relative z-10 w-full max-w-xs h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-green-500/30"
                            >
                                <motion.div
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=800&fit=crop"
                                        alt="Ticketix Mobile App"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        className="object-cover"
                                    />
                                </motion.div>

                                <motion.div
                                    animate={{
                                        x: ["-100%", "200%"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        repeatDelay: 2,
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0, x: -20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 1.2,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 16,
                                }}
                                className="absolute top-10 -left-2 md:left-4 z-20 bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
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
                                    Live Booking
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0, x: 20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 1.4,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 16,
                                }}
                                className="absolute bottom-10 -right-2 md:right-4 z-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl px-4 py-3 shadow-xl"
                            >
                                <p className="text-[10px] font-bold opacity-90">
                                    Rating
                                </p>
                                <p className="text-lg font-black">⭐ 4.9</p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MobileAppPromo;