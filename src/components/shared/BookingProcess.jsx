"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  BsSearch,
  BsTicketPerforated,
  BsCreditCard2Front,
  BsCheckCircleFill,
} from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

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
    particleColor: "#10b981",
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
    particleColor: "#3b82f6",
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
    particleColor: "#8b5cf6",
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
    particleColor: "#f97316",
  },
];

// Deterministic particle sizes to prevent hydration mismatch (no Math.random)
// These create varied look without randomness
const PARTICLE_SIZES = [3.5, 4.2, 3.8, 4.5]; 
const PARTICLE_DELAYS = [0, 0.9, 1.8, 2.7];
const PARTICLE_X_POSITIONS = ["15%", "33%", "51%", "69%"];
const PARTICLE_Y_POSITIONS = ["25%", "37%", "49%", "61%"];

const FloatingParticle = ({ delay, x, y, color, size = 4 }) => {
  // Ensure size is always a number format expected by DOM
  const sizeValue = typeof size === 'number' ? size : parseFloat(size);
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: sizeValue,
        height: sizeValue,
        backgroundColor: color,
        left: x,
        top: y,
        opacity: 0.3,
      }}
      animate={{
        y: [0, -25, 0],
        x: [0, 12, -12, 0],
        opacity: [0.15, 0.4, 0.15],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4 + (delay % 2), // Deterministic variation based on delay
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const StepCard = ({ step, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 60, rotateX: 10 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group pt-14 md:pt-16"
      style={{ perspective: 1000 }}
    >
      {/* Floating Icon Container */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 top-0">
        <div className="relative">
          {/* Glow Effect */}
          <motion.div
            className={`absolute inset-0 ${step.glowColor} rounded-full blur-xl`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              delay: index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Rotating Ring */}
          <motion.div
            className="absolute inset-[-4px] rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${step.particleColor}30, transparent, ${step.particleColor}30)`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Main Icon Circle */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={`relative w-[76px] h-[76px] md:w-[84px] md:h-[84px] rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl ${step.shadowColor} border-[3px] border-white dark:border-zinc-900`}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 4,
                delay: index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="text-white drop-shadow-md" size={28} />
            </motion.div>
          </motion.div>

          {/* Number Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              delay: 0.5 + index * 0.15,
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 shadow-lg border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center z-30"
          >
            <span className={`text-xs font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent leading-none`}>
              {step.number}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Card Body */}
      <motion.div
        whileHover={{
          y: -8,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        className={`relative bg-white dark:bg-zinc-900 border-2 border-zinc-200/80 dark:border-zinc-800/60 ${step.borderHover} rounded-3xl p-6 pb-8 hover:shadow-2xl ${step.shadowColor} transition-all duration-500 h-full backdrop-blur-sm`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient Overlay on Hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none rounded-3xl`}
        />

        {/* Fixed Particles - No more Math.random! */}
        {PARTICLE_SIZES.map((size, i) => (
          <FloatingParticle
            key={`particle-${i}`}
            delay={PARTICLE_DELAYS[i]}
            x={PARTICLE_X_POSITIONS[i]}
            y={PARTICLE_Y_POSITIONS[i]}
            color={step.particleColor}
            size={size}
          />
        ))}

        {/* Content Area */}
        <div className="text-center relative z-10 mt-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.8, y: 10 }
            }
            transition={{ delay: 0.3 + index * 0.15 }}
            className={`inline-block px-4 py-1.5 rounded-full ${step.bgLight} mb-4`}
          >
            <span className={`text-[10px] font-bold ${step.textColor} uppercase tracking-[3px]`}>
              Step {step.number}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{ delay: 0.4 + index * 0.15 }}
            className="text-lg md:text-xl font-black text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight"
          >
            {step.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{ delay: 0.5 + index * 0.15 }}
            className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[90%] mx-auto"
          >
            {step.description}
          </motion.p>
        </div>

        {/* Background Decorative Number */}
        <div
          className={`absolute -bottom-3 -right-3 text-6xl md:text-7xl font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none select-none leading-none select-none`}
        >
          {step.number}
        </div>

        {/* Bottom Progress Bar on Hover */}
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: "60%" }}
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 bg-gradient-to-r ${step.gradient} rounded-t-full transition-all duration-300 ease-out`}
          style={{ transformOrigin: "center" }}
        />
      </motion.div>
    </motion.div>
  );
};

const AnimatedConnectingLine = () => {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: true, amount: 0.5 });

  return (
    <div
      ref={lineRef}
      className="hidden lg:block absolute top-[38px] left-0 right-0 px-[13%] z-0"
    >
      <svg className="w-full h-1.5" preserveAspectRatio="none" viewBox="0 0 1000 4">
        <defs>
          <linearGradient id="processGradientAnimated" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="33%" stopColor="#3b82f6" />
            <stop offset="66%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {/* Base Line */}
        <line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6,6"
          className="text-zinc-200 dark:text-zinc-800"
        />

        {/* Animated Line */}
        <motion.line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="url(#processGradientAnimated)"
          strokeWidth="2"
          strokeDasharray="8,8"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Traveling Dot */}
        <motion.circle
          r="3.5"
          fill="#10b981"
          filter="drop-shadow(0 0 4px #10b981)"
          animate={
            isInView
              ? {
                  cx: [0, 1000],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                }
              : {}
          }
          transition={{
            duration: 2.5,
            delay: 0.8,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "linear",
          }}
        />
      </svg>

      {/* Node Points */}
      {STEPS.map((step, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${12.5 + i * 25}%` }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            delay: 0.6 + i * 0.15,
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full border-[2.5px] border-white dark:border-zinc-900 ring-2 ring-offset-2 ring-transparent dark:ring-offset-zinc-950"
            style={{
              backgroundColor: step.particleColor,
              boxShadow: `0 0 10px ${step.particleColor}40`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const BookingProcess = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-zinc-950 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-gradient-radial from-emerald-200/30 via-green-100/20 to-transparent dark:from-emerald-900/20 dark:to-transparent rounded-full blur-[120px]"
        />
        
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-5 w-52 h-52 bg-blue-200/15 dark:bg-blue-900/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 right-5 w-56 h-56 bg-orange-200/15 dark:bg-orange-900/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 25, -25, 0], y: [0, -25, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-violet-200/10 dark:bg-violet-900/10 rounded-full blur-[80px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-24 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-800 dark:text-zinc-100 mb-6 tracking-tight leading-tight"
          >
            Book Tickets In{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                4 Easy Steps
              </span>
              <motion.span
                initial={{ scaleX: 0, originLeft: true }}
                animate={isHeaderInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-emerald-200/60 to-teal-200/60 dark:from-emerald-800/30 dark:to-teal-800/30 rounded-full origin-left"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            From searching to traveling — we've simplified the entire ticket booking journey for you
          </motion.p>
        </div>

        {/* Steps Grid Container */}
        <div className="relative max-w-7xl mx-auto">
          <AnimatedConnectingLine />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-8 relative">
            {STEPS.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={isCtaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 md:mt-32 max-w-5xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.35)" }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-[32px] overflow-hidden shadow-2xl shadow-green-500/20"
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjYSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')] opacity-30" />

            {/* Floating Orbs */}
            <motion.div animate={{ x: [0, 25, 0], y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
            <motion.div animate={{ x: [0, -20, 0], y: [0, 25, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

            <div className="relative p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
              <div className="flex items-center gap-5 text-center lg:text-left">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} className="hidden lg:flex w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md items-center justify-center flex-shrink-0 border border-white/20">
                  <HiOutlineSparkles size={36} className="text-white" />
                </motion.div>
                
                <div>
                  <motion.h3 initial={{ opacity: 0, x: -20 }} animate={isCtaInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }} className="text-2xl md:text-3xl font-black mb-2 drop-shadow-sm">
                    Ready to Start Your Journey?
                  </motion.h3>
                  <motion.p initial={{ opacity: 0, x: -20 }} animate={isCtaInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 }} className="text-lg text-white/90 font-medium">
                    Join 500K+ travelers who book with Ticketix every day
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 w-full lg:w-auto justify-between lg:justify-end">
                {/* Avatar Stack */}
                <div className="flex -space-x-3 order-2 lg:order-1">
                  {[10, 11, 12, 13].map((id, i) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, scale: 0, x: 20 }}
                      animate={isCtaInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 350, damping: 20 }}
                      whileHover={{ zIndex: 10, y: -4, scale: 1.1 }}
                      className="relative w-12 h-12 rounded-full border-3 border-white/80 bg-gradient-to-br from-zinc-200 to-zinc-300 overflow-hidden cursor-pointer shadow-lg"
                    >
                      <Image fill src={`https://i.pravatar.cc/100?img=${id}`} alt="User avatar" className="object-cover" sizes="48px" />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isCtaInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1, type: "spring", stiffness: 350, damping: 20 }}
                    whileHover={{ zIndex: 10, y: -4, scale: 1.05 }}
                    className="w-12 h-12 rounded-full bg-white text-emerald-600 border-3 border-white/80 flex items-center justify-center text-sm font-black cursor-pointer shadow-lg"
                  >+5K</motion.div>
                </div>

                {/* CTA Button */}
                <Link href="/all-tickets" className="order-1 lg:order-2">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2.5 px-8 py-4 bg-white text-emerald-600 font-bold rounded-2xl text-base shadow-xl transition-colors hover:bg-zinc-50 whitespace-nowrap"
                  >
                    Book Now
                    <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingProcess;