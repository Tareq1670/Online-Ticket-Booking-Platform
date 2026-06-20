"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import {
    Select,
    Button,
    Chip,
    ListBox,
    Label,
    Description,
} from "@heroui/react";
import { FiSearch, FiX, FiChevronDown, FiSliders } from "react-icons/fi";
import { FaBus, FaTrain, FaPlane, FaShip, FaGlobe } from "react-icons/fa";
import { MdSwapHoriz, MdSort } from "react-icons/md";

const transportOptions = [
    {
        value: "all",
        label: "All Types",
        desc: "Show every transport option",
        icon: FaGlobe,
    },
    {
        value: "Bus",
        label: "Bus",
        desc: "Comfortable road travel",
        icon: FaBus,
    },
    {
        value: "Train",
        label: "Train",
        desc: "Fast & smooth rail journey",
        icon: FaTrain,
    },
    { value: "Plane", label: "Plane", desc: "Quick air travel", icon: FaPlane },
    {
        value: "Launch",
        label: "Launch",
        desc: "River & water transport",
        icon: FaShip,
    },
];

const sortOptions = [
    { value: "default", label: "Default Order", desc: "Recommended by system" },
    {
        value: "low",
        label: "Price: Low to High",
        desc: "Cheapest tickets first",
    },
    {
        value: "high",
        label: "Price: High to Low",
        desc: "Most expensive first",
    },
];

