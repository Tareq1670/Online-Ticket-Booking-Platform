import { serverDataFetch } from "../core/server";

export const getMyBookedTickets = async (userId) => {
    return serverDataFetch(`/api/users/my-bookings?userId=${userId}`, {
        catch: "no-store",
    });
};

export const getVendorBookingRequests = async (vendorId) => {
    return serverDataFetch(`/api/vendor/booking-requests?vendorId=${vendorId}`);
};
