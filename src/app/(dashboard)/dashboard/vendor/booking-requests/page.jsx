import { getVendorBookingRequests } from "@/lib/api/booking";
import BookingRequestsClient from "./BookingRequestsClient";
import { getUser } from "@/lib/core/session";

const bookingRequestsPage = async () => {
    const user = await getUser();
    const vendorId = user?.id || "";
    const data = await getVendorBookingRequests(vendorId);
    const initialBookings = data.data

    return (
        <BookingRequestsClient
            initialBookings={initialBookings}
            vendorId={vendorId}
        />
    );
};

export default bookingRequestsPage;