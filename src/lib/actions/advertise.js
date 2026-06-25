import { serverMutation } from "../core/client";





export const toggleAdvertise = async (ticketId, isAdvertised) => {
    return serverMutation(
        `/api/admin/tickets/${ticketId}/advertise`,
        { isAdvertised },
        "PATCH"
    );
};