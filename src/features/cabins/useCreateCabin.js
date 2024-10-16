import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient(); // Initialize query client for cache management

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin, // Function to create or edit a cabin
    onSuccess: () => {
      toast.success("New cabin successfully created"); // Success notification
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); // Invalidate cabins query to refresh data
    },
    onError: (err) => toast.error(err.message), // Error notification
  });

  return { isCreating, createCabin }; // Return loading state and createCabin function
}
