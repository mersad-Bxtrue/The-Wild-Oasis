import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient(); // Initialize query client for React Query

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    // Define mutation for checking out
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out", // Update status to checked-out
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`); // Show success toast
      queryClient.invalidateQueries({ active: true }); // Invalidate active queries to refresh data
    },

    onError: () => toast.error("There was an error while checking out"), // Show error toast
  });

  return { checkout, isCheckingOut }; // Return checkout function and loading state
}
