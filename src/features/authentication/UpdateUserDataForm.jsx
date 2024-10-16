import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  // Handles form submission for updating user data
  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return; // Ensures full name is provided
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null); // Reset avatar after success
          e.target.reset(); // Reset form fields
        },
      }
    );
  }

  // Resets the form to the current user data
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)} // Update full name
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])} // Update avatar
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel} // Cancel form and reset values
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          Update account {isUpdating && <SpinnerMini />} {/* Show loading spinner if updating */}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
