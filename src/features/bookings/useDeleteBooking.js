import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient(); // Get the query client for cache management

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi, // Function to call for deletion
    onSuccess: () => { // Callback on successful deletion
      toast.success("Booking successfully deleted"); // Show success notification

      queryClient.invalidateQueries({ // Invalidate the bookings query to refresh data
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message), // Show error notification on failure
  });

  return { isDeleting, deleteBooking }; // Return loading state and delete function
}