export default function TicketsFilter({ filters = {} }) {
    const router = useRouter();

    const [from, setFrom] = useState(filters.from || "");
    const [to, setTo] = useState(filters.to || "");
    const [transportType, setTransportType] = useState(
        filters.transportType || "all",
    );
    const [sort, setSort] = useState(filters.sort || "default");
    const [isExpanded, setIsExpanded] = useState(false);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            const sp = new URLSearchParams();

            if (from?.trim()) {
                sp.set("from", from.trim());
            }
            if (to?.trim()) {
                sp.set("to", to.trim());
            }
            if (transportType !== "all") {
                sp.set("transportType", transportType);
            }
            if (sort !== "default") {
                sp.set("sort", sort);
            }

            const queryString = sp.toString();
            router.push(`/all-tickets${queryString ? `?${queryString}` : ""}`);
        }, 400);

        return () => clearTimeout(timer);
    }, [from, to, transportType, sort]);

    const handleTransportChange = (key) => {
        let value = "all";
        if (key instanceof Set) {
            value = String([...key][0] || "all");
        } else if (key !== null && key !== undefined) {
            value = String(key);
        }
        if (value !== transportType) {
            setTransportType(value);
        }
    };

    const handleSortChange = (key) => {
        let value = "default";
        if (key instanceof Set) {
            value = String([...key][0] || "default");
        } else if (key !== null && key !== undefined) {
            value = String(key);
        }
        if (value !== sort) {
            setSort(value);
        }
    };

    const handleSwap = () => {
        const oldFrom = from;
        setFrom(to);
        setTo(oldFrom);
    };

    const handleSearch = () => {
        setIsExpanded(false);
    };

    const clearFilters = () => {
        setFrom("");
        setTo("");
        setTransportType("all");
        setSort("default");
    };

    const hasActiveFilters = useMemo(
        () =>
            Boolean(
                from.trim() ||
                to.trim() ||
                transportType !== "all" ||
                sort !== "default",
            ),
        [from, to, transportType, sort],
    );

    const activeCount = useMemo(
        () =>
            [
                from.trim(),
                to.trim(),
                transportType !== "all" ? transportType : "",
                sort !== "default" ? sort : "",
            ].filter(Boolean).length,
        [from, to, transportType, sort],
    );

    const selectedTransportLabel = useMemo(
        () =>
            transportOptions.find((o) => o.value === transportType)?.label ||
            "All Types",
        [transportType],
    );

    const selectedSortLabel = useMemo(
        () =>
            sortOptions.find((o) => o.value === sort)?.label || "Default Order",
        [sort],
    );

    const renderSelectItems = (options, showIcon = false) =>
        options.map((opt) => {
            const Icon = opt.icon;
            return (
                <ListBox.Item
                    key={opt.value}
                    id={opt.value}
                    textValue={opt.label}
                    className="group/item flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 outline-none transition-all duration-200 
          data-[focused=true]:bg-zinc-100 data-[hovered=true]:bg-zinc-100 
          data-[selected=true]:bg-green-500 data-[selected=true]:text-white
          dark:data-[focused=true]:bg-zinc-800 dark:data-[hovered=true]:bg-zinc-800 dark:data-[selected=true]:bg-green-500 dark:data-[selected=true]:text-white"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        {showIcon && Icon && (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 group-data-[selected=true]/item:bg-white/20 group-data-[selected=true]/item:text-white dark:bg-zinc-800 dark:text-zinc-400">
                                <Icon size={14} />
                            </div>
                        )}
                        <div className="min-w-0">
                            <Label className="block truncate text-sm font-semibold text-zinc-900 group-data-[selected=true]/item:text-white dark:text-zinc-200">
                                {opt.label}
                            </Label>
                            <Description className="block truncate text-[11px] text-zinc-500 group-data-[selected=true]/item:text-green-100 dark:text-zinc-50">
                                {opt.desc}
                            </Description>
                        </div>
                    </div>
                    <ListBox.ItemIndicator className="text-green-600 dark:text-green-400" />
                </ListBox.Item>
            );
        });

    return (
        <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40 sm:p-5 lg:p-6">
                <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="relative">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 shadow-lg shadow-green-500/20 text-white">
                                <FiSearch size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white sm:text-lg">
                                    Find Your Journey
                                </h3>
                                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                    Search routes, compare prices & book
                                    instantly
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            {hasActiveFilters && (
                                <>
                                    <Chip
                                        size="sm"
                                        variant="flat"
                                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                                    >
                                        {activeCount} Active
                                    </Chip>
                                    <Button
                                        size="sm"
                                        variant="flat"
                                        color="danger"
                                        startContent={<FiX size={14} />}
                                        onPress={clearFilters}
                                        className="gap-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                                    >
                                        Clear
                                    </Button>
                                </>
                            )}

                            <Button
                                size="sm"
                                variant="flat"
                                onPress={() => setIsExpanded((prev) => !prev)}
                                className="gap-1.5 text-xs font-bold lg:hidden bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                            >
                                <FiSliders size={14} />
                                {isExpanded ? "Hide" : "Filters"}
                                <FiChevronDown
                                    size={14}
                                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                />
                            </Button>
                        </div>
                    </div>

                    {!isExpanded && (
                        <div className="mt-4 flex flex-wrap items-center gap-2 lg:hidden">
                            {from.trim() && (
                                <Chip
                                    size="sm"
                                    variant="flat"
                                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                                >
                                    From: {from}
                                </Chip>
                            )}
                            {to.trim() && (
                                <Chip
                                    size="sm"
                                    variant="flat"
                                    className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
                                >
                                    To: {to}
                                </Chip>
                            )}
                            {transportType !== "all" && (
                                <Chip
                                    size="sm"
                                    variant="flat"
                                    className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
                                >
                                    {transportType}
                                </Chip>
                            )}
                            {sort !== "default" && (
                                <Chip
                                    size="sm"
                                    variant="flat"
                                    className="bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                                >
                                    {
                                        sortOptions.find(
                                            (o) => o.value === sort,
                                        )?.label
                                    }
                                </Chip>
                            )}
                            {!hasActiveFilters && (
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Tap{" "}
                                    <span className="font-bold text-green-600 dark:text-green-400">
                                        Filters
                                    </span>{" "}
                                    to search tickets
                                </p>
                            )}
                        </div>
                    )}

                    <div
                        className={`grid transition-all duration-500 ease-in-out lg:!grid-rows-[1fr] lg:!opacity-100 ${
                            isExpanded
                                ? "grid-rows-[1fr] opacity-100 mt-5"
                                : "grid-rows-[0fr] opacity-0 lg:mt-0"
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="flex flex-col gap-3 xl:flex-row xl:items-end">
                                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                                    <div className="relative flex-1 group">
                                        <div className="relative h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 transition-all focus-within:border-green-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-500/10 dark:border-zinc-700 dark:bg-zinc-800/50 dark:focus-within:bg-zinc-800 dark:focus-within:border-green-500">
                                            <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 border-r border-zinc-200 pr-2 dark:border-zinc-600">
                                                <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                                    FROM
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={from}
                                                onChange={(e) =>
                                                    setFrom(e.target.value)
                                                }
                                                placeholder="From where?"
                                                className="h-full w-full rounded-xl bg-transparent py-2.5 pl-24 pr-10 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-white dark:placeholder:text-zinc-500"
                                            />
                                            {from && (
                                                <button
                                                    type="button"
                                                    onClick={() => setFrom("")}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-white"
                                                >
                                                    <FiX size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-center sm:px-0.5">
                                        <Button
                                            isIconOnly
                                            variant="flat"
                                            size="sm"
                                            onPress={handleSwap}
                                            className="h-10 w-10 shrink-0 rounded-full border border-zinc-200 bg-white shadow-sm transition-all hover:rotate-180 hover:border-green-500/40 hover:bg-green-50 hover:text-green-600 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-green-400/30 dark:hover:bg-zinc-700 dark:hover:text-green-400 sm:h-12 sm:w-12 sm:rounded-xl"
                                        >
                                            <MdSwapHoriz size={18} />
                                        </Button>
                                    </div>

                                    <div className="relative flex-1 group">
                                        <div className="relative h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 transition-all focus-within:border-rose-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-rose-500/10 dark:border-zinc-700 dark:bg-zinc-800/50 dark:focus-within:bg-zinc-800 dark:focus-within:border-rose-500">
                                            <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 border-r border-zinc-200 pr-2 dark:border-zinc-600">
                                                <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                                                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                                    TO
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={to}
                                                onChange={(e) =>
                                                    setTo(e.target.value)
                                                }
                                                placeholder="To where?"
                                                className="h-full w-full rounded-xl bg-transparent py-2.5 pl-24 pr-10 text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-white dark:placeholder:text-zinc-500"
                                            />
                                            {to && (
                                                <button
                                                    type="button"
                                                    onClick={() => setTo("")}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-white"
                                                >
                                                    <FiX size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                                    <div className="w-full sm:w-44 lg:w-48">
                                        <Select
                                            selectedKey={transportType}
                                            onSelectionChange={
                                                handleTransportChange
                                            }
                                            aria-label="Transport Type"
                                        >
                                            <Select.Trigger className="flex h-12 w-full items-center justify-between gap-2 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/15">
                                                <div className="flex min-w-0 flex-1 items-center gap-2">
                                                    <FaGlobe
                                                        className="shrink-0 text-zinc-400"
                                                        size={14}
                                                    />
                                                    <span className="truncate text-left">
                                                        {selectedTransportLabel}
                                                    </span>
                                                </div>
                                                <Select.Indicator className="shrink-0" />
                                            </Select.Trigger>
                                            <Select.Popover className="min-w-[260px] rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                                                <ListBox className="outline-none">
                                                    {renderSelectItems(
                                                        transportOptions,
                                                        true,
                                                    )}
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    <div className="w-full sm:w-48 lg:w-52">
                                        <Select
                                            selectedKey={sort}
                                            onSelectionChange={handleSortChange}
                                            aria-label="Sort By"
                                        >
                                            <Select.Trigger className="flex h-12 w-full items-center justify-between gap-2 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 text-sm shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/15">
                                                <div className="flex min-w-0 flex-1 items-center gap-2">
                                                    <MdSort
                                                        className="shrink-0 text-zinc-400"
                                                        size={16}
                                                    />
                                                    <span className="truncate text-left">
                                                        {selectedSortLabel}
                                                    </span>
                                                </div>
                                                <Select.Indicator className="shrink-0" />
                                            </Select.Trigger>
                                            <Select.Popover className="min-w-[260px] rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                                                <ListBox className="outline-none">
                                                    {renderSelectItems(
                                                        sortOptions,
                                                        false,
                                                    )}
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    <Button
                                        onPress={handleSearch}
                                        className="h-12 w-full shrink-0 rounded-xl bg-green-600 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:bg-green-700 hover:shadow-green-500/40 active:scale-95 dark:bg-green-600 dark:hover:bg-green-500 sm:w-auto sm:px-6"
                                        startContent={<FiSearch size={16} />}
                                    >
                                        Search
                                    </Button>
                                </div>
                            </div>

                            {hasActiveFilters && (
                                <div className="mt-4 hidden flex-wrap items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800 lg:flex">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                        Active:
                                    </span>
                                    {from.trim() && (
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            onClose={() => setFrom("")}
                                            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 text-[10px] font-medium"
                                        >
                                            From: {from}
                                        </Chip>
                                    )}
                                    {to.trim() && (
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            onClose={() => setTo("")}
                                            className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800 text-[10px] font-medium"
                                        >
                                            To: {to}
                                        </Chip>
                                    )}
                                    {transportType !== "all" && (
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            onClose={() =>
                                                setTransportType("all")
                                            }
                                            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800 text-[10px] font-medium"
                                        >
                                            {transportType}
                                        </Chip>
                                    )}
                                    {sort !== "default" && (
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            onClose={() => setSort("default")}
                                            className="bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 text-[10px] font-medium"
                                        >
                                            {
                                                sortOptions.find(
                                                    (o) => o.value === sort,
                                                )?.label
                                            }
                                        </Chip>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}