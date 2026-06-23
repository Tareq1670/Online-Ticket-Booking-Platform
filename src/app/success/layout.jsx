export const metadata = {
    title: "Payment Successful | Ticketix - Online Ticket Booking Platform",
    description:
        "Your payment has been successfully completed. Thank you for booking with Ticketix, your trusted online ticket booking platform for events, movies, buses, and more.",
    keywords: [
        "Ticketix",
        "Payment Successful",
        "Online Ticket Booking",
        "Event Tickets",
        "Movie Tickets",
        "Bus Tickets Booking",
    ],
    robots: {
        index: false,
        follow: false,
    },
    openGraph: {
        title: "Payment Successful | Ticketix",
        description:
            "Your booking is confirmed. Thank you for choosing Ticketix for your online ticket booking needs.",
        url: "https://ticketix.com/payment-success",
        siteName: "Ticketix",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Payment Successful | Ticketix",
        description:
            "Your booking is confirmed. Thank you for choosing Ticketix.",
    },
};

const paymentSuccessLayout = ({ children }) => {
    return children;
};

export default paymentSuccessLayout;
