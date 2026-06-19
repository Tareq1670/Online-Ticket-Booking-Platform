import { redirect } from "next/navigation";
import DashboardWelcome from "@/components/Dashboard/DashboardWelcome";
import { getUser } from "@/lib/core/session";

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    return <DashboardWelcome user={user} />;
}
