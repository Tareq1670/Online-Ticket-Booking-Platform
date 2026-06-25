import { serverMutation } from "../core/client";


export const createBooking = async (data) => {
    return serverMutation("/api/bookings", data, "POST");
};


export const cancelBooking = async(cancelBookingId) => {
    return serverMutation(`/api/bookings/${cancelBookingId}/cancel`,{}, "PATCH")
}



export const acceptBooking =async(acceptId) => {
    return serverMutation(`/api/vendor/bookings/${acceptId}/accept`,{},"PATCH")
}


export const rejectBooking =async(rejectId) => {
    return serverMutation(`/api/vendor/bookings/${rejectId}/reject`,{},"PATCH")
}