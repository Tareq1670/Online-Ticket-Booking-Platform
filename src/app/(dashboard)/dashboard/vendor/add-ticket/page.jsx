"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    Surface,
    TextField,
} from "@heroui/react";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import { IoTicketSharp, IoWarning, IoShieldCheckmark } from "react-icons/io5";
import { MdLocationOn, MdArrowForward } from "react-icons/md";
import { BsTagFill, BsCalendarEventFill, BsImageFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { FaCircleCheck, FaBan } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi2";
import { RiUploadCloud2Fill, RiVerifiedBadgeFill } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { FiAlertTriangle } from "react-icons/fi";
import { imageUploader } from "@/lib/imageUpload";
import { AddTicket } from "@/lib/actions/ticket";
import { useRouter } from "next/navigation";
import Link from "next/link";

const transportOptions = [
    { key: "Bus", label: "Bus", icon: FaBus },
    { key: "Train", label: "Train", icon: FaTrain },
    { key: "Plane", label: "Plane", icon: FaPlane },
    { key: "Launch", label: "Launch", icon: FaShip },
];

const perksOptions = [
    "AC",
    "Non-AC",
    "Breakfast",
    "Lunch",
    "WiFi",
    "Charging Port",
    "Blanket",
    "Water Bottle",
    "Entertainment",
    "Reclining Seats",
];

const AddTicketPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const isFraud =
        user?.isFraud === true ||
        String(user?.status || "").toLowerCase() === "fraud";

    const [isLoading, setIsLoading] = useState(false);
    const [selectedTransport, setSelectedTransport] = useState("Bus");
    const [selectedPerks, setSelectedPerks] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const router = useRouter();

    const [livePreview, setLivePreview] = useState({
        title: "",
        from: "",
        to: "",
        price: "",
        quantity: "",
        departureDate: "",
    });

    const handleLiveChange = (field, value) => {
        setLivePreview((prev) => ({ ...prev, [field]: value }));
        if (showErrors) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                if (value && value.trim() !== "") {
                    delete newErrors[field];
                }
                return newErrors;
            });
        }
    };

    const togglePerk = (perk) => {
        setSelectedPerks((prev) =>
            prev.includes(perk)
                ? prev.filter((p) => p !== perk)
                : [...prev, perk]
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const validateForm = (formData) => {
        const newErrors = {};

        const title =
            formData?.get("title")?.toString().trim() ||
            livePreview.title.trim();
        const from =
            formData?.get("from")?.toString().trim() || livePreview.from.trim();
        const to =
            formData?.get("to")?.toString().trim() || livePreview.to.trim();
        const price =
            formData?.get("price")?.toString().trim() ||
            livePreview.price.trim();
        const quantity =
            formData?.get("quantity")?.toString().trim() ||
            livePreview.quantity.trim();
        const departureDate =
            formData?.get("departureDate")?.toString().trim() ||
            livePreview.departureDate.trim();

        if (!title) newErrors.title = "Ticket title is required";
        if (!from) newErrors.from = "From location is required";
        if (!to) newErrors.to = "To location is required";

        if (!price) {
            newErrors.price = "Price is required";
        } else if (Number(price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        if (!quantity) {
            newErrors.quantity = "Ticket quantity is required";
        } else if (Number(quantity) <= 0) {
            newErrors.quantity = "Quantity must be greater than 0";
        }

        if (!departureDate) {
            newErrors.departureDate = "Departure date & time is required";
        } else if (new Date(departureDate) <= new Date()) {
            newErrors.departureDate = "Departure date must be in the future";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFraud) {
            toast.error(
                "Your account is restricted. You cannot add tickets.",
                { duration: 5000 }
            );
            return;
        }

        setShowErrors(true);

        const formData = new FormData(e.currentTarget);
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            const errorCount = Object.keys(validationErrors).length;
            toast.error(
                `Please fill all required fields! (${errorCount} ${errorCount === 1 ? "field" : "fields"} missing)`,
                {
                    icon: "⚠️",
                    duration: 4000,
                    style: {
                        borderRadius: "12px",
                        background: "#FEF2F2",
                        color: "#DC2626",
                        border: "1px solid #FECACA",
                        fontWeight: "600",
                    },
                }
            );

            const firstErrorField = Object.keys(validationErrors)[0];
            const element = document.querySelector(
                `[data-field="${firstErrorField}"]`
            );
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            return;
        }

        setErrors({});
        setIsLoading(true);
        const loadingToast = toast.loading("Adding ticket...");

        try {
            let imageUrl = "";
            if (imageFile) {
                imageUrl = await imageUploader(imageFile);
                if (!imageUrl) {
                    toast.error("Image upload failed", { id: loadingToast });
                    setIsLoading(false);
                    return;
                }
            }

            const ticketData = {
                title: formData.get("title"),
                from: formData.get("from"),
                to: formData.get("to"),
                transportType: selectedTransport,
                price: Number(formData.get("price")),
                quantity: Number(formData.get("quantity")),
                departureDate: formData.get("departureDate"),
                perks: selectedPerks,
                image: imageUrl.url || "",
                vendorName: user?.name,
                vendorEmail: user?.email,
                vendorId: user?.id,
            };

            const result = await AddTicket(ticketData);

            if (result?.insertedId || result?.success) {
                toast.success("Ticket added successfully! 🎫", {
                    id: loadingToast,
                });

                e.target.reset();
                setSelectedTransport("Bus");
                setSelectedPerks([]);
                setImagePreview(null);
                setImageFile(null);
                setLivePreview({
                    title: "",
                    from: "",
                    to: "",
                    price: "",
                    quantity: "",
                    departureDate: "",
                });
                setErrors({});
                setShowErrors(false);
                router.push("/dashboard/vendor/my-tickets");
                router.refresh();
            } else {
                toast.error("Failed to add ticket", { id: loadingToast });
            }
        } catch (err) {
            toast.error("Something went wrong", { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setImagePreview(null);
        setImageFile(null);
        setSelectedPerks([]);
        setSelectedTransport("Bus");
        setLivePreview({
            title: "",
            from: "",
            to: "",
            price: "",
            quantity: "",
            departureDate: "",
        });
        setErrors({});
        setShowErrors(false);
    };

    const TransportIcon =
        transportOptions.find((t) => t.key === selectedTransport)?.icon ||
        FaBus;

    if (isFraud) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-8 dark:from-[#0F0506] dark:via-[#0A0F1C] dark:to-[#140C08] md:px-8 flex items-center justify-center">
                <div className="mx-auto w-full max-w-2xl ">
                    <div className="relative overflow-hidden rounded-3xl border-2 border-red-200 bg-white p-8 shadow-2xl dark:border-red-900/50 dark:bg-[#0A1020] md:p-12">
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-100/50 blur-3xl dark:bg-red-900/20" />
                        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-orange-100/50 blur-3xl dark:bg-orange-900/20" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-100 to-red-200 shadow-xl dark:from-red-950/50 dark:to-red-900/30">
                                <FaBan className="text-5xl text-red-600 dark:text-red-400" />
                            </div>

                            <h1 className="mb-3 text-2xl font-black text-red-700 dark:text-red-400 md:text-3xl">
                                Account Restricted
                            </h1>

                            <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                Your vendor account has been{" "}
                                <span className="font-black text-red-600 dark:text-red-400">
                                    marked as fraud
                                </span>{" "}
                                by the admin. You are no longer able to add new
                                tickets to the platform. All your existing
                                tickets have been hidden from public view.
                            </p>

                            <div className="mb-8 w-full rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
                                <div className="flex items-start gap-3">
                                    <FiAlertTriangle className="mt-0.5 shrink-0 text-xl text-red-500" />
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-red-700 dark:text-red-300">
                                            What does this mean?
                                        </p>
                                        <ul className="mt-2 space-y-1.5 text-xs text-red-600 dark:text-red-400">
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                                                You cannot add new tickets
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                                                All your tickets are hidden from
                                                the platform
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                                                Contact admin to resolve this
                                                issue
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={"/dashboard/vendor/profile"}
                                    className=" h-auto w-auto py-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 px-6 font-bold text-white shadow-lg"
                                >
                                    Go to Dashboard
                                </Link>
                                <Link
                                href={"/"}
                                className=" h-auto w-auto py-2 rounded-full  px-6 font-bold text-zinc-600 border border-zinc-400 shadow-lg"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-8 dark:from-[#070B14] dark:via-[#0A0F1C] dark:to-[#06140C] md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
                    <FaBus className="absolute -bottom-4 right-8 text-9xl text-white/10" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                            <IoTicketSharp className="text-white" size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                                Add New Ticket
                            </h1>
                            <p className="mt-1 text-sm text-white/80">
                                List your travel ticket and start earning on
                                TicketBari
                            </p>
                        </div>
                    </div>
                </div>

                {showErrors && Object.keys(errors).length > 0 && (
                    <div className="mb-6 overflow-hidden rounded-2xl border border-red-200 bg-red-50 shadow-lg dark:border-red-900/30 dark:bg-red-900/10">
                        <div className="flex items-center gap-3 border-b border-red-200 bg-red-100 px-5 py-3 dark:border-red-900/30 dark:bg-red-900/20">
                            <IoWarning
                                size={22}
                                className="text-red-600 dark:text-red-400"
                            />
                            <p className="text-sm font-bold text-red-700 dark:text-red-400">
                                Please fix the following{" "}
                                {Object.keys(errors).length} error
                                {Object.keys(errors).length > 1 ? "s" : ""}{" "}
                                before submitting:
                            </p>
                        </div>
                        <div className="px-5 py-3">
                            <ul className="space-y-1.5">
                                {Object.entries(errors).map(
                                    ([field, message]) => (
                                        <li
                                            key={field}
                                            className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                            {message}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Surface className="rounded-3xl border border-green-100 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:p-8">
                            <Form
                                onSubmit={handleSubmit}
                                action=""
                                className="space-y-8"
                            >
                                <div>
                                    <SectionHeader
                                        icon={IoTicketSharp}
                                        title="Basic Information"
                                        step="01"
                                    />
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div
                                            className="md:col-span-2"
                                            data-field="title"
                                        >
                                            <TextField
                                                isRequired
                                                name="title"
                                                isInvalid={!!errors.title}
                                            >
                                                <Label className="mb-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    Ticket Title
                                                </Label>
                                                <Input
                                                    placeholder="e.g. Dhaka to Cox's Bazar Luxury Bus"
                                                    variant="secondary"
                                                    className={
                                                        errors.title
                                                            ? "!border-red-400 !ring-red-400/30"
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        handleLiveChange(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.title && (
                                                    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500">
                                                        <IoWarning size={14} />
                                                        {errors.title}
                                                    </p>
                                                )}
                                                <FieldError className="mt-1 text-xs text-red-500" />
                                            </TextField>
                                        </div>

                                        <div data-field="from">
                                            <TextField
                                                isRequired
                                                name="from"
                                                isInvalid={!!errors.from}
                                            >
                                                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    <MdLocationOn size={16} />
                                                    From (Location)
                                                </Label>
                                                <Input
                                                    placeholder="e.g. Dhaka"
                                                    variant="secondary"
                                                    className={
                                                        errors.from
                                                            ? "!border-red-400 !ring-red-400/30"
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        handleLiveChange(
                                                            "from",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.from && (
                                                    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500">
                                                        <IoWarning size={14} />
                                                        {errors.from}
                                                    </p>
                                                )}
                                                <FieldError className="mt-1 text-xs text-red-500" />
                                            </TextField>
                                        </div>

                                        <div data-field="to">
                                            <TextField
                                                isRequired
                                                name="to"
                                                isInvalid={!!errors.to}
                                            >
                                                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    <MdLocationOn size={16} />
                                                    To (Location)
                                                </Label>
                                                <Input
                                                    placeholder="e.g. Cox's Bazar"
                                                    variant="secondary"
                                                    className={
                                                        errors.to
                                                            ? "!border-red-400 !ring-red-400/30"
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        handleLiveChange(
                                                            "to",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.to && (
                                                    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500">
                                                        <IoWarning size={14} />
                                                        {errors.to}
                                                    </p>
                                                )}
                                                <FieldError className="mt-1 text-xs text-red-500" />
                                            </TextField>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <SectionHeader
                                        icon={FaBus}
                                        title="Transport Type"
                                        step="02"
                                    />
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {transportOptions.map((option) => {
                                            const Icon = option.icon;
                                            const isSelected =
                                                selectedTransport ===
                                                option.key;
                                            return (
                                                <button
                                                    type="button"
                                                    key={option.key}
                                                    onClick={() =>
                                                        setSelectedTransport(
                                                            option.key
                                                        )
                                                    }
                                                    className={`group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border-2 p-4 transition-all ${
                                                        isSelected
                                                            ? "border-green-500 bg-green-50 shadow-lg shadow-green-500/20 dark:bg-green-900/20"
                                                            : "border-zinc-200 bg-zinc-50 hover:border-green-300 dark:border-zinc-700 dark:bg-zinc-800/50"
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <span className="absolute right-2 top-2 text-green-500">
                                                            <FaCircleCheck
                                                                size={14}
                                                            />
                                                        </span>
                                                    )}
                                                    <Icon
                                                        size={26}
                                                        className={`transition-transform group-hover:scale-110 ${
                                                            isSelected
                                                                ? "text-green-600 dark:text-green-400"
                                                                : "text-zinc-500"
                                                        }`}
                                                    />
                                                    <span
                                                        className={`text-sm font-semibold ${
                                                            isSelected
                                                                ? "text-green-700 dark:text-green-400"
                                                                : "text-zinc-600 dark:text-zinc-400"
                                                        }`}
                                                    >
                                                        {option.label}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <SectionHeader
                                        icon={BsTagFill}
                                        title="Pricing & Schedule"
                                        step="03"
                                    />
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                        <div data-field="price">
                                            <TextField
                                                isRequired
                                                name="price"
                                                type="number"
                                                isInvalid={!!errors.price}
                                            >
                                                <Label className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    <TbCurrencyTaka size={16} />
                                                    Price (per unit)
                                                </Label>
                                                <Input
                                                    placeholder="e.g. 1200"
                                                    variant="secondary"
                                                    min="1"
                                                    className={
                                                        errors.price
                                                            ? "!border-red-400 !ring-red-400/30"
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        handleLiveChange(
                                                            "price",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.price && (
                                                    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500">
                                                        <IoWarning size={14} />
                                                        {errors.price}
                                                    </p>
                                                )}
                                                <FieldError className="mt-1 text-xs text-red-500" />
                                            </TextField>
                                        </div>

                                        <div data-field="quantity">
                                            <TextField
                                                isRequired
                                                name="quantity"
                                                type="number"
                                                isInvalid={!!errors.quantity}
                                            >
                                                <Label className="mb-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    Ticket Quantity
                                                </Label>
                                                <Input
                                                    placeholder="e.g. 40"
                                                    variant="secondary"
                                                    min="1"
                                                    className={
                                                        errors.quantity
                                                            ? "!border-red-400 !ring-red-400/30"
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        handleLiveChange(
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.quantity && (
                                                    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500">
                                                        <IoWarning size={14} />
                                                        {errors.quantity}
                                                    </p>
                                                )}
                                                <FieldError className="mt-1 text-xs text-red-500" />
                                            </TextField>
                                        </div>

                                        <div data-field="departureDate">
                                            <TextField
                                                isRequired
                                                name="departureDate"
                                                type="datetime-local"
                                                isInvalid={
                                                    !!errors.departureDate
                                                }
                                            >
                                                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    <BsCalendarEventFill
                                                        size={14}
                                                    />
                                                    Departure
                                                </Label>
                                                <Input
                                                    variant="secondary"
                                                    className={
                                                        errors.departureDate
                                                            ? "!border-red-400 !ring-red-400/30"
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        handleLiveChange(
                                                            "departureDate",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.departureDate && (
                                                    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500">
                                                        <IoWarning size={14} />
                                                        {errors.departureDate}
                                                    </p>
                                                )}
                                                <FieldError className="mt-1 text-xs text-red-500" />
                                            </TextField>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <SectionHeader
                                        icon={AiFillStar}
                                        title="Perks & Amenities"
                                        step="04"
                                    />
                                    <p className="mb-3 text-xs text-zinc-400 dark:text-zinc-500">
                                        Optional — select any perks that apply
                                    </p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {perksOptions.map((perk) => {
                                            const isSelected =
                                                selectedPerks.includes(perk);
                                            return (
                                                <button
                                                    type="button"
                                                    key={perk}
                                                    onClick={() =>
                                                        togglePerk(perk)
                                                    }
                                                    className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                                                        isSelected
                                                            ? "border-green-500 bg-green-500 text-white shadow-md shadow-green-500/30"
                                                            : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-green-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <FaCircleCheck
                                                            size={14}
                                                        />
                                                    )}
                                                    {perk}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <SectionHeader
                                        icon={BsImageFill}
                                        title="Ticket Image"
                                        step="05"
                                    />
                                    <p className="mb-3 text-xs text-zinc-400 dark:text-zinc-500">
                                        Optional — upload a ticket image
                                    </p>
                                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-6 transition-all hover:border-green-400 hover:bg-green-50/50 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-green-500/50">
                                        {imagePreview ? (
                                            <Image
                                                height={500}
                                                width={500}
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-48 w-full rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 py-6">
                                                <RiUploadCloud2Fill
                                                    size={44}
                                                    className="text-zinc-400"
                                                />
                                                <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                                                    Click to upload ticket image
                                                </p>
                                                <p className="text-xs text-zinc-400">
                                                    PNG, JPG up to 5MB
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                <div>
                                    <SectionHeader
                                        icon={RiVerifiedBadgeFill}
                                        title="Vendor Information"
                                        step="06"
                                        violet
                                    />
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div>
                                            <Label className="mb-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                Vendor Name
                                            </Label>
                                            <input
                                                type="text"
                                                value={user?.name || ""}
                                                readOnly
                                                className="w-full cursor-not-allowed rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                                            />
                                        </div>
                                        <div>
                                            <Label className="mb-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                Vendor Email
                                            </Label>
                                            <input
                                                type="email"
                                                value={user?.email || ""}
                                                readOnly
                                                className="w-full cursor-not-allowed rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                                    <Button
                                        type="reset"
                                        variant="tertiary"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        type="submit"
                                        isDisabled={isLoading}
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 font-semibold text-white shadow-lg shadow-green-500/30"
                                    >
                                        <span className="flex items-center gap-2">
                                            {isLoading
                                                ? "Adding..."
                                                : "Add Ticket"}
                                            {!isLoading && (
                                                <HiArrowRight size={18} />
                                            )}
                                        </span>
                                    </Button>
                                </div>
                            </Form>
                        </Surface>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                                Live Preview
                            </p>

                            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="relative h-44 w-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-zinc-800 dark:to-zinc-800">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <BsImageFill
                                                size={40}
                                                className="text-zinc-300 dark:text-zinc-600"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-green-700 shadow-md backdrop-blur-sm dark:bg-zinc-900/90 dark:text-green-400">
                                        <TransportIcon size={14} />
                                        {selectedTransport}
                                    </div>
                                    <div className="absolute right-3 top-3 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                                        Pending
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="line-clamp-1 text-lg font-bold text-zinc-900 dark:text-white">
                                        {livePreview.title ||
                                            "Your Ticket Title"}
                                    </h3>
                                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                                        <span className="rounded-lg bg-green-50 px-2 py-1 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                            {livePreview.from || "From"}
                                        </span>
                                        <MdArrowForward className="text-green-500" />
                                        <span className="rounded-lg bg-green-50 px-2 py-1 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                            {livePreview.to || "To"}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                        <div>
                                            <p className="text-xs text-zinc-400">
                                                Price/unit
                                            </p>
                                            <p className="flex items-center text-xl font-black text-green-600 dark:text-green-400">
                                                <TbCurrencyTaka size={20} />
                                                {livePreview.price || "0"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-zinc-400">
                                                Available
                                            </p>
                                            <p className="text-xl font-black text-zinc-900 dark:text-white">
                                                {livePreview.quantity || "0"}
                                            </p>
                                        </div>
                                    </div>
                                    {selectedPerks.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {selectedPerks
                                                .slice(0, 4)
                                                .map((perk) => (
                                                    <span
                                                        key={perk}
                                                        className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                                                    >
                                                        {perk}
                                                    </span>
                                                ))}
                                            {selectedPerks.length > 4 && (
                                                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                                    +{selectedPerks.length - 4}{" "}
                                                    more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 rounded-2xl border border-green-200 bg-green-50/50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
                                <p className="flex items-start gap-2 text-xs leading-5 text-green-800 dark:text-green-400">
                                    <FaCircleCheck
                                        size={14}
                                        className="mt-0.5 shrink-0"
                                    />
                                    Your ticket will be submitted with{" "}
                                    <span className="font-bold">pending</span>{" "}
                                    status and reviewed by admin before going
                                    live.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SectionHeader = ({ icon: Icon, title, step, violet = false }) => (
    <div className="mb-5 flex items-center gap-3">
        <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                violet
                    ? "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                    : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            }`}
        >
            <Icon size={18} />
        </div>
        <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                {title}
            </h2>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-400 dark:bg-zinc-800">
                {step}
            </span>
        </div>
    </div>
);

export default AddTicketPage;
