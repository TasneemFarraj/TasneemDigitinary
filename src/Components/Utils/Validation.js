export const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case 'fullName':
      if (value.trim().length < 3) error = 'Full name must be at least 3 characters.';
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = 'Invalid email address.';
      break;
    case 'password':
      const passwordRegex = /^[a-zA-Z0-9]+$/;
      if (!passwordRegex.test(value))
        error = 'Password must be at least 6 characters,contain only letters and numbers';
      break;
    default:
      break;
  }

  return error;
};
