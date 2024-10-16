import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams(); // Get booking ID from URL parameters

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // Unique key for the query
    queryFn: () => getBooking(bookingId), // Function to fetch booking data
    retry: false, // Disable retry on failure
  });

  return { isLoading, error, booking }; // Return loading state, error, and booking data
}
