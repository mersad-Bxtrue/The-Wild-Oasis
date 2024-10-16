import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing; // Check if a create or edit action is in progress

  const { id: editId, ...editValues } = cabinToEdit; // Extract ID and values for editing
  const isEditSession = Boolean(editId); // Check if editing

  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}, // Set default values based on editing
  });
  const { errors } = formState; // Form validation errors
  const regularPriceValue = watch("regularPrice"); // Watch regular price for validation

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0]; // Handle image input

    if (isEditSession) // If editing
      editCabin(
        { newCabinData: { ...data, image }, id: editId }, // Edit cabin with new data
        {
          onSuccess: (data) => {
            reset(); // Reset form after successful edit
            onCloseModal?.(); // Close modal if provided
          },
        }
      );
    else // If creating new cabin
      createCabin(
        { ...data, image: image }, // Create cabin with provided data
        {
          onSuccess: (data) => {
            reset(); // Reset form after successful creation
            onCloseModal?.(); // Close modal if provided
          },
        }
      );
  }

  function onError(errors) {
    // Handle form errors
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)} // Handle form submission
      type={onCloseModal ? "modal" : "regular"} // Set form type based on modal state
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking} // Disable input while processing
          {...register("name", {
            required: "This field is required", // Validation for name
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking} // Disable input while processing
          {...register("maxCapacity", {
            required: "This field is required", // Validation for max capacity
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking} // Disable input while processing
          {...register("regularPrice", {
            required: "This field is required", // Validation for regular price
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking} // Disable input while processing
          defaultValue={0} // Set default value for discount
          {...register("discount", {
            required: "This field is required", // Validation for discount
            validate: (value) => {
              const regularPrice = parseFloat(regularPriceValue) || 0;
              return value < regularPrice || "Discount should be less than regular price"; // Validate discount
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue="" // Set default value for description
          disabled={isWorking} // Disable input while processing
          {...register("description", {
            required: "This field is required", // Validation for description
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*" // Accept image files only
          {...register("image", {
            required: isEditSession ? false : "This field is required", // Validation for image
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()} // Cancel button to close modal
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
          {isWorking && <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
