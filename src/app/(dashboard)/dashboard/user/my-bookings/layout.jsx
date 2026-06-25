export const metadata = {
    title: "My Bookings | Ticketix",
    description:
        "View and manage all your booked tickets easily on Ticketix. Check booking details, ticket status, and upcoming events in one place.",
    robots: {
        index: false,
        follow: false,
    },
};

const MyBookingsLayout = ({ children }) => {
    return <>{children}</>;
};

export default MyBookingsLayout;
