import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient(); // Initialize query client for cache management

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), // Function to edit a cabin
    onSuccess: () => {
      toast.success("Cabin successfully edited"); // Success notification
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); // Invalidate cabins query to refresh data
    },
    onError: (err) => toast.error(err.message), // Error notification
  });

  return { isEditing, editCabin }; // Return loading state and editCabin function
}