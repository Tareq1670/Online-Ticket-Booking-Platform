"use client";

import { LogoLinkedin, Ticket } from "@gravity-ui/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import {
    RiLinksLine,
    RiContactsLine,
    RiSecurePaymentLine,
    RiMailLine,
    RiPhoneLine,
    RiFacebookCircleLine,
    RiVisaLine,
    RiMastercardFill,
} from "react-icons/ri";
import { SiStripe } from "react-icons/si";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const columnVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.3 + i * 0.06,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const socialVariants = {
    hidden: { opacity: 0, scale: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: 0.5 + i * 0.08,
            type: "spring",
            stiffness: 320,
            damping: 16,
        },
    }),
};

const paymentVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 15 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: 0.5 + i * 0.1,
            type: "spring",
            stiffness: 280,
            damping: 18,
        },
    }),
};

const Footer = () => {
    const quickLinks = [
        { label: "Home", path: "/" },
        { label: "All Tickets", path: "/all-tickets" },
        { label: "Contact Us", path: "/contact" },
        { label: "About", path: "/about" },
    ];

    const socialLinks = [
        { href: "#facebook", icon: RiFacebookCircleLine },
        { href: "#linkedin", icon: LogoLinkedin },
        { href: "#twitter", icon: CiTwitter },
        { href: "#instagram", icon: FaInstagram },
    ];

    const paymentMethods = [
        { icon: SiStripe, color: "text-[#635BFF]" },
        { icon: RiVisaLine, color: "text-[#1A1F71]" },
        { icon: RiMastercardFill, color: "text-[#EB001B]" },
    ];

    return (
        <footer className="w-full bg-zinc-50 dark:bg-zinc-950 rounded-t-3xl border-t border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="container mx-auto px-2 md:px-0 py-6 md:py-10 pb-0">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
                >
                    <motion.div variants={columnVariants}>
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -8 }}
                                whileTap={{ scale: 0.92 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 320,
                                    damping: 14,
                                }}
                                className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center shadow-md"
                            >
                                <Ticket className="text-white" size={20} />
                            </motion.div>
                            <span className="text-xl font-bold text-zinc-900 dark:text-white">
                                Ticketix
                            </span>
                        </Link>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6"
                        >
                            Book bus, train, launch & flight tickets easily.
                            Fast, secure, and hassle-free travel booking for all
                            your journeys.
                        </motion.p>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.href}
                                        href={social.href}
                                        custom={i}
                                        variants={socialVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        whileHover={{
                                            scale: 1.15,
                                            y: -3,
                                            transition: {
                                                type: "spring",
                                                stiffness: 320,
                                                damping: 14,
                                            },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div variants={columnVariants}>
                        <motion.h4
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-lg mb-5"
                        >
                            <RiLinksLine size={18} />
                            Quick Links
                        </motion.h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <motion.li
                                    key={link.path}
                                    custom={i}
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        href={link.path}
                                        className="group inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-sm hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                    >
                                        <span className="w-0 h-[2px] bg-green-500 rounded-full group-hover:w-4 transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={columnVariants}>
                        <motion.h4
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-lg mb-5"
                        >
                            <RiContactsLine size={18} />
                            Contact Info
                        </motion.h4>
                        <ul className="space-y-3">
                            {[
                                {
                                    icon: RiMailLine,
                                    text: "support@ticketix.com",
                                    href: "mailto:support@ticketix.com",
                                },
                                {
                                    icon: RiPhoneLine,
                                    text: "+880 1700-000000",
                                    href: "tel:+8801700000000",
                                },
                                {
                                    icon: RiFacebookCircleLine,
                                    text: "Facebook Page",
                                    href: "#",
                                },
                            ].map((info, i) => {
                                const Icon = info.icon;
                                return (
                                    <motion.li
                                        key={info.text}
                                        custom={i}
                                        variants={itemVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        whileHover={{ x: 4 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 320,
                                            damping: 20,
                                        }}
                                    >
                                        <a
                                            href={info.href}
                                            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                        >
                                            <Icon
                                                size={16}
                                                className="text-green-600 dark:text-green-400"
                                            />
                                            {info.text}
                                        </a>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>

                    <motion.div variants={columnVariants}>
                        <motion.h4
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-lg mb-5"
                        >
                            <RiSecurePaymentLine size={18} />
                            Payment Methods
                        </motion.h4>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-zinc-600 dark:text-zinc-400 text-sm mb-4"
                        >
                            Secure payments powered by Stripe.
                        </motion.p>
                        <div className="flex items-center gap-3 flex-wrap">
                            {paymentMethods.map((p, i) => {
                                const Icon = p.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        custom={i}
                                        variants={paymentVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        whileHover={{
                                            scale: 1.1,
                                            y: -4,
                                            boxShadow:
                                                "0 12px 24px -10px rgba(16,185,129,0.25)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 320,
                                            damping: 16,
                                        }}
                                        className={`px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-pointer ${p.color}`}
                                    >
                                        <Icon size={32} />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="border-t border-zinc-200 dark:border-zinc-800 mt-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3"
                >
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        © 2025 Ticketix. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-sm text-zinc-500 dark:text-zinc-500">
                        <motion.p
                            whileHover={{
                                color: "#10b981",
                                y: -2,
                            }}
                            transition={{ duration: 0.2 }}
                            className="cursor-pointer"
                        >
                            Privacy Policy
                        </motion.p>
                        <motion.p
                            whileHover={{
                                color: "#10b981",
                                y: -2,
                            }}
                            transition={{ duration: 0.2 }}
                            className="cursor-pointer"
                        >
                            Terms of Service
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;