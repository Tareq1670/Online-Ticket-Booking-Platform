import { redirect } from "next/navigation";
import DashboardWelcome from "@/components/Dashboard/DashboardWelcome";
import { getUser } from "@/lib/core/session";

export const metadata = {
  title: "Dashboard | Ticketix",
  description:
    "Access your Ticketix dashboard to manage bookings, profile, transactions, and account activity in one place.",
};

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    return <DashboardWelcome user={user} />;
}
