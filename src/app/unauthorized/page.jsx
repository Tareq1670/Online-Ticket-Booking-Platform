"use client";

import React from "react";

const Unauthorized = () => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full translate-x-1/4 translate-y-1/4"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-3xl">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-red-500/15 border border-red-400/20">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 9l-6 6m0-6l6 6"
              />
            </svg>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium mb-5">
            Ticketix Access Control
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Access Denied
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Sorry, you are not authorized to access this page. This section may
            require special permission, an active account, or admin access.
            Please log in with the correct account or return to a safe page.
          </p>

          {/* Info Box */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Restricted Page
              </h3>
              <p className="text-sm text-gray-400">
                This content is protected for selected users only.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Secure Access
              </h3>
              <p className="text-sm text-gray-400">
                Please sign in with the right account credentials.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                Need Help?
              </h3>
              <p className="text-sm text-gray-400">
                Contact support if you believe this is a mistake.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGoHome}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 font-semibold shadow-lg shadow-cyan-500/20"
            >
              Go to Homepage
            </button>

            <button
              onClick={handleGoBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold text-white"
            >
              Go Back
            </button>
          </div>

          {/* Footer Text */}
          <p className="mt-8 text-sm text-gray-500">
            Ticketix © Your journey starts with the right access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;