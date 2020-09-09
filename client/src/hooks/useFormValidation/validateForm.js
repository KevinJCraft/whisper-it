const validateForm = (values, oldErrors = {}, name) => {
  const errors = { ...oldErrors };
  //   if (name === "email" || name === "submit") {
  //     if (!values.email) {
  //       errors.email = "*Requred";
  //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //       errors.email = "*Invalid email address";
  //     } else {
  //       delete errors.email;
  //     }
  //   }

  if (name === "userName" || name === "submit") {
    if (!values.userName) {
      errors.userName = "required";
    } else if (values.userName.length < 4) {
      errors.userName = "min 4 characters";
    } else {
      delete errors.userName;
    }
  }

  if (name === "password" || name === "submit") {
    if (!values.password) {
      errors.password = "required";
    } else if (values.password.length < 4) {
      errors.password = "*min 4 characters";
    } else {
      delete errors.password;
    }
    if (values.dupPassword && values.dupPassword !== values.password) {
      errors.dupPassword = "does not match";
    } else {
      delete errors.dupPassword;
    }
  }
  if (name === "dupPassword" || name === "submit") {
    if (!values.dupPassword) {
      errors.dupPassword = "required";
    } else if (values.dupPassword.length < 4) {
      errors.dupPassword = "min 4 characters";
    } else if (values.dupPassword && values.dupPassword !== values.password) {
      errors.dupPassword = "does not match";
    } else {
      delete errors.dupPassword;
    }
  }

  return errors;
};

export default validateForm;
