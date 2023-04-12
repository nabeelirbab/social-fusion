export function validateCredentials(credentials) {
  const regexEmail = /\S+@\S+\.\S+/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let errors = {};
  let isValid = true;

  // Validate email
  if (!credentials.email || credentials.email.trim() === "") {
    errors.email = "Email is required.";
    isValid = false;
  } else if (!regexEmail.test(credentials.email)) {
    errors.email = "Invalid email address.";
    isValid = false;
  }

  // Validate password
  if (!credentials.password || credentials.password.trim() === "") {
    errors.password = "Password is required.";
    isValid = false;
  } else if (!regexPassword.test(credentials.password)) {
    errors.password =
      "Password must contain at least 8 characters, including at least one letter and one number.";
    isValid = false;
  }

  return { isValid, errors };
}
