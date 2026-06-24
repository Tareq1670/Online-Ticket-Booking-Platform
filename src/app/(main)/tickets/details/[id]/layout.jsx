import { checkRoleAccess, getUser } from "@/lib/core/session";


const detailLayout = async ({ children }) => {
    const user = await getUser();

    await checkRoleAccess(user?.role);
    return children;
};

export default detailLayout;
