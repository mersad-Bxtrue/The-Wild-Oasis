import { useMutation } from "@tanstack/react-query";
// import { signup as signupApi } from "../../services/apiAuth";
// import { toast } from "react-hot-toast";

export function useSignup() {
  // Mutation for signing up a user
  const { mutate: signup, isLoading } = useMutation({
    // mutationFn: signupApi, // API call for signup
    // onSuccess: () => {
    //   toast.success(
    //     "Account successfully created! Please verify the new account from the user's email address."
    //   );
    // },
  });

  return { signup, isLoading };
}
