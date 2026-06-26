"use client";

import React from "react";

const Forbidden = () => {
    const handleGoHome = () => {
        window.location.href = "/";
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleContactSupport = () => {
        window.location.href = "/contact";
    };

    return (
        <div className="min-h-screen bg-[#0B1020] text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/20 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4"></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-3xl">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
                    {/* Big 403 Number */}
                    <div className="relative mb-6">
                        <h2 className="text-[100px] md:text-[140px] font-black leading-none bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent select-none">
                            403
                        </h2>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-500/10 border-2 border-red-400/30 flex items-center justify-center backdrop-blur-sm">
                                <svg
                                    className="w-12 h-12 md:w-16 md:h-16 text-red-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-300 text-sm font-medium mb-5">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                        Forbidden Access
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        Access Forbidden
                    </h1>

                    {/* Description */}
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        You don&apos;t have permission to access this resource
                        on Ticketix. This area is restricted and your current
                        account role does not allow entry. If you believe this
                        is an error, please contact our support team.
                    </p>

                    {/* Info Box */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-orange-500/15 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-orange-300"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1">
                                Restricted Area
                            </h3>
                            <p className="text-xs text-gray-400">
                                This page requires higher permission level.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-red-500/15 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-red-300"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1">
                                Role Required
                            </h3>
                            <p className="text-xs text-gray-400">
                                Only authorized roles can view this content.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-yellow-500/15 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-yellow-300"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1">
                                Contact Support
                            </h3>
                            <p className="text-xs text-gray-400">
                                Need access? Our team can help you.
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={handleGoHome}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 font-semibold shadow-lg shadow-orange-500/20"
                        >
                            Go to Homepage
                        </button>

                        <button
                            onClick={handleGoBack}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold text-white"
                        >
                            Go Back
                        </button>

                        <button
                            onClick={handleContactSupport}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-300 font-semibold text-white"
                        >
                            Contact Support
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                            Error Code: 403
                        </span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Footer Text */}
                    <p className="text-sm text-gray-500">
                        Ticketix © Secure ticket booking, protected access.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
