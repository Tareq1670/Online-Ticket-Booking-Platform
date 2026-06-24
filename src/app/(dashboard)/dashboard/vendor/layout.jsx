import { checkRoleAccess } from "@/lib/core/session";


const vendorLayout = async ({ children }) => {
    await checkRoleAccess("vendor");
    return children
};

export default vendorLayout;