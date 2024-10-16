import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("leon@gmail.com");
  const [password, setPassword] = useState("987654321");
  const { login, isLoading } = useLogin(); // Custom hook for login functionality

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return; // Check if email and password are provided
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail(""); // Reset email input after login
          setPassword(""); // Reset password input after login
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username" // Suggest username for auto-complete
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password" // Suggest current password for auto-complete
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
