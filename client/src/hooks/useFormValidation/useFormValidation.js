import { useState } from "react";
import validateForm from "./validateForm";

const useFormValidation = (initialState, submitAction) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleBlur = (event) => {
    let elName = event.target.id;
    const validationErrors = validateForm(values, errors, elName);
    setErrors(validationErrors);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(values, errors, "submit");
    if (Object.keys(validationErrors).length === 0) {
      submitAction();
    }
    setErrors(validationErrors);
  };

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setValues,
    errors,
    isSubmitting,
    setSubmitting,
  };
};

export default useFormValidation;
