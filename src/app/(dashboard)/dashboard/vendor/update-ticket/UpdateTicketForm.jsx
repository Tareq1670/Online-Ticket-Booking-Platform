"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
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
import { IoTicketSharp, IoWarning } from "react-icons/io5";
import { MdLocationOn, MdArrowForward } from "react-icons/md";
import { BsTagFill, BsCalendarEventFill, BsImageFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi2";
import { RiUploadCloud2Fill, RiVerifiedBadgeFill } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { imageUploader } from "@/lib/imageUpload";
import { updateMyAddedTicket } from "@/lib/actions/ticket";

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

const UpdateTicketForm = ({ initialTicket, vendor }) => {
    const router = useRouter();

    const ticketId = initialTicket?._id?.$oid || initialTicket?._id;
    const isRejected = initialTicket?.verificationStatus === "rejected";


    const [formValues, setFormValues] = useState({
        title: initialTicket?.title || "",
        from: initialTicket?.from || "",
        to: initialTicket?.to || "",
        price: initialTicket?.price || "",
        quantity: initialTicket?.quantity || "",
        departureDate: initialTicket?.departureDate || "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [selectedTransport, setSelectedTransport] = useState(
        initialTicket?.transportType || "Bus",
    );
    const [selectedPerks, setSelectedPerks] = useState(
        initialTicket?.perks || [],
    );
    const [imagePreview, setImagePreview] = useState(
        initialTicket?.image || null,
    );
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);


    const handleFieldChange = (field, value) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));

        if (showErrors) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                if (value && value.toString().trim() !== "") {
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
                : [...prev, perk],
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };


    const validateForm = (values) => {
        const newErrors = {};

        if (!values.title?.trim())
            newErrors.title = "Ticket title is required";
        if (!values.from?.trim())
            newErrors.from = "From location is required";
        if (!values.to?.trim())
            newErrors.to = "To location is required";

        if (!values.price) {
            newErrors.price = "Price is required";
        } else if (Number(values.price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        if (!values.quantity) {
            newErrors.quantity = "Ticket quantity is required";
        } else if (Number(values.quantity) <= 0) {
            newErrors.quantity = "Quantity must be greater than 0";
        }

        if (!values.departureDate) {
            newErrors.departureDate = "Departure date & time is required";
        } else if (new Date(values.departureDate) <= new Date()) {
            newErrors.departureDate = "Departure date must be in the future";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRejected) {
            toast.error("Rejected tickets cannot be updated");
            return;
        }

        setShowErrors(true);


        const validationErrors = validateForm(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            const firstErrorField = Object.keys(validationErrors)[0];
            const element = document.querySelector(
                `[data-field="${firstErrorField}"]`,
            );

            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            toast.error("Please fix all required fields");
            return;
        }

        setErrors({});
        setIsLoading(true);
        const loadingToast = toast.loading("Updating ticket...");

        try {
            let finalImage = initialTicket?.image || "";

            if (imageFile) {
                const uploadedImage = await imageUploader(imageFile);
                finalImage =
                    uploadedImage?.url ||
                    uploadedImage?.data?.url ||
                    uploadedImage ||
                    initialTicket?.image ||
                    "";
            }

            const ticketData = {
                title: formValues.title,
                from: formValues.from,
                to: formValues.to,
                transportType: selectedTransport,
                price: Number(formValues.price),
                quantity: Number(formValues.quantity),
                departureDate: formValues.departureDate,
                perks: selectedPerks,
                image: finalImage,
            };

            const result = await updateMyAddedTicket(
                ticketId, ticketData
            );

            if (result?.success) {
                toast.success("Ticket updated successfully! 🎫", {
                    id: loadingToast,
                });
                router.push("/dashboard/vendor/my-tickets");
                router.refresh();
            } else {
                toast.error(result?.message || "Failed to update ticket", {
                    id: loadingToast,
                });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Reset করলে আগের data ফিরে আসবে
    const handleReset = () => {
        setSelectedTransport(initialTicket?.transportType || "Bus");
        setSelectedPerks(initialTicket?.perks || []);
        setImagePreview(initialTicket?.image || null);
        setImageFile(null);
        setFormValues({
            title: initialTicket?.title || "",
            from: initialTicket?.from || "",
            to: initialTicket?.to || "",
            price: initialTicket?.price || "",
            quantity: initialTicket?.quantity || "",
            departureDate: initialTicket?.departureDate || "",
        });
        setErrors({});
        setShowErrors(false);
    };

    const TransportIcon =
        transportOptions.find((t) => t.key === selectedTransport)?.icon ||
        FaBus;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-8 dark:from-[#070B14] dark:via-[#0A0F1C] dark:to-[#06140C] md:px-8">
            <div className="mx-auto max-w-7xl">
                {/* ✅ Header */}
                <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
                    <FaBus className="absolute -bottom-4 right-8 text-9xl text-white/10" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                            <IoTicketSharp className="text-white" size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                                Update Ticket
                            </h1>
                            <p className="mt-1 text-sm text-white/80">
                                Edit your listed travel ticket information
                            </p>
                        </div>
                    </div>
                </div>

                {/* ✅ Rejected Warning */}
                {isRejected && (
                    <div className="mb-6 overflow-hidden rounded-2xl border border-rose-200 bg-rose-50 shadow-lg dark:border-rose-900/30 dark:bg-rose-900/10">
                        <div className="px-5 py-4">
                            <p className="text-sm font-bold text-rose-700 dark:text-rose-400">
                                Rejected tickets cannot be updated.
                            </p>
                        </div>
                    </div>
                )}

                {/* ✅ Error Summary */}
                {showErrors && Object.keys(errors).length > 0 && (
                    <div className="mb-6 overflow-hidden rounded-2xl border border-red-200 bg-red-50 shadow-lg dark:border-red-900/30 dark:bg-red-900/10">
                        <div className="flex items-center gap-3 border-b border-red-200 bg-red-100 px-5 py-3 dark:border-red-900/30 dark:bg-red-900/20">
                            <IoWarning
                                size={22}
                                className="text-red-600 dark:text-red-400"
                            />
                            <p className="text-sm font-bold text-red-700 dark:text-red-400">
                                Please fix the form errors before submitting
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* ✅ Form Section */}
                    <div className="lg:col-span-2">
                        <Surface className="rounded-3xl border border-green-100 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:p-8">
                            <Form
                                onSubmit={handleSubmit}
                                action=""
                                className="space-y-8"
                            >
                                {/* ✅ Section 01 - Basic Info */}
                                <div>
                                    <SectionHeader
                                        icon={IoTicketSharp}
                                        title="Basic Information"
                                        step="01"
                                    />
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        {/* Title */}
                                        <div
                                            className="md:col-span-2"
                                            data-field="title"
                                        >
                                            <TextField
                                                name="title"
                                                isInvalid={!!errors.title}
                                            >
                                                <Label className="mb-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    Ticket Title
                                                </Label>
                                                <Input
                                                    value={formValues.title}
                                                    placeholder="e.g. Dhaka to Cox's Bazar Luxury Bus"
                                                    variant="secondary"
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            "title",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.title && (
                                                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                                                        {errors.title}
                                                    </p>
                                                )}
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* From */}
                                        <div data-field="from">
                                            <TextField
                                                name="from"
                                                isInvalid={!!errors.from}
                                            >
                                                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    <MdLocationOn size={16} />
                                                    From (Location)
                                                </Label>
                                                <Input
                                                    value={formValues.from}
                                                    placeholder="e.g. Dhaka"
                                                    variant="secondary"
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            "from",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.from && (
                                                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                                                        {errors.from}
                                                    </p>
                                                )}
                                            </TextField>
                                        </div>

                                        {/* To */}
                                        <div data-field="to">
                                            <TextField
                                                name="to"
                                                isInvalid={!!errors.to}
                                            >
                                                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    <MdLocationOn size={16} />
                                                    To (Location)
                                                </Label>
                                                <Input
                                                    value={formValues.to}
                                                    placeholder="e.g. Cox's Bazar"
                                                    variant="secondary"
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            "to",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.to && (
                                                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                                                        {errors.to}
                                                    </p>
                                                )}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>

                                {/* ✅ Section 02 - Transport Type */}
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
                                                            option.key,
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

                                {/* ✅ Section 03 - Pricing & Schedule */}
                                <div>
                                    <SectionHeader
                                        icon={BsTagFill}
                                        title="Pricing & Schedule"
                                        step="03"
                                    />
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                        {/* Price */}
                                        <div data-field="price">
                                            <TextField
                                                name="price"
                                                isInvalid={!!errors.price}
                                            >
                                                <Label className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    <TbCurrencyTaka size={16} />
                                                    Price (per unit)
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={formValues.price}
                                                    placeholder="e.g. 1200"
                                                    variant="secondary"
                                                    min="1"
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            "price",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.price && (
                                                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                                                        {errors.price}
                                                    </p>
                                                )}
                                            </TextField>
                                        </div>

                                        {/* Quantity */}
                                        <div data-field="quantity">
                                            <TextField
                                                name="quantity"
                                                isInvalid={!!errors.quantity}
                                            >
                                                <Label className="mb-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                    Ticket Quantity
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={formValues.quantity}
                                                    placeholder="e.g. 40"
                                                    variant="secondary"
                                                    min="1"
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            "quantity",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.quantity && (
                                                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                                                        {errors.quantity}
                                                    </p>
                                                )}
                                            </TextField>
                                        </div>

                                        {/* Departure Date */}
                                        <div data-field="departureDate">
                                            <TextField
                                                name="departureDate"
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
                                                    type="datetime-local"
                                                    value={
                                                        formValues.departureDate
                                                    }
                                                    variant="secondary"
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            "departureDate",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.departureDate && (
                                                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                                                        {errors.departureDate}
                                                    </p>
                                                )}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>

                                {/* ✅ Section 04 - Perks */}
                                <div>
                                    <SectionHeader
                                        icon={AiFillStar}
                                        title="Perks & Amenities"
                                        step="04"
                                    />
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

                                {/* ✅ Section 05 - Image */}
                                <div>
                                    <SectionHeader
                                        icon={BsImageFill}
                                        title="Ticket Image"
                                        step="05"
                                    />
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

                                {/* ✅ Section 06 - Vendor Info */}
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
                                                value={vendor?.name || ""}
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
                                                value={vendor?.email || ""}
                                                readOnly
                                                className="w-full cursor-not-allowed rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* ✅ Action Buttons */}
                                <div className="flex justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                                    <Button
                                        type="button"
                                        variant="tertiary"
                                        onClick={() =>
                                            router.push(
                                                "/dashboard/vendor/my-tickets",
                                            )
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="tertiary"
                                        onClick={handleReset}
                                    >
                                        Reset Changes
                                    </Button>
                                    <Button
                                        type="submit"
                                        isDisabled={isLoading || isRejected}
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 font-semibold text-white shadow-lg shadow-green-500/30"
                                    >
                                        <span className="flex items-center gap-2">
                                            {isLoading
                                                ? "Updating..."
                                                : "Update Ticket"}
                                            {!isLoading && (
                                                <HiArrowRight size={18} />
                                            )}
                                        </span>
                                    </Button>
                                </div>
                            </Form>
                        </Surface>
                    </div>

                    {/* ✅ Live Preview Section */}
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

                                    <div className="absolute right-3 top-3 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700 capitalize">
                                        {initialTicket?.verificationStatus ||
                                            "pending"}
                                    </div>
                                </div>

                                <div className="p-5">
                                    {/* ✅ formValues থেকে live preview */}
                                    <h3 className="line-clamp-1 text-lg font-bold text-zinc-900 dark:text-white">
                                        {formValues.title || "Your Ticket Title"}
                                    </h3>

                                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                                        <span className="rounded-lg bg-green-50 px-2 py-1 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                            {formValues.from || "From"}
                                        </span>
                                        <MdArrowForward className="text-green-500" />
                                        <span className="rounded-lg bg-green-50 px-2 py-1 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                            {formValues.to || "To"}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                        <div>
                                            <p className="text-xs text-zinc-400">
                                                Price/unit
                                            </p>
                                            <p className="flex items-center text-xl font-black text-green-600 dark:text-green-400">
                                                <TbCurrencyTaka size={20} />
                                                {formValues.price || "0"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-zinc-400">
                                                Available
                                            </p>
                                            <p className="text-xl font-black text-zinc-900 dark:text-white">
                                                {formValues.quantity || "0"}
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

export default UpdateTicketForm;