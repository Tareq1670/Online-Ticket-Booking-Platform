import { checkRoleAccess } from '@/lib/core/session';

const adminLayout = async   ({ children }) => {
    await checkRoleAccess("admin");
    return children;
};

export default adminLayout;