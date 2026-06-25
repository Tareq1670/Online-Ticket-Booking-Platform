import { getUser } from "@/lib/core/session";
import { redirect } from "next/navigation";
import MyBookedTicketsClient from "./MyBookedTicketsClient";
import { getUserBookings } from "@/lib/api/booking";
import { getTransaction } from "@/lib/api/transection";

export default async function MyBookedTicketsPage() {
    const user = await getUser();
    const response = await getTransaction(user?.id);
    const transactions = response?.data || [];

    if (!user) redirect("/auth/login");
    if (user.role !== "user") redirect("/");

    let bookings = [];
    try {
        const response = await getUserBookings(user.id);
        bookings = response?.data || [];
    } catch (err) {
        console.error("Failed to fetch bookings:", err);
    }

    return (
        <MyBookedTicketsClient
            transactions={transactions}
            user={user}
            initialBookings={bookings}
        />
    );
}
