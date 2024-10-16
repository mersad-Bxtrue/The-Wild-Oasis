import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient(); // Initialize query client for React Query
  const navigate = useNavigate(); // Hook for navigation

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    // Define mutation for checking in
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in", // Update status to checked-in
        isPaid: true, // Set payment status to true
        ...breakfast, // Spread breakfast options
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`); // Show success toast
      queryClient.invalidateQueries({ active: true }); // Invalidate active queries to refresh data
      navigate("/"); // Navigate to home page after successful check-in
    },

    onError: () => toast.error("There was an error while checking in"), // Show error toast
  });

  return { checkin, isCheckingIn }; // Return checkin function and loading state
}
