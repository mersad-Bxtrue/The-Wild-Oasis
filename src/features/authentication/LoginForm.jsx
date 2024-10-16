import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

const ToastMessageStyled = styled.span`
  line-height: 2.6rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${({ show }) => (show ? "block" : "none")};
`;

function LoginForm() {
  const [email, setEmail] = useState("leon@gmail.com"); // Initial email state
  const [password, setPassword] = useState("987654321"); // Initial password state
  const [formEnabled, setFormEnabled] = useState(false); // Controls form access
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility

  const { login, isLoading } = useLogin(); // Custom hook for login functionality

  useEffect(() => {
    // Delay displaying the toast message by 500 milliseconds
    const timer = setTimeout(() => {

      // Display a warning toast message until user clicks "OK"
      const toastId = toast((t) => (
        <div>
          <ToastMessageStyled>
            In this program, you are a <strong>guest with a normal level of access</strong> and you cannot <strong>add, delete or update</strong> anything, but you can read the data ⚠️
          </ToastMessageStyled>
          <br /> <br />
          <Button onClick={() => {
            setFormEnabled(true); // Enable form after clicking OK
            setShowOverlay(false); // Hide overlay when toast is dismissed
            toast.dismiss(t.id); // Close the toast
          }}>
            OK
          </Button>
        </div>
      ), { duration: Infinity });

      setShowOverlay(true); // Show overlay when toast is displayed

      // Clean up the toast message when the component unmounts
      return () => {
        toast.dismiss(toastId);
        setShowOverlay(false); // Ensure overlay is hidden on unmount
      };
    }, 1);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !formEnabled) return; // Check if email and password are provided

    // Trigger login process
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
    <>
      <Overlay show={showOverlay} /> {/* Add overlay */}
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            autoComplete="username" // Suggest username for auto-complete
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            disabled={isLoading || !formEnabled}
          />
        </FormRowVertical>

        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password" // Suggest current password for auto-complete
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            disabled={isLoading || !formEnabled}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button size="large" disabled={isLoading || !formEnabled}>
            {!isLoading ? "Log in" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default LoginForm;
