import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient(); // Initialize query client for cache management

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi, // Function to delete a cabin
    onSuccess: () => {
      toast.success("Cabin successfully deleted"); // Success notification
      queryClient.invalidateQueries({ // Invalidate cabins query to refresh data
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message), // Error notification
  });

  return { isDeleting, deleteCabin }; // Return loading state and deleteCabin function
}
