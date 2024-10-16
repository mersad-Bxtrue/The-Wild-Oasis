import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth'; // API call for logout
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogout() {
  const queryClient = useQueryClient(); // Get the query client for cache manipulation
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Mutation for logging out a user
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(), // API call for logout
    onSuccess: () => {
      queryClient.setQueryData(['user'], null); // Clear user data from cache
      navigate('/', { replace: true }); // Navigate to home on success
      toast.success('Successfully logged out'); // Show success message
    },
    onError: (err) => {
      console.log('ERROR', err); // Log error
      toast.error('Logout failed'); // Show error message
    },
  });

  return { logout, isLoading }; // Return logout function and loading state
}
