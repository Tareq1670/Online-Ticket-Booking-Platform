import { checkRoleAccess } from "@/lib/core/session";

const userLayout = async ({ children }) => {
    await checkRoleAccess("user");

    return children;
};

export default userLayout;
