import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BsCheckCircleFill } from "react-icons/bs";

const FEATURES = [
    "Book tickets in 30 seconds",
    "Real-time tracking",
    "Exclusive mobile-only deals",
    "Offline ticket access",
];

const MobileAppPromo = () => {
    return (
        <section className="py-20 bg-white dark:bg-zinc-950 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-emerald-950 to-green-950 p-8 md:p-16 shadow-2xl shadow-green-500/20">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <Chip
                                startContent={<HiOutlineSparkles size={14} />}
                                variant="flat"
                                radius="full"
                                classNames={{
                                    base: "bg-white/10 backdrop-blur-md border border-white/20 mb-6 h-8",
                                    content: "text-xs font-bold text-white uppercase tracking-wider",
                                }}
                            >
                                Coming Soon
                            </Chip>

                            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                                Get the{" "}
                                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                    Ticketix App
                                </span>
                                <br />
                                On Your Phone
                            </h2>

                            <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
                                Book tickets faster, get exclusive deals, and travel smarter with our mobile app. Available on iOS and Android.
                            </p>

                            <div className="space-y-3 mb-8">
                                {FEATURES.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <BsCheckCircleFill className="text-green-400 flex-shrink-0" />
                                        <span className="text-white/90 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    radius="full"
                                    startContent={<FaApple size={22} />}
                                    className="bg-white text-zinc-900 hover:bg-zinc-100 font-bold px-6"
                                >
                                    <div className="text-left">
                                        <p className="text-[10px] font-medium">Download on the</p>
                                        <p className="text-sm font-bold">App Store</p>
                                    </div>
                                </Button>

                                <Button
                                    size="lg"
                                    radius="full"
                                    startContent={<FaGooglePlay size={20} />}
                                    className="bg-zinc-800 text-white hover:bg-zinc-700 border border-white/20 font-bold px-6"
                                >
                                    <div className="text-left">
                                        <p className="text-[10px] font-medium">Get it on</p>
                                        <p className="text-sm font-bold">Google Play</p>
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className="relative flex justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-3xl" />
                            <div className="relative z-10 w-full max-w-xs h-[500px]">
                                <Image
                                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=800&fit=crop"
                                    alt="Ticketix Mobile App"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 300px"
                                    className="object-cover rounded-3xl shadow-2xl shadow-green-500/30"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileAppPromo;