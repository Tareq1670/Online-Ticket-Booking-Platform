import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }

    return session.user || null;
};

export const checkRoleAccess = async (requiredRole) => {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    if (user.role !== requiredRole) {
        redirect("/unauthorized");
    }

    return user;
};