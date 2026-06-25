import { serverDataFetch } from "../core/server";

export const getVendorBookingRequests = async (vendorId) => {
    return serverDataFetch(
        `/api/vendor/booking-requests?vendorId=${vendorId}`
    );
};

export const getUserBookings = async (userId) => {
    return serverDataFetch(`/api/users/my-bookings?userId=${userId}`);
};

export const getUserTransactions = async (userId) => {
    return serverDataFetch(`/api/users/transactions?userId=${userId}`);
};