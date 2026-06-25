
import { getUser } from "@/lib/core/session";
import RequestedBookingsTable from "./RequestedBookingsTable";
import { getVendorBookingRequests } from "@/lib/api/booking";

const BookingRequestsPage = async () => {
    const user = await getUser();
    const vendorId = user?.id || "";
    const data = await getVendorBookingRequests(vendorId);
    const initialBookings = data?.data || [];

    return (
        <div className="w-full  mx-auto px-4 py-6">
            <RequestedBookingsTable initialBookings={initialBookings} />
        </div>
    );
};

export default BookingRequestsPage;