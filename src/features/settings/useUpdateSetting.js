import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient(); // 1. Get the query client for cache management

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi, // 2. API function for updating the setting
    onSuccess: () => {
      toast.success("Setting successfully edited"); // 3. Show success toast
      queryClient.invalidateQueries({ queryKey: ["settings"] }); // 4. Invalidate settings query
    },
    onError: (err) => toast.error(err.message), // 5. Show error toast on failure
  });

  return { isUpdating, updateSetting }; // 6. Return loading state and update function
}
