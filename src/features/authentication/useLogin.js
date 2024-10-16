import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutation for logging in a user
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }), // API call for login
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user); // Update user data in cache
      navigate('/dashboard', { replace: true }); // Navigate to dashboard on success
    },
    onError: (err) => {
      console.log('ERROR', err); // Log error
      toast.error('Provided email or password are incorrect'); // Show error message
    },
  });

  return { login, isLoading }; // Return login function and loading state
}
