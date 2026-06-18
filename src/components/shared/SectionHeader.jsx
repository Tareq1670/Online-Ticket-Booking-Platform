import { Chip } from "@heroui/react";
import { HiOutlineSparkles } from "react-icons/hi2";

const SectionHeader = ({
    badge,
    title,
    highlight,
    description,
    align = "center",
}) => {
    return (
        <div
            className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
        >
            {badge && (
                <div
                    className={`flex ${
                        align === "center" ? "justify-center" : "justify-start"
                    } mb-4`}
                >
                    <Chip
                        startContent={<HiOutlineSparkles size={14} />}
                        variant="flat"
                        radius="full"
                        classNames={{
                            base: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 h-8",
                            content:
                                "text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider px-1",
                        }}
                    >
                        {badge}
                    </Chip>
                </div>
            )}

            <h2 className="text-3xl md:text-5xl font-black text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
                {title}{" "}
                {highlight && (
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                        {highlight}
                    </span>
                )}
            </h2>

            {description && (
                <p
                    className={`text-base md:text-lg text-zinc-500 dark:text-zinc-400 ${
                        align === "center" ? "max-w-2xl mx-auto" : ""
                    } leading-relaxed`}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
